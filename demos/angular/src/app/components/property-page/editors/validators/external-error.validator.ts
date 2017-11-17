/*
 * Copyright Keysight Technologies 2017. All rights reserved.
 */
import { AbstractControl, ValidatorFn } from '@angular/forms';

export class ExternalErrorsValidator {
    // tslint:disable-next-line:function-name
    public static ExternalValidator(): ValidatorFn {
        return (c: AbstractControl): { [key: string]: boolean } => {
            if (c.parent.get('serverErrors').value && c.parent.get('serverErrors').value.length > 0) {
                return { 'serverValidation': true };
            } else {
                return undefined;
            }
        };
    }
}
