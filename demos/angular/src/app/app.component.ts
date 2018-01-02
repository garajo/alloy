import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  lightSchemeName = 'light';
  themeDark = true;

  constructor() { }
}
