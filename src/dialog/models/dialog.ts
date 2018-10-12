/*
 * Copyright Keysight Technologies, All Rights Reserved
 * Keysight Confidential
 */
import { Type } from '@angular/core';
import { MatDialogRef, MatDialogConfig } from '@angular/material/dialog';

export class Dialog {
    public dialogRef: AlloyDialogRef;
    public isFocused: boolean;
    constructor(dialogRef: AlloyDialogRef, isFocused: boolean) { // tslint:disable-line:no-empty
        this.dialogRef = dialogRef;
        this.isFocused = isFocused;
    }
}

export class AlloyDialogItem {
    /**
     * @param `component` - (Required) The given component will be injected into the opened Dialog.
     * @param `content` - Custom data to be injected into Dialog which can be retrieved via `IAlloyDialogData` inside injected component.
     */
    constructor(public component: Type<any>, public content?: any) {} // tslint:disable-line:no-any
}

export class AlloyDialogConfig extends MatDialogConfig {
    /**
     * @param `draggable?: boolean` - Whether the user can drag the dialog. Default value `false`.
     */
    public draggable?: boolean;
    /**
     * @param `resizable?: boolean` - Whether the user can resize the dialog. Default value `false`.
     */
    public resizable?: boolean;
    /**
     * @param `title: string` - Required. Dialog title informaton.
     */
    public title: string;
}

export interface IAlloyDialogData {
    /**
     * @param `content` - Custom data to be injected into Dialog which can be retrieved via `IAlloyDialogData`.
     */
    content: any; // tslint:disable-line:no-any
    /**
     * @param `dialogRef` - A reference on the opened Dialog.
     */
    dialogRef: AlloyDialogRef;
}

export interface IDialogComponent {
    dialogOverlay: any; // tslint:disable-line:no-any
    dialogConfig: AlloyDialogConfig;
    focus(): void;
    onClose(): void;
}

export class AlloyDialogRef extends MatDialogRef<IDialogComponent> {
    // wrapper
}
