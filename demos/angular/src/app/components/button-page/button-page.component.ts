import { Component, OnInit } from '@angular/core';
declare function require(name: string): string;

@Component({
    selector: 'app-button-page',
    templateUrl: './button-page.component.html'
})
export class ButtonPageComponent {

    disabledDefault = false;
    disabledStandard = false;
    disabledQuickAccess = false;
    disabledToolbar = false;
    clickedStandard = false;
    clickedDefault = false;
    clickedToolbar = false;
    clickedQuickAccess = false;
    hoveredStandard = false;
    hoveredDefault = false;
    hoveredToolbar = false;
    hoveredQuickAccess = false;
    placeholder = 'This is a button';

    constructor() { }

    toggleDisabledDefault() {
        this.disabledDefault = !this.disabledDefault;
    }

    toggleDisabledStandard() {
        this.disabledStandard = !this.disabledStandard;
    }

    toggleDisabledQuickAccess() {
        this.disabledQuickAccess = !this.disabledQuickAccess;
    }

    toggleDisabledToolbar() {
        this.disabledToolbar = !this.disabledToolbar;
    }

    toggleClickedStandard() {
        this.clickedStandard = !this.clickedStandard;
    }

    toggleClickedQuickAccess() {
        this.clickedQuickAccess = !this.clickedQuickAccess;
    }

    toggleClickedDefault() {
        this.clickedDefault = !this.clickedDefault;
    }

    toggleClickedToolbar() {
        this.clickedToolbar = !this.clickedToolbar;
    }

    toggleHoveredToolbar() {
        this.hoveredToolbar = !this.hoveredToolbar;
    }

    toggleHoveredQuickAccess() {
        this.hoveredQuickAccess = !this.hoveredQuickAccess;
    }

    toggleHoveredDefault() {
        this.hoveredDefault = !this.hoveredDefault;
    }

    toggleHoveredStandard() {
        this.hoveredStandard = !this.hoveredStandard;
    }

}
