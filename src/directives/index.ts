import { NgModule } from '@angular/core';

import { ElementFocusDirective } from './elementFocus.directive';

@NgModule({
    exports: [
        // Exporting this here (via the Angular export list) allows consumers to use this selector when they import this module
        ElementFocusDirective
    ],
    declarations: [
        ElementFocusDirective
    ]
})
export class AlloyDirectivesModule { }

// Exporting the same component here via the typescript/js "export" allows consumers access to the type directly
export { ElementFocusDirective } from './elementFocus.directive';
