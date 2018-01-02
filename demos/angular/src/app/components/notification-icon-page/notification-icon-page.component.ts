import { Component } from '@angular/core';

@Component({
  selector: 'app-notification-icon-page',
  templateUrl: './notification-icon-page.component.html'
})
export class NotificationIconPageComponent {

  public messageCount: number = 0;
  public height: number = 50;
  public width: number = 50;

  constructor() {}

  isNumberKey(event){
    const inputChar = String.fromCharCode(event.keyCode);
    console.log(inputChar);
    if (['0','1','2','3','4','5','6','7','8','9'].indexOf(inputChar) === -1) {
      event.preventDefault();
    }
  }

}
