/*
 * Copyright Keysight Technologies 2017. All rights reserved.
 */
import { IPropertyGridColumn } from './property-grid-column';

export interface IPropertyGridOption {
    width: string;
    height: string;
    columns: IPropertyGridColumn[];
    getColumns(): IPropertyGridColumn[];
    setColumns(newColumns: IPropertyGridColumn[]): void;
}

export class PropertyGridOption implements IPropertyGridOption {
    public columns: IPropertyGridColumn[];
    constructor(public width: string, public height: string) {
    }

    // get the colums information
    public getColumns(): IPropertyGridColumn[] {
        return this.columns;
    }

    // set the colums information
    public setColumns(newColumns: IPropertyGridColumn[]): void {
        this.columns = newColumns;
    }
}
