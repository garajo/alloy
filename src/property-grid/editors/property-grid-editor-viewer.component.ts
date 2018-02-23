/*
 * Copyright Keysight Technologies 2017. All rights reserved.
 */
import { AfterViewInit, Component, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { ValidatorFn } from '@angular/forms';

import { ICellEditorAngularComp } from 'ag-grid-angular/dist/interfaces';

import { AlloyPropertyGridOutputService } from '../services/property-grid-output.service';
import { AlloyPropertyGridDynamicControlService } from '../services/property-grid-dynamic-control.service';
import { AlloyPropertyGridValidatorService } from '../services/property-grid-validator.service';
import { Key } from 'ts-keycode-enum';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    moduleId: module.id,
    templateUrl: './property-grid-editor-viewer.component.html'
})
export class AlloyPropertyGridEditorViewerComponent implements ICellEditorAngularComp, AfterViewInit {
    // tslint:disable:no-any
    public componentType: any;
    public componentControl: string;
    public params: any;
    private value: any;
    // tslint:enable:no-any

    public cancelBeforeStart = false;
    public validators: ValidatorFn[];
    public validatorMessages: { [key: string]: string };

    @HostListener('document:keydown', ['$event'])
        public onKeydownHandler(event: KeyboardEvent): void {
        if (event.keyCode === Key.Enter) {
            // console.log('Enter Key');
            this.params.api.stopEditing();
            // console.log('end Data: ' + this.params.value);
        }
    }

    constructor(private styleService: AlloyPropertyGridDynamicControlService,
                private outputService: AlloyPropertyGridOutputService,
                private validatorService: AlloyPropertyGridValidatorService) {
        // console.log('EditorViewerComponent constructor()');
    }

    // @ViewChild('input', {read: ViewContainerRef}) public input;

    // tslint:disable-next-line:no-any
    public agInit(params: any): void {
        this.params = params;
        this.value = this.params.value;

        if (params.node.data.typeName !== undefined) {
            // tslint:disable-next-line:no-unused-variable
            const [control, isLandingEnterKey, isSupportCellEditing] = this.styleService.getControl(params.node.data.typeName);
            if (control) {
                this.componentType = control;
                this.componentControl = params.node.data.typeName.toString();
            }

            const [validators, validatorMessages] = this.validatorService.getValidator(params.node.data.typeName);
            if (validators) {
                this.validators = validators;
                this.validatorMessages = validatorMessages;
            }
        }
    }

    // tslint:disable-next-line:no-any
    public getValue(): any {
        // console.log('EditorViewerComponent getValue()');
        return this.value;
    }

    public refresh(): void {
        // empty is OK
    }
    public onKeyDown(event: KeyboardEvent): void {
        if (!this.isKeyPressedNumeric(event)) {
            if (event.preventDefault) {
                event.preventDefault();
            }
        }
    }

    // dont use afterGuiAttached for post gui events - hook into ngAfterViewInit instead for this
    public ngAfterViewInit(): void {
        // this.input.element.nativeElement.focus();
    }

    // tslint:disable-next-line:no-any
    public getCharCodeFromEvent(event: any): any {
        event = event || window.event;
        // tslint:disable-next-line:no-typeof-undefined
        return (typeof event.which === 'undefined') ? event.keyCode : event.which;
    }

    // tslint:disable-next-line:typedef
    public isCharNumeric(charStr): boolean {
        return !!/\d/.test(charStr);
    }

    public isKeyPressedNumeric(event: KeyboardEvent): boolean {
        const charCode = this.getCharCodeFromEvent(event);
        const charStr = String.fromCharCode(charCode);
        return this.isCharNumeric(charStr);
    }

    // tslint:disable-next-line:no-any
    public onUpdate(packedParams: any): void {
        // console.log('update data at Dynamic component: ' + newParams.value);
        // tslint:disable-next-line:no-unused-variable
        const [newParams, isKeyEnter] = packedParams;
        this.params = newParams;
        this.value = this.params.value;
        if (this.params.node.data && this.params.node.data.id) {
            // console.log('EditorViewerComponent onUpdate()');
            // update changed value with payload to AlloyPropertyGridComponent via outputService
            const payload = [[this.params.node.data.id, this.params.value], this.params, isKeyEnter];
            this.outputService.sendOutput(payload);
        }
    }
}
