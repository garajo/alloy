import { Component } from '@angular/core';

@Component({
    selector: 'app-button-page',
    templateUrl: './button-page.component.html'
})
export class ButtonPageComponent {

    private disabled = false;
    get showDisabled() {return this.disabled; }
    set showDisabled(value: boolean) { this.disabled = value; }

    showChecked = false;
    showLabel = false;
    showIcon = false;
    showToggle = false;
    showFlip = false;

    toggleAttribute = 'toggle';
    standardAttribute = 'standard';
    defaultAttribute = 'default';
    toolbarAttribute = 'toolbar';
    quickAccessAttribute = 'quickaccess';
    labelAttribute = 'alloyLabel'
    iconAttribute = 'alloyIcon'
    flipAttribute = 'alloyFlip'

    element = 'button alloy';
    attribute: string;

    constructor() { }

    // Automatically generates an HTML preview for a clicked button.
    onClick(event: any) {
      if (event.currentTarget.getAttribute(this.standardAttribute) != null) {
        this.attribute = this.standardAttribute;
      }
      if (event.currentTarget.getAttribute(this.defaultAttribute) != null) {
        this.attribute = this.defaultAttribute;
      }
      if (event.currentTarget.getAttribute(this.toolbarAttribute) != null) {
        this.attribute = this.toolbarAttribute;
      }
      if (event.currentTarget.getAttribute(this.quickAccessAttribute) != null) {
        this.attribute = this.quickAccessAttribute;
      }

      this.showToggle = event.currentTarget.getAttribute(this.toggleAttribute) !== null;
      this.showLabel = event.currentTarget.getAttribute(this.labelAttribute) !== null;
      this.showIcon = event.currentTarget.getAttribute(this.iconAttribute) !== null;
      this.showFlip = event.currentTarget.getAttribute(this.flipAttribute) !== null;
    }
}
