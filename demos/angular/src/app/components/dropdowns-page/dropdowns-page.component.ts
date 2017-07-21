import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-dropdowns-page',
    templateUrl: './dropdowns-page.component.html',
    styleUrls: ['./dropdowns-page.component.scss']
})
export class DropdownsPageComponent implements OnInit {
    selectedOption: string;


    modules = [
        { value: 'qpsk-0', name: 'QPSK' },
        { value: 'lmr-1', name: 'LMR' },
        { value: 'some-module-3', name: 'Some module' }
    ];


    constructor() { }

    ngOnInit() {

    }

}
