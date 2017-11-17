/*
 * Copyright Keysight Technologies 2017. All rights reserved.
 */
import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';

import { ExternalErrorsValidator } from '../validators/external-error.validator';
import { MessageHelper } from '../validators/message-helper';
import { PatternValidator } from '../validators/pattern.validator';

import { CheckboxDynamicComponent } from '../dynamic-components/checkbox/checkbox-dynamic.component';
import { DropdownDynamicComponent } from '../dynamic-components/dropdown/dropdown-dynamic.component';
import { TextfieldDynamicComponent } from '../dynamic-components/textfield/textfield-dynamic.component';

import { PropertyType } from '../../assets/propertyType';

// An editor is largely a set of relationships between shapes, types, validators and validator messages.
// This service takes N types, M shapes, Q validators and R validator messages, and creates  a set of
//                    N editor relationships.
// Note that each type will have it's own editor relationship.
// The shapes, validators, and messages may be shared between editors.

@Injectable()
export class EditorService {
    private static minStringLength = 3;
    private static maxStringLength = 10;

    // tslint:disable:no-any
    private editors: any[] = [];
    private validators: any[] = [];
    private validatorMessages: any[] = [];
    // tslint:enable:no-any

    constructor() {
        this.mapTypesToDynamicComponents();
        this.mapTypesToValidators();
        this.mapTypesToValidatorMessages();
    }

    // tslint:disable-next-line:no-any
    public getEditors(): string[] {
        return this.editors;
    }

    // tslint:disable-next-line:no-any
    public getValidators(): any[] {
        return this.validators;
    }

    // tslint:disable-next-line:no-any
    public getValidatorMessages(): string[] {
        return this.validatorMessages;
    }

    // Components are the underlying angular technology.
    // We call them "Dynamic" components because they are dynamically inserted into the
    // value column of the grid control.
    // Note it is good practice to define an enumeration of propertyTypes.
    // This keeps your code a little more readable, and avoids typos.
    private mapTypesToDynamicComponents(): void {
        if (this.editors.length === 0) {
            // The editors          for some type                        and their related shapes
            // the Checkbox conflick between enable/disable by Enterkey and move focus by Enterkey
            // So isLandingEnterKey and isSupportCellEditing should be false until we find a solution the enter key conflict issue.
            this.editors.push({
                key: PropertyType.Boolean,
                component: CheckboxDynamicComponent,
                isLandingEnterKey: false,
                isSupportCellEditing: false
            });
            // the Alloy Dropbox do not support Ag-Grid's stopEditing() API call
            // If call, you get this critical error.
            // ObjectUnsubscribedError: object unsubscribed at new ObjectUnsubscribedError EventEmitter.Subject.next
            // So isSupportCellEditing should be false for DropdownDynamicComponent
            // the isLandingEnterKey also should be false untile Alloy Dropbox support key event inside.
            this.editors.push({
                key: PropertyType.Enum,
                component: DropdownDynamicComponent,
                isLandingEnterKey: false,
                isSupportCellEditing: false
            });
            // Text input component is no problem isLandingEnterKey is true and isSupportCellEditing is true
            this.editors.push({
                key: PropertyType.ShortStringWithNoZ,
                component: TextfieldDynamicComponent,
                isLandingEnterKey: true,
                isSupportCellEditing: true
            });
            this.editors.push({
                key: PropertyType.StringWithNoValidation,
                component: TextfieldDynamicComponent,
                isLandingEnterKey: true,
                isSupportCellEditing: true
            });
        }
    }

    private mapTypesToValidators(): void {
        if (this.validators.length === 0) {
            this.validators.push({ key: PropertyType.ShortStringWithNoZ,
                validators: [
                    // Note the use of build in Angular validators for min and maxLength
                    Validators.minLength(EditorService.minStringLength),
                    Validators.maxLength(EditorService.maxStringLength),
                    Validators.pattern(PatternValidator.validStringWithNoZ())
                ]
            });
            this.validators.push({ key: PropertyType.Enum,
                validators: [] });

            // Note that boolean and "StringWithNoValidation" types require no validators.
            // The enum type technically didn't either, so we returned an empty array

            // Every type gets a ExternalErrorValidator - so iterate through set of validators and add one.
            Object.keys(this.validators).forEach((key) => {
                this.validators[key].validators.push(ExternalErrorsValidator.ExternalValidator());
            });
        }
    }
    private mapTypesToValidatorMessages(): void {
        if (this.validatorMessages.length === 0) {
            this.validatorMessages.push({ key: PropertyType.ShortStringWithNoZ,
                validatorMessages: {
                    minlength: MessageHelper.setMessageForMinLength(EditorService.minStringLength),
                    maxlength: MessageHelper.setMessageForMaxlength(EditorService.maxStringLength),
                    pattern: MessageHelper.setMessageForInCorrectFormat()
                }
            });

            // Note that boolean,"StringWithNoValidation", and enum types require no validator messages.

            this.validatorMessages.push({ key: PropertyType.Enum, validatorMessages: [] });
        }
    }
}
