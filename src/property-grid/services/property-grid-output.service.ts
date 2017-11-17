/*
 * Copyright Keysight Technologies 2017. All rights reserved.
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AlloyPropertyGridOutputService {
    // tslint:disable-next-line:no-any
    private subject = new Subject<any>();
    // tslint:disable-next-line:no-any
    public sendOutput(message: any): void {
        this.subject.next(message);
    }

    public clearOutput(): void {
        this.subject.next();
    }

    // tslint:disable-next-line:no-any
    public getOutput(): Observable<any> {
        return this.subject.asObservable();
    }
}
