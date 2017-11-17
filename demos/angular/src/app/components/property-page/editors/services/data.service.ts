/*
 * Copyright Keysight Technologies 2017. All rights reserved.
 */
import { AlloyPropertyGridGroupRow, AlloyPropertyGridPropertyRow } from '@keysight/alloy';
import { GenerateApgDemoData } from '../../assets/generateApgDemoData';
import { GenerateCityOptions } from '../../assets/generateCityOptions';
import { Injectable  } from '@angular/core';
import { Observable } from 'rxjs/Rx';

// The data service supplies the data to be inserted into the grid.
// For demo purposes, the getData function manually constructs static data.
// In actual use, the getData function would involve working with the application
// to create the data on the fly.  For example, in Swivel, selecting
// a test step results in a call to retrieve a new set of properties
// for the selected teststep.

@Injectable()
export class DataService {
    // Since we are creating the data statically, we don't
    // "really" need the observable here.  However, in most applications
    // you would be watching the data source, and an observable makes sense.
    public getData(): Observable<any> {
        const temp = GenerateApgDemoData.doIt();
        return Observable.of(temp);
    }

    public getOption(): Observable<any> {
        const temp = GenerateCityOptions.doIt();
        return Observable.of(temp);
    }
}
