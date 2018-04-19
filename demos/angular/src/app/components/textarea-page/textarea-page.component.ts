import { Component } from '@angular/core';
declare function require(name: string): string;

@Component({
  selector: 'app-textarea-page',
  templateUrl: './textarea-page.component.html'

})
export class TextareaPageComponent {

  textValue: string;
  rows = 10;
  cols = 20;
  placeholderSimple = 'Enter text here';
  disabledSimple = false;
  readonlySimple = false;
  requiredSimple = false;
  spellcheckSimple = false;
  maxlengthSimple: number;
  minlengthSimple: number;
  valueSimple: string;
  wrapSimple = 'hard';

  constructor() {}

  toggleDisabled() {
        this.disabledSimple = !this.disabledSimple;
  }

  toggleReadonly() {
    this.readonlySimple = !this.readonlySimple;
  }

  toggleRequired() {
    this.requiredSimple = !this.requiredSimple;
  }

  toggleSpellcheck() {
    this.spellcheckSimple = !this.spellcheckSimple;
  }

  isNumberKey(event) {
      const inputChar = String.fromCharCode(event.keyCode);
      if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].indexOf(inputChar) === -1) {
        event.preventDefault();
    }
  }
}
