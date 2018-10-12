import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AlloyDialogModule } from '../dialog/index';
import { AlloyDirectivesModule } from '../directives/index';
import { AlloyDisplaySettingsDialog } from './display-settings';
import { AlloyThemingServiceModule } from '../app/services/index';

@NgModule({
    imports: [
        AlloyDialogModule.withComponents([AlloyDisplaySettingsDialog]),
        AlloyDirectivesModule,
        AlloyThemingServiceModule,
        BrowserAnimationsModule,
        CommonModule,
    ],
    exports: [
        // Exporting this here (via the Angular export list) allows consumers to use the selector when they import this module
        AlloyDisplaySettingsDialog,
        AlloyThemingServiceModule,
        BrowserAnimationsModule
    ],
    declarations: [
        AlloyDisplaySettingsDialog
    ]
})
export class AlloyDisplaySettingsModule { }

// Exporting the same component here via the typescript/js "export" allows consumers access to the type directly
export { AlloyDisplaySettingsDialog } from './display-settings';
