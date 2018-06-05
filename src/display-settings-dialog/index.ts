import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlloyDisplaySettingsDialog } from './display-settings';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material';
import { AlloyDirectivesModule } from '../directives/index';
import { AlloyCheckboxModule } from '../checkbox/index';
import { AlloyThemingServiceModule } from '../app/services/index';

@NgModule({
    imports: [
        AlloyCheckboxModule,
        AlloyDirectivesModule,
        AlloyThemingServiceModule,
        BrowserAnimationsModule,
        CommonModule,
        MatDialogModule,
    ],
    exports: [
        AlloyCheckboxModule,
        // Exporting this here (via the Angular export list) allows consumers to use the selector when they import this module
        AlloyDisplaySettingsDialog,
        AlloyThemingServiceModule,
        MatDialogModule,
        BrowserAnimationsModule
    ],
    entryComponents: [
        AlloyDisplaySettingsDialog
    ],
    declarations: [
        AlloyDisplaySettingsDialog
    ]
})
export class AlloyDisplaySettingsModule { }

// Exporting the same component here via the typescript/js "export" allows consumers access to the type directly
export { AlloyDisplaySettingsDialog } from './display-settings';
