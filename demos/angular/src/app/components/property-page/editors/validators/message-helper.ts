/*
 * Copyright Keysight Technologies 2017. All rights reserved.
 */
import { AbstractControl, ValidatorFn } from '@angular/forms';

export class MessageHelper {
    // tslint:disable-next-line:function-name
    public static setMessageForRange([minimumNumber, maximumNumber]: [number, number]): string {
        return `Values[s] must be between ${minimumNumber} and ${maximumNumber}.`;
    }
    // tslint:disable-next-line:function-name
    public static setMessageForInCorrectFormat(): string {
        return 'A capital Z is not allowed';
        // return 'Input string was not in a correct format.';
    }

    // tslint:disable-next-line:function-name
    public static setMessageForMinLength(minLength: number): string {
        return `Length must be greater than ${minLength}.`;
    }

    // tslint:disable-next-line:function-name
    public static setMessageForMaxlength(maxLength: number): string {
        return `Length must be less than ${maxLength}.`;
    }
}
