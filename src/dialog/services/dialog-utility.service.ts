/*
 * Copyright Keysight Technologies, All Rights Reserved
 * Keysight Confidential
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { AlloyDialogRef } from '../models/dialog';

export interface IDialogParam {
    dialogRef: AlloyDialogRef;
    item: any; // tslint:disable-line:no-any
}

@Injectable()
export class DialogUtility {
    public setFocus = new Subject<AlloyDialogRef>();
    public closeDialog = new Subject<IDialogParam>();

    public notifyFocus(dialogRef: AlloyDialogRef): void {
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