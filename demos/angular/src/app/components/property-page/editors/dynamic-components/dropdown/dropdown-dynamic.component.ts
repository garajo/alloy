/*
 * Copyright Keysight Technologies 2017. All rights reserved.
 */
import { Component, AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { AlloyPropertyGridMessageService } from '@keysight/alloy';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    // tslint:disable-next-line:component-selector
    selector: 'client-dynamic-component',
    templateUrl: './dropdown-dynamic.component.html'
})

export class DropdownDynamicComponent implements AfterViewInit, OnInit {
    // tslint:disable-next-line:no-any
    public params: any;
    public dropdownForm: FormGroup;
    public serverErrors: string[];
    public messageTooltip = '';

    private validators: ValidatorFn[];
    private validatorsMessage: { [key: string]: string } = {};

    private dropdownControl: AbstractControl;
    public placeholder: string;

    public modules = [];

    private internalSelectedValue: string;
    get selectedValue(): string {
        return this.internalSelectedValue;
    }
    set selectedValue(newSelectedValuer: string) {
        this.internalSelectedValue = newSelectedValuer;
        this.onChange(newSelectedValuer);
    }

    constructor(private messageService: AlloyPropertyGridMessageService,
                private cdr: ChangeDetectorRef,
                private fb: FormBuilder) {
    }

    public ngOnInit(): void {
        // sometimes params doesn't have a data (not sure why)
        if (this.params.node.data) {
            this.serverErrors = this.params.node.data.errors;
            // copy data
            this.modules = [];
            this.internalSelectedValue = this.placeholder = this.params.node.data.value;
            if (this.params.node.data.values) {
                this.params.node.data.values.forEach((element) => {
                    this.modules.push({ value: element, name: element});
                });
            }
        }

        this.dropdownForm = this.fb.group({
            dropdownFormControl: [this.params.value, undefined],
            serverErrors: [this.serverErrors, undefined]
        });
        // tslint:disable-next-line:no-string-literal
        this.dropdownControl = this.dropdownForm.controls['dropdownFormControl'];
        this.updateValidator();
    }

    public setValidator(validators: ValidatorFn[], validatorsMessage: { [key: string]: string }): void {
        if (validators) {
            this.validators = validators;
            this.validatorsMessage = validatorsMessage;
        }
    }

    private updateValidator(): void {
        if (this.dropdownForm && this.validators) {
            const control = this.dropdownControl;

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
        if (this.dropdownControl.errors && this.dropdownControl.errors['serverValidation']) {
            this.messageTooltip += this.serverErrors.join('\r\n');
        }
    }

    public ngAfterViewInit(): void {
        this.cdr.detectChanges();
    }

    public onChange(value: string): void {
        if (this.params) {
            this.placeholder = value;
            this.params.value = value;
            this.messageService.sendMessage(this.params);
        }
    }
}
