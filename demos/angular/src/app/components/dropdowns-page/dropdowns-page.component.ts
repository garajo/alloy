import { Component, OnInit } from '@angular/core';
declare function require(name: string): string;

@Component({
    selector: 'app-dropdowns-page',
    templateUrl: './dropdowns-page.component.html'
})
export class DropdownsPageComponent implements OnInit {
    private id = 0;

    selectedValue: string;
    alt_selectedValue: string;
    icon_selectedValue: string;
    placeholder = 'Select One';

    disabledState = false;
    readOnlyState = false;
    errorState = false;
    filterState = true;
    errorMessage = 'Validation errors in dropdown';


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

    add(_modules) {
        _modules.push({value: `${this.id}`, name: `Name ${this.id}`});
        this.id++;
    }

    remove(_module, _modules) {
        const id: number = _modules.findIndex((m, i) => {
            return _modules[i].value === _module.value;
        });

        console.log('id', id);

        if (id >= 0) {
            _modules.splice(id, 1);
        }
    }

    toggleErrorState() {
        this.errorState = !this.errorState;
    }

    toggleReadonlyState() {
        this.readOnlyState = !this.readOnlyState;
    }

    toggleDisabledState() {
        this.disabledState = !this.disabledState;
    }

    toggleFiltering() {
        this.filterState = !this.filterState;
    }

    constructor() { }

    ngOnInit() {

    }

}
