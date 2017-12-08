import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlloyAboutBox } from './about-box';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material';
import { ElementFocusDirective } from '../directives/elementFocus.directive';

@NgModule({
    imports: [
        CommonModule,
        MatDialogModule,
        BrowserAnimationsModule
    ],
    exports: [
        AlloyAboutBox,
        MatDialogModule,
        BrowserAnimationsModule,
        ElementFocusDirective
    ],
    entryComponents: [
        AlloyAboutBox
    ],
    declarations: [
        AlloyAboutBox,
        ElementFocusDirective
    ]
})
export class AlloyAboutBoxModule { }

//export * from './about-box';
export { AlloyAboutBox } from './about-box';
export { ElementFocusDirective } from '../directives/elementFocus.directive';
