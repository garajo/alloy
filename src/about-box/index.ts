import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material';

import { AlloyAboutBox } from './about-box';
import { AlloyDirectivesModule } from '../directives/index';

@NgModule({
    imports: [
        AlloyDirectivesModule,
        BrowserAnimationsModule,
        CommonModule,
        MatDialogModule
    ],
    exports: [
        // Exporting this here (via the Angular export list) allows consumers to use the selector when they import this module
        AlloyAboutBox,
        BrowserAnimationsModule,
        MatDialogModule
    ],
    entryComponents: [
        AlloyAboutBox
    ],
    declarations: [
        AlloyAboutBox,
    ]
})
export class AlloyAboutBoxModule { }

// Exporting the same component here via the typescript/js "export" allows consumers access to the type directly
export { AlloyAboutBox } from './about-box';
