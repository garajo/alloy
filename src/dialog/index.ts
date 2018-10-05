/*
 * Copyright Keysight Technologies, All Rights Reserved
 * Keysight Confidential
 */

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { NgModule, ANALYZE_FOR_ENTRY_COMPONENTS, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

// External
import { MatDialogModule } from '@angular/material';
// Directives
import { DialogHostDirective } from './directives/dialog-host.directive';
// Components
import { DialogComponent } from './dialog.component';
import { ResizerComponent } from './resizer/resizer.component';
// Services
import { DialogUtility } from './services/dialog-utility.service';

@NgModule({
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        MatDialogModule
    ],
    exports: [
        DialogComponent,
        MatDialogModule
    ],
    declarations: [
        DialogComponent,
        DialogHostDirective,
        ResizerComponent
    ],
    providers: [
        DialogUtility
    ],
    entryComponents: [
        DialogComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AlloyDialogModule {
    public static withComponents(components: any[]): any { // tslint:disable-line:no-any function-name
        return {
            ngModule: AlloyDialogModule,
            providers: [
                { provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: components, multi: true }
            ]
        };
    }
}

// exports for consumers to import
export { AlloyDialogService } from './services/dialog.service';
export { AlloyDialogConfig, AlloyDialogItem, IAlloyDialogData } from './models/dialog';
export { ALLOY_DIALOG_DATA } from './tokens/dialog.token';
