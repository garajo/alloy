import { Component } from '@angular/core';
declare function require(name: string): string;

@Component({
  selector: 'app-textarea-page',
  templateUrl: './textarea-page.component.html',
  styleUrls: ['./textarea-page.component.scss'],

})
export class TextareaPageComponent {

  height: string;
  width: string ;
  rows: number = 10;
  cols: number = 20;
  placeholderSimple: string = "Enter text here";
  disabledSimple: boolean = false;
  readonlySimple: boolean = false;
  requiredSimple: boolean = false;
  spellcheckSimple: boolean = false;
  maxlengthSimple: number;
  minlengthSimple: number; 
  resizeSimple: string;
  valueSimple: string;
  selectRC: boolean = true;
  checkboxLabel: string = 'Resize by rows and columns.';
  wrapSimple: string = 'hard';

  constructor() {}

  ngOnInit() {
  }

  toggleDisabled() {
        this.disabledSimple = !this.disabledSimple;
  }

  toggleReadonly() {
    this.readonlySimple = !this.readonlySimple;
  }

  toggleRequired() {
    this.requiredSimple = !this.requiredSimple;
  }

  toggleResize() {
    if (this.resizeSimple) {
      this.resizeSimple = null;
    } else {
      this.resizeSimple = "none";
    }
  }

  toggleSpellcheck() {
    this.spellcheckSimple = !this.spellcheckSimple;
  }

  toggleRC() {
    this.selectRC = !this.selectRC;
    if (this.selectRC) {
      this.width = 'auto';
      this.height = 'auto';
    } else {
      this.width = '';
      this.height = '';
    }
  }

  isNumberKey(event){
      const inputChar = String.fromCharCode(event.keyCode);
      if (['0','1','2','3','4','5','6','7','8','9'].indexOf(inputChar) === -1) {
        event.preventDefault();
    }
  }
}
