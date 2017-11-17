/*
 * Copyright Keysight Technologies 2017. All rights reserved.
 */
import { Injectable } from '@angular/core';
import { ValidatorFn } from '@angular/forms';
export interface IDictionary {
    // tslint:disable-next-line:no-any
    [key: string]: any;
}

@Injectable()
export class AlloyPropertyGridValidatorService {
    public validators: IDictionary[];
    public validatorMessages: IDictionary[];
    // tslint:disable-next-line:no-any
    public setValidator(newValidators: ValidatorFn[], newValidatorMessages: any ): void {
        this.validators = newValidators;
        this.validatorMessages = newValidatorMessages;
    }


    // tslint:disable-next-line:no-any
    public getValidator(keyName: string): [ ValidatorFn[], any ] {
        let [validators, validatorMessages] = [undefined, undefined];
        for (const item of this.validators) {
            if (item.key === keyName) {
                validators = item.validators;
                break;
            }
        }
        for (const item of this.validatorMessages) {
            if (item.key === keyName) {
                validatorMessages = item.validatorMessages;
                break;
            }
        }
        return [validators, validatorMessages];
    }
}
