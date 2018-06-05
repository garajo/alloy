import { Input, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FocusableOption } from '@angular/cdk/a11y';

declare function require(name: string): string;

@Component({
    selector: 'app-checkbox-page',
    templateUrl: './checkbox-page.component.html'
})
export class CheckboxPageComponent implements OnInit {

    disabledSimple = false;

    _checkedSimple = false;

    @Input()
    get checkedSimple() { return this._checkedSimple; }
    set checkedSimple(value: boolean) {
      console.log('checked simple');
      this._checkedSimple = value;
    }

    readonlySimple = false;
    errorsSimple = false;
    sizeSimple = 14; //Default checkbox size based on Caranu style guide.

    disabledIcon = false;
    checkedIcon = false;
    readonlyIcon = false;
    errorsIcon = true;

    disabledMixed = false;
    checkedMixed = false;
    readonlyMixed = false;
    errorsMixed = false;

    disabledFocus = false;
    checkedFocus = false;
    readonlyFocus = false;
    errorsFocus = false;

    errorMessage = 'Validation errors in checkbox';
    placeholder = 'Checkbox';
    iconSrc = '../../assets/userProfLogo.png';

    @ViewChild('focusCheckBox') focusCheckBox: FocusableOption;

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
            case 'focus':
            this.disabledFocus = !this.disabledFocus;
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
            case 'focus':
            if (!this.disabledFocus && !this.readonlyFocus) {
                this.checkedFocus = !this.checkedFocus;
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
            case 'focus':
            this.readonlyFocus = !this.readonlyFocus;
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
            case 'focus':
            this.errorsFocus = !this.errorsFocus;
            break;
        }
    }

    focusOnCheckBox() {
        this.focusCheckBox.focus();
    }

    ngOnInit() {
    }

    isNumberKey(event){
        const inputChar = String.fromCharCode(event.keyCode);
        if (['0','1','2','3','4','5','6','7','8','9'].indexOf(inputChar) === -1) {
            event.preventDefault();
        }
    }
}
