import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-compound-page',
    templateUrl: './compound-page.component.html'
})
export class CompoundPageComponent {
  placeHolder = 'Test Value';
  fortyish = 20;  // only multiples of 14 do anything!
  constructor() { }
}
