/*
 * Copyright Keysight Technologies 2017. All rights reserved.
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AlloyPropertyGridMessageService {
    // tslint:disable-next-line:no-any
    private subject = new Subject<any>();

    // tslint:disable-next-line:no-any
    private subjectCellEdit = new Subject<any>();

    // tslint:disable-next-line:no-any
    public sendMessage(message: any, isKeyEnter?: boolean): void {
        this.subject.next([message, isKeyEnter]);
    }

    public clearMessage(): void {
        this.subject.next();
    }

    // tslint:disable-next-line:no-any
    public getMessage(): Observable<any> {
        return this.subject.asObservable();
    }

    public publishEditCell(): void {
        this.subjectCellEdit.next();
    }

    public subscribeEditCell(): Observable<void> {
        return this.subjectCellEdit.asObservable();
    }
}
