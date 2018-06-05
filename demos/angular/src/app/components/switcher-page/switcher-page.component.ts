import { AlloyThemingService, AlloyThemes } from '@keysight/alloy';
import { AppComponent } from '../../app.component';
import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-switcher-page',
  templateUrl: './switcher-page.component.html'
})
export class SwitcherPageComponent implements OnInit, OnDestroy {
  switchStatus = false;
  switchDisabled = false;
  switchStatusText = 'OFF';

  private themeSwitchSubscription: Subscription;

  constructor(private renderer: Renderer2,
              private alloyThemingService: AlloyThemingService,
              private appComponent: AppComponent) {
                // If this page is being created this allows it to sync up to current theme state
                this.updateStatus();
              }

  public ngOnInit() {

    // Just showing off how to use the Alloy Theming service "theme switch notification method".
    this.themeSwitchSubscription = this.alloyThemingService.onThemeChange().subscribe((theme: AlloyThemes) => {
      if (theme) {
        // React to external event/entity that may change the theme; update switcher UI accordingly
        // This is showing off the Alloy theme switcher service notification even
        // The manual test scenario is to navigate to the DisplaySettings dialog and since it is modeless navigate the tabs
        // back to the switcher tab and then change the theme in DisplaySettings and watch switcher UI dynamically
        this.updateStatus();
      }
    });
  }

  public ngOnDestroy(): void {

    // remove all subscriptions
    if (this.themeSwitchSubscription) {
      this.themeSwitchSubscription.unsubscribe();
    }
  }

  onSwitch(event): void {
    this.switchStatus = event;
    this.updateTheme();
  }

  updateTheme(): void {

    // Any/all theme switching needs should go through the new Alloy theme switching service
    switch (this.switchStatus) {

      case true:
        this.alloyThemingService.theme = AlloyThemes.Light;
        this.switchStatusText = 'ON';
        break;

      case false:
        this.alloyThemingService.theme = AlloyThemes.Dark;
        this.switchStatusText = 'OFF';
      break;
    }
  }

  updateStatus(): void {

    // Any/all theme switching needs should go through the new Alloy theme switching service
    switch (this.alloyThemingService.theme) {

      case AlloyThemes.Light:
        this.switchStatus = true;
        this.switchStatusText = 'ON';
        break;

      case AlloyThemes.Dark:
        this.switchStatus = false;
        this.switchStatusText = 'OFF';
        break;
    }
  }

  disabled(): void {
    this.switchDisabled = !this.switchDisabled;
  }
}
