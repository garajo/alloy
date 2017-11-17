/*
 * Copyright Keysight Technologies 2017. All rights reserved.
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AlloyPropertyGridTypeService {
    // tslint:disable:no-any
    public rowData: any[] = [];
    private subject = new Subject<any>();
    private subjectRowData = new Subject<any>();
    public sendType(newType: any): void {
        this.subject.next(newType);
    }
    // tslint:enable:no-any

    public clearType(): void {
        this.subject.next();
    }

    // tslint:disable-next-line:no-any
    public getType(): Observable<any> {
        return this.subject.asObservable();
    }

    // tslint:disable-next-line:no-any
    public getRowData(): Observable<any> {
        return this.subjectRowData.asObservable();
    }

    // tslint:disable-next-line:no-any
    public sendRowData(newRowData: any): void {
        this.subjectRowData.next(newRowData);
    }

    public clearRowData(): void {
        this.subjectRowData.next();
    }

    // tslint:disable-next-line:no-any
    public setRowData(rowData: any): void {
        this.rowData = rowData;
    }
}
