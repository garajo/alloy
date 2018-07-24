import { NgModule } from '@angular/core';

import { ElementFocusDirective } from './elementFocus.directive';
import { AlloyCheckboxDirective } from './checkbox.directive';
import { AlloyTextboxDirective } from './textbox.directive';
import { AlloyButtonDirective } from './button.directive';
import { FocusMonitor } from '@angular/cdk/a11y';
import { AlloyToggleDirective } from './toggle.directive';
import { AlloyIdentityDirective } from './identity.directive';

@NgModule({
    exports: [
        // Exporting this here (via the Angular export list) allows consumers to use this selector when they import this module
        ElementFocusDirective,
        AlloyButtonDirective,
        AlloyCheckboxDirective,
        AlloyIdentityDirective,
        AlloyTextboxDirective,
        AlloyToggleDirective
    ],
    declarations: [
        ElementFocusDirective,
        AlloyButtonDirective,
        AlloyCheckboxDirective,
        AlloyIdentityDirective,
        AlloyTextboxDirective,
        AlloyToggleDirective
    ],
    providers: [FocusMonitor]
})
export class AlloyDirectivesModule { }

// Exporting the same component here via the typescript/js "export" allows consumers access to the type directly
export { ElementFocusDirective } from './elementFocus.directive';
export { AlloyButtonDirective } from './button.directive';
export { AlloyCheckboxDirective } from './checkbox.directive';
export { AlloyIdentityDirective } from './identity.directive';
export { AlloyTextboxDirective } from './textbox.directive';
export { AlloyToggleDirective } from './toggle.directive';
export { ErrorDirective } from './error.directive';
