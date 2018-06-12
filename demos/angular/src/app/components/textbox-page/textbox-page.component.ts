import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-textbox-page',
  templateUrl: './textbox-page.component.html'
})
export class TextboxPageComponent implements OnInit {

  public disabledSimple: boolean;
  public readonlySimple: boolean;
  public errorSimple: boolean;
  public requiredSimple: boolean;

  public width = 25;
  public maxLength: number;
  public placeholder = '';
  public defaultValue = '';
  public regexPattern: string;


  constructor() {
  }

  ngOnInit() {
  }

  toggleDisabledSimple() {
    this.disabledSimple = !this.disabledSimple;
  }

  toggleReadOnlySimple() {
    this.readonlySimple = !this.readonlySimple;
  }

  toggleRequiredSimple() {
    this.requiredSimple = !this.requiredSimple;
  }

  toggleErrorSimple() {
    this.errorSimple = !this.errorSimple;
  }
}
