/*
 * Copyright Keysight Technologies 2017. All rights reserved.
 */
import { FormGroup } from '@angular/forms';

// Generic validator for Reactive forms
// Implemented as a class, not a service, so it can retain state for multiple forms.
export class MessageAggregator {

    // Provide the set of valid validation messages
    // Stucture:
    // editorName1: {
    //     validationRuleName1: 'Validation Message.',
    //     validationRuleName2: 'Validation Message.'
    // },
    // editorName2: {
    //     validationRuleName1: 'Validation Message.',
    //     validationRuleName2: 'Validation Message.'
    // }
    constructor(private validationMessages: { [key: string]: { [key: string]: string } }) {

    }

    // Processes each control within a FormGroup
    // And returns a set of validation messages to display
    // Structure
    // editorName1: 'Validation Message.',
    // editorName2: 'Validation Message.'
    public processMessages(container: FormGroup): { [key: string]: string } {
        // tslint:disable-next-line:prefer-const
        let messages = {};
        Object.keys(container.controls).forEach((controlKey) => {
            if (container.controls.hasOwnProperty(controlKey)) {
                const c = container.controls[controlKey];
                if (this.validationMessages[controlKey]) {
                    messages[controlKey] = '';
                    // if add (c.dirty || c.touched) condition check, it will miss intial error
                    if (c.errors) {
                        Object.keys(c.errors).map((messageKey) => {
                            if (this.validationMessages[controlKey][messageKey]) {
                                messages[controlKey] += this.validationMessages[controlKey][messageKey] + '\r\n';
                            }
                        });
                    }
                }
            }
        });
        return messages;
    };

    // get the count of validation error
    public getErrorCount(container: FormGroup): number {
        let errorCount = 0;
        if (container.controls && container) {
            Object.keys(container.controls).forEach((controlKey) => {
                if (container.controls.hasOwnProperty(controlKey)) {
                    if (container.controls[controlKey].errors) {
                        errorCount += Object.keys(container.controls[controlKey].errors).length;
                        console.log(errorCount);
                    }
                }
            });
        }
        return errorCount;
    };
}
