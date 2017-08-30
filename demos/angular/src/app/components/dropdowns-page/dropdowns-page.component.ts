import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-dropdowns-page',
    templateUrl: './dropdowns-page.component.html',
    styleUrls: ['./dropdowns-page.component.scss']
})
export class DropdownsPageComponent implements OnInit {
    private id: number = 0;

    disabled = false;
    selectedValue: string;
    placeholder: string = 'Select One';


    modules = [
        { value: 'wf-0', name: 'Waveform Filename' },
        { value: 'wl-1', name: 'Waveform Length' },
        { value: 'cf-2', name: 'Carrier Frequency' }
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

        if (id >=0) {
            this.modules.splice(id, 1);
        }
    }

    constructor() { }

    ngOnInit() {

    }

}
