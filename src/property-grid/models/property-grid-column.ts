/*
 * Copyright Keysight Technologies 2017. All rights reserved.
 */

export interface IPropertyGridColumn {
    key: string;
    width: number;
}

export class PropertyGridColumn {
    constructor(public key: string, public width: number) {
    }
}
