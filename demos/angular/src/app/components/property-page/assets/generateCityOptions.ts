/*
 * Copyright Keysight Technologies 2017. All rights reserved.
 */
import { CityType } from './cityType';

export class GenerateCityOptions {
    public static doIt(): any {
        return JSON.parse(`[
            {
                "typeName": "Enum",
                "options": ["New York", "Loveland", "San Francisco"]
            }
        ]`);
    }
}

