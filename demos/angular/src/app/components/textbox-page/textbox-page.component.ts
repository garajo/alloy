import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-textbox-page',
  templateUrl: './textbox-page.component.html',
  styleUrls: ['./textbox-page.component.scss']
})
export class TextboxPageComponent implements OnInit {
  
  public disabledSimple: boolean;
  public readonlySimple: boolean;
  public width = 0;
  public maxLength: number;
  public placeholder = '';
  public defaultValue = '';
  public requiredSimple: boolean;
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
}
