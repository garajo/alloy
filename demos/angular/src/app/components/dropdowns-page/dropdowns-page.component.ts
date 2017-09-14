import { Component, OnInit } from '@angular/core';
declare function require(name: string): string;

@Component({
    selector: 'app-dropdowns-page',
    templateUrl: './dropdowns-page.component.html',
    styleUrls: ['./dropdowns-page.component.scss']
})
export class DropdownsPageComponent implements OnInit {
    private id = 0;
    public profImage = require('../../../assets/userProfLogo.png');

    disabled = false;
    selectedValue: string;
    alt_selectedValue: string;
    icon_selectedValue: string;
    placeholder = 'Select One';


    modules = [
        { value: 'wf-0', name: 'Waveform Filename' },
        { value: 'wl-1', name: 'Waveform Length' },
        { value: 'cf-2', name: 'Carrier Frequency' }
    ];

    alt_modules = [
        { value: 'wf-0', name: 'Waveform Filename' },
        { value: 'wl-1', name: 'Waveform Length' },
        { value: 'cf-2', name: 'Carrier Frequency' }
    ];

    icon_modules = [
        { value: 'edit_prof', name: 'Edit Profile' },
        { value: 'view_sett', name: 'View Settings' },
        { value: 'log_out', name: 'Log Out' }
    ];

    add() {
        this.modules.push({value: `${this.id}`, name: `Name ${this.id}`});
        this.id++;
    }

    remove(_module) {
        const id: number = this.modules.findIndex((m, i) => {
            return this.modules[i].value === _module.value;
        });

        console.log('id', id);

        if (id >= 0) {
            this.modules.splice(id, 1);
        }
    }

    constructor() { }

    ngOnInit() {

    }

}
