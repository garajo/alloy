import { Component, OnInit } from '@angular/core';
declare function require(name: string): string;

@Component({
    selector: 'app-checkbox-page',
    templateUrl: './checkbox-page.component.html',
    styleUrls: ['./checkbox-page.component.scss']
})
export class CheckboxPageComponent implements OnInit {

    disabled = false;
    checked = false;
    placeholder = 'This is a checkbox';

    constructor() { }

    toggleDisabled() {
        this.disabled = !this.disabled;
    }

    toggleChecked() {
        this.checked = !this.checked;
    }

    ngOnInit() {

    }


}
