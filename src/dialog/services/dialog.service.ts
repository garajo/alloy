/*
 * Copyright Keysight Technologies, All Rights Reserved
 * Keysight Confidential
 */ // tslint:disable:max-classes-per-file
import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Dialog, IDialogComponent, AlloyDialogConfig } from '../models/dialog';
import { DialogComponent } from '../dialog.component';
import { DialogUtility, IDialogParam } from './dialog-utility.service';

@Injectable()
export class AlloyDialogService {
    public dialogConfig: MatDialogConfig;
    private renderer: Renderer2;
    private dialogs: Dialog[];

    constructor(private dialog: MatDialog,
        public rendererFactory: RendererFactory2,
        private dialogUtility: DialogUtility) {
        this.dialogs = [];
        // Service is designed not to use Angular Renderer2. Use rendererFactory to manually create a Renderer instead.
        this.renderer = rendererFactory.createRenderer(null, null); // tslint:disable-line:no-null-keyword

        this.dialogUtility.setFocus.subscribe((dialogRef: MatDialogRef<IDialogComponent>) => {
            this.setFocus(dialogRef);
        });

        // handles dialog default 'X' close action in title bar
        this.dialogUtility.closeDialog.subscribe((dialogParam: IDialogParam) => {
            this.closeDialogByRef(dialogParam.dialogRef, dialogParam.item.content);
        });
    }

    /**
     * Opens a modal/modeless dialog by passing in `AlloyDialogConfig`.
     * @param `AlloyDialogConfig` (Required)
     *
     * Recommended configurable options:
     *
     * `id?: string` — Unique ID for the dialog. If omitted, a unique one will be generated.
     *
     * `panelClass: string` — (Required) Unique string. Used for Dialog draggable feature.
     *
     * `data: AlloyDialogItem` — (Required) Inject your custom component and data here into Dialog.
     *
     * `title: string` — (Required) Dialog's title bar information.
     *
     * `hasBackdrop?: boolean` — Dialog's background overlay.
     *
     * `disableClose?: boolean` — Escape Key or click on Backdrop to close dialog.
     *
     * `draggable?: boolean` — Whether the user can drag the dialog.
     *
     * `resizable?: boolean` — Whether the user can resize the dialog.
     *
     * @returns `dialogRef` — Reference to the newly-opened dialog.
     */
    public openDialog(config?: AlloyDialogConfig): MatDialogRef<IDialogComponent> {
        let dialogRef = this.dialog.getDialogById(config.id);
        if (!dialogRef) {
            // Open new dialog with the defined dialog id
            dialogRef = this.dialog.open(DialogComponent, config);
            // config.data.content.dragId = config.panelClass;
            dialogRef.componentInstance.dialogConfig = config;
            this.dialogConfig = config;
            this.addDialog(dialogRef);
        }
        // Shift focus to dialog
        this.setFocus(dialogRef);
        return dialogRef;
    }

    /**
     * Close a dialog with id.
     * @param `id` - Required.
     * @param `data` (Optional) - overwrites the default data to be returned to dialog opener.
     * @returns Returns `true` if successfully closed, otherwise `false`.
     */
    public closeDialog(id: string, data?: any): boolean { // tslint:disable-line:no-any
        const dialogRef = this.dialog.getDialogById(id);
        if (dialogRef) {
            this.removeDialog(dialogRef);
            dialogRef.close(data || dialogRef.componentInstance.dialogConfig.data.content);
            return true;
        }
        console.error('AlloyDialogService.closeDialog: Invalid dialog id: ', id);
        return false;
    }

    /**
     * Close a dialog with dialogRef.
     * @param `dialogRef` - Required.
     * @param `data` (Optional) - data to return to the dialog opener on dialog close.
     */
    public closeDialogByRef(dialogRef: MatDialogRef<IDialogComponent>, data?: any): void { // tslint:disable-line:no-any
        this.removeDialog(dialogRef);
        dialogRef.close(data || dialogRef.componentInstance.dialogConfig.data.content);
        // Shift focus to last opened dialog
        if (this.dialogs.length) {
            this.setFocus(this.dialogs[this.dialogs.length - 1].dialogRef);
        }
    }

    /**
     * Closes all dialogs
     */
    public closeAll(): void {
        this.dialog.closeAll();
        this.dialogs = undefined;
    }

    /**
     * Query if a dialog is already open with a dialog id.
     * @param `id` - Required.
     * @returns Returns `true` if dialog is open, otherwise `false`.
     */
    public isDialogOpen(id: string): boolean {
        const dialogRef = this.dialogs.find((item) => item.dialogRef.id === id);
        return dialogRef ? true : false;
    }

    /**
     * Query if all dialogs are already closed.
     * @returns Returns `true` if no dialogs are found, otherwise `false`.
     */
    public isAllDialogClose(): boolean {
        return this.dialogs.length ? false : true;
    }

    /**
     * Query for DialogRef with its ID.
     * @param `id` - Required.
     * @returns `DialogRef`.
     */
    public getDialogRefById(id: string): MatDialogRef<IDialogComponent> {
        return this.dialogs.find((dialog) => {
            return dialog.dialogRef.id === id;
        }).dialogRef;
    }

    /**
     * Set focus on one active dialog and put other dialogs in the background.
     *
     * By default, AlloyDialogService already handles dialog focus. Use this only if you really need to overwrite the original behavior.
     * @param `dialogRef` (Required) - Pass in a DialogRef to set focus.
     */
    public setFocus(dialogRef: MatDialogRef<IDialogComponent>): void {
        dialogRef.componentInstance.focus();
        // LOUIS: Issue with setting z-index in SCSS. This is the angular approach workaround. Not an elegant way for UI events.
        this.dialogs.forEach((dialog) => {
            if (dialogRef.id === dialog.dialogRef.id) {
                if (!dialog.isFocused) {
                    dialog.isFocused = true;
                    // Gomedh - Setting the z-index value to 1000 from 2000 (after discussing with Sean),
                    // since the drop down panel was coming behind the dialog on active
                    this.renderer.setStyle(dialogRef.componentInstance.dialogOverlay, 'z-index', '1000');
                }
            } else {
                if (dialog.isFocused && dialog.dialogRef.componentInstance.dialogOverlay) {
                    dialog.isFocused = false;
                    // Gomedh - Setting the z-index value to 999 from 1000 (after discussing with Sean)
                    // since the drop down panel was coming behind the dialog on active
                    this.renderer.setStyle(dialog.dialogRef.componentInstance.dialogOverlay, 'z-index', '999');
                }
            }
        });
    }

    private addDialog(dialogRef: MatDialogRef<IDialogComponent>): void {
        this.dialogs.push(new Dialog(dialogRef, false));
    }
    private removeDialog(dialogRef: MatDialogRef<IDialogComponent>): void {
        this.dialogs = this.dialogs.filter((item) => item.dialogRef.id !== dialogRef.id);
    }
}
