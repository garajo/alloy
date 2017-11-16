import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-notification-icon-page',
  templateUrl: './notification-icon-page.component.html',
  styleUrls: ['./notification-icon-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NotificationIconPageComponent implements OnInit {

  public messageCount: number;
  public height: number;
  public width: number;
  @ViewChild('inputCount') inputCount: ElementRef;

  constructor() {
    this.messageCount = 0;
    this.height = 50;
    this.width = 50;
   }

  ngOnInit() {
  }

  updateIcon() {
    this.messageCount = this.inputCount.nativeElement.value;
  }

}
