import { Component } from '@angular/core';

@Component({
    selector: 'app-progress-bar-page',
    templateUrl: './progress-bar-page.component.html'
})
export class ProgressBarPageComponent {

    labelAttribute = 'alloyLabel'

    public ringSize = 'small';
    public value = 30;

    constructor() { }

    increment() {
      if (this.value > 90) {
        this.value = 0;
      } else {
        this.value += 10;
      }
    }

    // Automatically generates an HTML preview for a clicked button.
    onClick(event: any) {

      const label = event.currentTarget.getAttribute(this.labelAttribute);

      if ( label != null) {
        this.ringSize = label;
      } else {
        this.ringSize =  'small';
      }

    }
}
