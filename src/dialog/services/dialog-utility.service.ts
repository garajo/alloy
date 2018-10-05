/*
 * Copyright Keysight Technologies, All Rights Reserved
 * Keysight Confidential
 */
import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { IDialogComponent } from '../models/dialog';

export interface IDialogParam {
    dialogRef: MatDialogRef<IDialogComponent>;
    item: any; // tslint:disable-line:no-any
}

@Injectable()
export class DialogUtility {
    public setFocus = new Subject<MatDialogRef<IDialogComponent>>();
    public closeDialog = new Subject<IDialogParam>();

    public notifyFocus(dialogRef: MatDialogRef<IDialogComponent>): void {
        this.setFocus.next(dialogRef);
    }

    /**
     * `dialogRef: MatDialogRef`- A reference of the dialog invoking the close action.
     * `item: AlloyDialogItem` - Data passed into AlloyDialogConfig when opening Dialog will be emitted back out to caller.
     *                           Useful for consumers interested with the updated data.
     */
    public notifyClose(dialogParam: IDialogParam): void {
        this.closeDialog.next(dialogParam);
    }
}