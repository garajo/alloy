/*
 * Copyright Keysight Technologies 2017. All rights reserved.
 */
import { Injectable } from '@angular/core';
import { GridApi } from 'ag-grid';
export interface IDictionary {
    // tslint:disable-next-line:no-any
    [key: string]: any;
}

@Injectable()
export class AlloyPropertyGridDynamicControlService {
    // tslint:disable-next-line:no-any
    public controls: IDictionary[];

    // tslint:disable-next-line:no-any
    public setControls(newControls: any): void {
        this.controls = newControls;
    }

    // tslint:disable-next-line:no-any
    public getControl(keyName: string): [any, boolean, boolean] {
        const control = undefined;
        // this hasOwnProperty doesn't work for dictionary key access
        // like this.styledControls.hasOwnProperty(keyName)
        for (const item of this.controls) {
            if (item.key === keyName) {
                return [item.component, item.isLandingEnterKey, item.isSupportCellEditing];
            }
        }
        return [control, false, false];
    }

    public getNextEditableRowIndex(api: GridApi, currentIndex: number ): number {
        const lastDisplayedRow = api.getLastDisplayedRow();
        let nextDisplayedRow = currentIndex;
        for (let index = currentIndex + 1; index <= lastDisplayedRow; index++) {
            nextDisplayedRow = index;
            const nextElement = api.getDisplayedRowAtIndex(nextDisplayedRow);
            if (nextElement.data) {
                // console.log('getDisplayedRowAtIndex(): next data '.concat(JSON.stringify(nextElement.data)));
                // tslint:disable-next-line:no-unused-variable
                const [nextControl, isLandingEnterKey, isSupportCellEditing] = this.getControl(nextElement.data.typeName);
                if (nextControl) {
                    if (isLandingEnterKey && !nextElement.data.readOnly) {
                        // stop to loop this cell is landing cell for EnterKey input
                        break;
                    }
                }
            }
        }
        return nextDisplayedRow;
    }
}
