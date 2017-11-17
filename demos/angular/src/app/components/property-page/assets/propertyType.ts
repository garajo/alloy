/*
 * Copyright Keysight Technologies 2017. All rights reserved.
 */

// See https://blog.rsuter.com/how-to-implement-an-enum-with-string-values-in-typescript/

// It is good practice to define a PropertyType as shown below.
// This avoids typos, and makes the resulting JSON files easy to read.

export enum PropertyType {
    // tslint:disable:no-any
    Boolean = <any> 'Boolean',
    Enum = <any> 'Enum',
    ShortStringWithNoZ = <any> 'ShortStringWithNoZ',
    StringWithNoValidation = <any> 'StringWithNoValidation'
    // tslint:enable:no-any
}
