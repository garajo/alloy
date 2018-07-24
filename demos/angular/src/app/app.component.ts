import { Component } from '@angular/core';
import { AlloyThemingService, AlloyThemes } from '@keysight/alloy';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  themeState = false;

  constructor(private alloyThemingService: AlloyThemingService) { }

  onThemeClick(): void {
    this.themeState = !this.themeState;
    this.updateTheme();
  }

  updateTheme(): void {

    // Any/all theme switching needs should go through the new Alloy theme switching service
    switch (this.themeState) {

      case true:
        this.alloyThemingService.theme = AlloyThemes.Light;
        break;

      case false:
        this.alloyThemingService.theme = AlloyThemes.Dark;
      break;
    }
  }

}
