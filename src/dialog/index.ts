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
import { AlloyDialogService } from './services/dialog.service';
// Tokens
import { DialogDataProvider } from './tokens/dialog.token';

@NgModule({
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        MatDialogModule
    ],
    exports: [ // Exporting this here (via the Angular export list) allows consumers to use this selector when they import this module
        DialogComponent,
        MatDialogModule
    ],
    declarations: [
        DialogComponent,
        DialogHostDirective,
        ResizerComponent
    ],
    providers: [
        AlloyDialogService,
        DialogUtility,
        DialogDataProvider
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

// Those specific export names help to remove Consumer side's "ng build --aot=true" warning errors
// Exporting the same component here via the typescript/js "export" allows consumers access to the type directly
export * from './dialog.component';
export * from './directives/dialog-host.directive';
export * from './models/dialog';
export * from './resizer/resizer.component';
export * from './services/dialog-utility.service';
export * from './services/dialog.service';
export * from './tokens/dialog.token';
