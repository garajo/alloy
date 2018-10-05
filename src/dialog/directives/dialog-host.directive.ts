/*
 * Copyright Keysight Technologies, All Rights Reserved
 * Keysight Confidential
 */
import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[dialog-host]'
})

export class DialogHostDirective {
    constructor(public viewContainerRef: ViewContainerRef) { }
}
