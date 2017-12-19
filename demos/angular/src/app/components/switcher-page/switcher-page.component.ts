import { Component, Renderer2 } from '@angular/core';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-switcher-page',
  templateUrl: './switcher-page.component.html',
  styleUrls: ['./switcher-page.component.scss']
})
export class SwitcherPageComponent {
  switchStatus = false;
  switchDisabled = false;
  switchStatusText = 'OFF'

  constructor(private renderer: Renderer2, private appComponent: AppComponent) { }

  onSwitch(event): void {
    this.switchStatus = event;
    this.updateTheme();
  }

  updateTheme(): void {
    this.appComponent.themeDark = !this.switchStatus;

    if (this.appComponent.themeDark) {
      this.renderer.removeClass(document.body, this.appComponent.lightSchemeName);
    } else {
      this.renderer.addClass(document.body, this.appComponent.lightSchemeName);
    }

    if (this.switchStatus) {
      this.switchStatusText = 'ON';
    } else {
      this.switchStatusText = 'OFF';
    }
  }

  disabled(): void {
    this.switchDisabled = !this.switchDisabled;
  }
}
