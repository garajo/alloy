import { NgModule } from '@angular/core';

import { ElementFocusDirective } from './elementFocus.directive';
import { AlloyCheckboxDirective } from './checkbox.directive';
import { AlloyTextboxDirective } from './textbox.directive';
import { ErrorDirective } from './error.directive';

@NgModule({
    exports: [
        // Exporting this here (via the Angular export list) allows consumers to use this selector when they import this module
        ElementFocusDirective,
        AlloyCheckboxDirective,
        AlloyTextboxDirective
    ],
    declarations: [
        ElementFocusDirective,
        AlloyCheckboxDirective,
        AlloyTextboxDirective
    ]
})
export class AlloyDirectivesModule { }

// Exporting the same component here via the typescript/js "export" allows consumers access to the type directly
export { ElementFocusDirective } from './elementFocus.directive';
export { AlloyCheckboxDirective } from './checkbox.directive';
export { AlloyTextboxDirective } from './textbox.directive';
export { ErrorDirective } from './error.directive';
