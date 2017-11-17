/*
 * Copyright Keysight Technologies 2017. All rights reserved.
 */
import {
    AfterViewInit,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostListener,
    OnInit,
    ViewChild,
    OnDestroy
} from '@angular/core';
import { AlloyPropertyGridMessageService } from '@keysight/alloy';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';

import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';

import { Key } from 'ts-keycode-enum';
import { MessageAggregator } from '../../validators/message-aggregator';
import { ISubscription } from 'rxjs/Subscription';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'client-dynamic-component',
    templateUrl: './textfield-dynamic.component.html'
})
export class TextfieldDynamicComponent implements AfterViewInit, OnInit, OnDestroy {
    @ViewChild('textInputBox') public textInputBox: ElementRef;

    // tslint:disable-next-line:no-any
    public params: any;
    public textfieldForm: FormGroup;
    public marginLeft: string;
    public messageTooltip = '';
    public serverErrors: string[];

    private validators: ValidatorFn[];
    private validatorsMessage: { [key: string]: string } = {};

    private textfieldControl: AbstractControl;

    private messageAggregator: MessageAggregator;
    private displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };

    private isStayInEditor: boolean;
    // tslint:disable-next-line:member-ordering
    private subscription: ISubscription;

    constructor(private messageService: AlloyPropertyGridMessageService,
                private cdr: ChangeDetectorRef,
                private fb: FormBuilder) {
    }

    @HostListener('focusout', ['$event'])

    public onFocusOut(event: KeyboardEvent): void {
        // console.log('Focus Out');
        // update the params value with current input value
        this.sendValue();
    }

    @HostListener('keydown', ['$event'])
    public onKeydownHandler(event: KeyboardEvent): void {
        let isStopPropagation = true;
        switch (event.keyCode) {
            case Key.Backspace:
                // console.log('Backspace Key');
                break;
            case Key.Enter:
                // console.log('Enter Key');
                isStopPropagation = false;
                // tslint:disable-next-line:no-string-literal
                this.sendValue();
                break;
            default:
                break;
        }
        if (isStopPropagation) {
            event.stopPropagation();
        }
    }

    private sendValue(): void {
        if (this.noClientErrors()) {
            // update the params value with current input value
            // even if the value did not change, it send message for moving next cell.
            if (String(this.params.value) !== String(this.textfieldControl.value) && this.params.node.data) {
                // if (this.params.node.data) {
                this.params.value = this.textfieldControl.value;
                this.messageService.sendMessage(this.params, true);
            }
        }
    }

    private noClientErrors(): boolean {
        const allErrors = this.textfieldControl.errors;
        // if no errors at all, then we are good - return true
        if (!allErrors) {
            return true;
        }

        const allSize = Object.keys(allErrors).length;
        const serverSize = allErrors.serverValidation ? 1 : 0;
        if (allSize - serverSize === 0) {
            return true;
        } else {
            return false;
        }
    }

    public ngOnInit(): void {
        // sometimes params doesn't have a data (not sure why)
        if (this.params && this.params.node && this.params.node.data) {
            this.serverErrors = this.params.node.data.errorMessages;
            this.textfieldForm = this.fb.group({
                textfieldControlName: [this.params.value, undefined],
                serverErrors: [this.serverErrors, undefined]
            });
        } else {
            this.serverErrors = undefined;
            this.textfieldForm = this.fb.group({
                textfieldControlName: [undefined, undefined],
                serverErrors: [undefined, undefined]
            });
        }
        // tslint:disable-next-line:no-string-literal
        this.textfieldControl = this.textfieldForm.controls['textfieldControlName'];
        this.updateValidator();
        this.checkValidationError();
    }

    public ngAfterViewInit(): void {
        if (this.cdr) {
            this.cdr.detectChanges();
        }

        this.subscription = this.textfieldForm.valueChanges
            .subscribe((value) => {
                this.checkValidationError();
            });

        // only send focus if the editor (not the renderer) is editing
        // the editor does not have params.data, only the renderer does
        // why use setTimeout? due to avoid conflict ag-grid startEditingCell() API in AlloyPropertyGridComponent's ngOnInit(),
        // if not use setTimeout(), ExpressionChangedAfterItHasBeenCheckedError will be appear
        if (this.params && this.params.node.data &&
            this.textInputBox &&
            this.textInputBox.nativeElement) {
            setTimeout( () => {
                this.textInputBox.nativeElement.focus();
                this.textInputBox.nativeElement.select();
            }, 0);
        }
    }

    public ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = undefined;
        }
    }

    private checkValidationError(): void {
        // tslint:disable-next-line:no-string-literal
        if (this.textfieldControl.errors) {
            // get validation error message with key
            this.displayMessage = this.messageAggregator.processMessages(this.textfieldForm);
            this.setMessageTooltip();
        }
    }

    public setValidator(validators: ValidatorFn[], validatorsMessage: { [key: string]: string }): void {
        if (validators) {
            this.validators = validators;
            this.validatorsMessage = validatorsMessage;
        }
    }

    public updateValidator(): void {
        if (this.textfieldForm && this.validators) {
            // update validator message
            this.validationMessages = {
                textfieldControlName: this.validatorsMessage
            };

            // update message aggregator
            this.messageAggregator = new MessageAggregator(this.validationMessages);

            const control = this.textfieldControl;

            // update validator functions
            control.clearValidators();
            control.setValidators(this.validators);
            control.updateValueAndValidity();
            this.setMessageTooltip();
        }
    }

    private setMessageTooltip(): void {
        // assign validation tooltip message
        this.messageTooltip = '';
        Object.keys(this.displayMessage).forEach((controlKey) => {
            if (this.displayMessage.hasOwnProperty(controlKey)) {
                this.messageTooltip += this.displayMessage[controlKey] + '\r\n';
            }
        });
        // tslint:disable-next-line:no-string-literal
        if (this.textfieldControl.errors && this.textfieldControl.errors['serverValidation']) {
            this.messageTooltip += this.serverErrors.join('\r\n');
        }
    }
}
