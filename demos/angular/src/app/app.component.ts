import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  private lightSchemeName = 'light';
  private themeDark = true;

  constructor(private renderer: Renderer2) {
    // Empty is OK
  }

  // Method to toggle the Alloy light/dark color themes using their model of applying class "light" to the body tag
  public toggleThemes(): void {

    this.themeDark = !this.themeDark;

    if (this.themeDark) {
      this.renderer.removeClass(document.body, this.lightSchemeName);
    } else {
      this.renderer.addClass(document.body, this.lightSchemeName);
    }
  }
}
