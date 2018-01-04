import { Component, OnInit } from '@angular/core';
declare function require(name: string): string;

@Component({
    selector: 'app-checkbox-page',
    templateUrl: './checkbox-page.component.html'
})
export class CheckboxPageComponent implements OnInit {

    disabledSimple = false;
    checkedSimple = false;
    readonlySimple = false;
    errorsSimple = false;

    disabledIcon = false;
    checkedIcon = false;
    readonlyIcon = false;
    errorsIcon = true;

    disabledMixed = false;
    checkedMixed = false;
    readonlyMixed = false;
    errorsMixed = false;

    errorMessage = 'Validation errors in checkbox';
    placeholder = 'Checkbox';
    iconSrc = '../../assets/userProfLogo.png';

    constructor() { }

    toggleDisabled(checkboxtype: string) {
        switch (checkboxtype) {
            case 'simple':
            this.disabledSimple = !this.disabledSimple;
            break;
            case 'icon':
            this.disabledIcon = !this.disabledIcon;
            break;
            case 'mixed':
            this.disabledMixed = !this.disabledMixed;
            break;
        }
    }

    toggleChecked(checkboxtype: string) {
        switch (checkboxtype) {
            case 'simple':
            if (!this.disabledSimple && !this.readonlySimple) {
                this.checkedSimple = !this.checkedSimple;
            }
            break;
            case 'icon':
            if (!this.disabledIcon && !this.readonlyIcon) {
                this.checkedIcon = !this.checkedIcon;
            }
            break;
            case 'mixed':
            if (!this.disabledMixed && !this.readonlyMixed) {
                this.checkedMixed = !this.checkedMixed;
            }
            break;
        }
    }

    toggleReadonly(checkboxtype: string) {
        switch (checkboxtype) {
            case 'simple':
            this.readonlySimple = !this.readonlySimple;
            break;
            case 'icon':
            this.readonlyIcon = !this.readonlyIcon;
            break;
            case 'mixed':
            this.readonlyMixed = !this.readonlyMixed;
            break;
        }
    }

    toggleErrorState(checkboxtype: string) {
        switch (checkboxtype) {
            case 'simple':
            this.errorsSimple = !this.errorsSimple;
            break;
            case 'icon':
            this.errorsIcon = !this.errorsIcon;
            break;
            case 'mixed':
            this.errorsMixed = !this.errorsMixed;
            break;
        }
    }

    ngOnInit() {
    }
}
