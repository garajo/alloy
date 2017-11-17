/*
 * Copyright Keysight Technologies 2017. All rights reserved.
 */
import { Component, AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { AlloyPropertyGridMessageService } from '@keysight/alloy/';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'client-dynamic-component',
    templateUrl: './checkbox-dynamic.component.html'
})
export class CheckboxDynamicComponent implements AfterViewInit, OnInit {
    // tslint:disable-next-line:no-any
    public params: any;
    public checkboxForm: FormGroup;
    public serverErrors: string[];
    public messageTooltip = '';

    private validators: ValidatorFn[];
    private validatorsMessage: { [key: string]: string } = {};

    private checkboxControl: AbstractControl;

    constructor(private messageService: AlloyPropertyGridMessageService,
                private cdr: ChangeDetectorRef,
                private fb: FormBuilder) {
    }

    public ngOnInit(): void {
        // sometimes params doesn't have a data (not sure why)
        if (this.params.node.data) {
            this.serverErrors = this.params.node.data.errors;
        }

        this.checkboxForm = this.fb.group({
            checkboxFormControl: [this.params.value, undefined],
            serverErrors: [this.serverErrors, undefined]
        });
        // tslint:disable-next-line:no-string-literal
        this.checkboxControl = this.checkboxForm.controls['checkboxFormControl'];
        this.updateValidator();
    }

    public setValidator(validators: ValidatorFn[], validatorsMessage: { [key: string]: string }): void {
        if (validators) {
            this.validators = validators;
            this.validatorsMessage = validatorsMessage;
        }
    }

    private updateValidator(): void {
        if (this.checkboxForm && this.validators) {
            const control = this.checkboxControl;

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
        // tslint:disable-next-line:no-string-literal
        if (this.checkboxControl.errors && this.checkboxControl.errors['serverValidation']) {
            this.messageTooltip += this.serverErrors.join('\r\n');
        }
    }

    public ngAfterViewInit(): void {
        this.cdr.detectChanges();
    }

    public onChange(value: boolean): void {
        if (this.params) {
            this.params.value = value;
            // console.log('onChange in boolean' + value.toString());
            this.messageService.sendMessage(this.params);
        }
    }

}
