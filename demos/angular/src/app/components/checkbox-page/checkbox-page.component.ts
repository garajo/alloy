import { Input, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FocusableOption } from '@angular/cdk/a11y';

declare function require(name: string): string;

@Component({
    selector: 'app-checkbox-page',
    templateUrl: './checkbox-page.component.html'
})
export class CheckboxPageComponent implements OnInit {

    checkedSimple = false;
    checkedLabel = false;
    checkedIcon = false;
    checkedMixed = false;

    checkedStyle = 'white';
    disabledStyle = 'white';
    readonlyStyle = 'white';
    errorStyle = 'white';
    sizeStyle = 'white';

    disabled = false;
    readonly = false;
    error = false;

    size = 14; // Default checkbox size based on Caranu style guide.
    errorMessage = 'Validation errors in checkbox';
    placeholder = 'Checkbox';

    @ViewChild('focusCheckBox') focusCheckBox: FocusableOption;

    constructor() { }

    toggleChecked() {
      this.checkedSimple = !this.checkedSimple;
      this.checkedLabel = this.checkedSimple;
      this.checkedIcon = this.checkedSimple;
      this.checkedMixed = this.checkedSimple;

      this.checkedStyle = this.checkedSimple ? 'yellow' : 'white';
    }

    toggleDisabled() {
      this.disabled = !this.disabled;
      this.disabledStyle = this.disabled ? 'yellow' : 'white';
    }

    toggleReadonly() {
      this.readonly = !this.readonly;
      this.readonlyStyle = this.readonly ? 'yellow' : 'white';
    }

    toggleError() {
      this.error = !this.error;
      this.errorStyle = this.error ? 'yellow' : 'white';
    }

    addSizeStyle() {
      this.sizeStyle = 'yellow';
    }

    removeSizeStyle() {
      this.sizeStyle = 'white';
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
