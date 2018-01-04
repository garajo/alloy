import { Component, OnInit } from '@angular/core';
declare function require(name: string): string;

@Component({
    selector: 'app-checkbox-page',
    templateUrl: './checkbox-page.component.html'
})
export class CheckboxPageComponent implements OnInit {

    disabledSimple = false;
    checkedSimple = false;
    disabledIcon = false;
    checkedIcon = false;
    disabledMixed = false;
    checkedMixed = false;
    checkedErrorIcon = false;
    disabledErrorIcon = false;
    // Turn the error checkbox into the error state by default
    errorsErrorIcon = true;

    placeholder = 'This is a checkbox';
    iconSrc = '../../assets/userProfLogo.png';

    constructor() { }

    toggleDisabledSimple() {
        this.disabledSimple = !this.disabledSimple;
    }

    toggleCheckedSimple() {
        this.checkedSimple = !this.checkedSimple;
    }

    toggleDisabledIcon() {
        this.disabledIcon = !this.disabledIcon;
    }

    toggleCheckedIcon() {
        this.checkedIcon = !this.checkedIcon;
    }

    toggleDisabledMixed() {
        this.disabledMixed = !this.disabledMixed;
    }

    toggleCheckedMixed() {
        this.checkedMixed = !this.checkedMixed;
    }

    toggleCheckedErrorIcon() {
        this.checkedErrorIcon = !this.checkedErrorIcon;
    }

    toggleDisabledErrorIcon() {
        this.disabledErrorIcon = !this.disabledErrorIcon;
    }

    toggleErrorsErrorIcon() {
        this.errorsErrorIcon = !this.errorsErrorIcon;
    }

    ngOnInit() {

    }


}
