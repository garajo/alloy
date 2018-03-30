/*
 * Copyright Keysight Technologies 2017. All rights reserved.
 */
import { AgGridModule } from 'ag-grid-angular/dist/aggrid.module';
import { BrowserModule } from '@angular/platform-browser';
import { ContextMenuService } from 'ngx-contextmenu';
import { FormsModule } from '@angular/forms';
import { NgModule, ANALYZE_FOR_ENTRY_COMPONENTS, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AlloyPropertyGridCellComponent } from './cell-module/property-grid-cell.component';
import { AlloyPropertyGridComponent } from './property-grid.component';
import { AlloyPropertyGridEditorContainerComponent } from './cell-module/property-grid-editor-container.component';
import { AlloyPropertyGridEditorViewerComponent } from './editors/property-grid-editor-viewer.component';

import { AlloyPropertyGridDynamicControlService } from './services/property-grid-dynamic-control.service';
import { AlloyPropertyGridMessageService } from './services/property-grid-message.service';
import { AlloyPropertyGridOutputService } from './services/property-grid-output.service';
import { AlloyPropertyGridTypeService } from './services/property-grid-type.service';
import { AlloyPropertyGridValidatorService } from './services/property-grid-validator.service';

@NgModule({
    imports: [
        AgGridModule.withComponents([
            AlloyPropertyGridEditorViewerComponent
        ]),
        BrowserModule,
        FormsModule
    ],
    declarations: [
        AlloyPropertyGridCellComponent,
        AlloyPropertyGridComponent,
        AlloyPropertyGridEditorContainerComponent,
        AlloyPropertyGridEditorViewerComponent
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    providers: [
        AlloyPropertyGridDynamicControlService,
        AlloyPropertyGridMessageService,
        AlloyPropertyGridOutputService,
        AlloyPropertyGridTypeService,
        AlloyPropertyGridValidatorService,
        ContextMenuService
    ],
    exports: [
        AgGridModule,
        AlloyPropertyGridComponent
    ]
})
export class AlloyPropertyGridModule {
    // tslint:disable-next-line:no-any function-name
    public static withComponents(components: any[]): any {
        return {
            ngModule: AlloyPropertyGridModule,
            providers: [
                {provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: components, multi: true}
            ]
        };
    }
}
// those specific export names help to remove Consumer side's "ng build --aot=true" warning errors
export { AlloyPropertyGridCellComponent } from './cell-module/property-grid-cell.component';
export { AlloyPropertyGridComponent } from './property-grid.component';
export { AlloyPropertyGridDynamicControlService } from './services/property-grid-dynamic-control.service';
export { AlloyPropertyGridEditorContainerComponent } from './cell-module/property-grid-editor-container.component';
export { AlloyPropertyGridEditorViewerComponent } from './editors/property-grid-editor-viewer.component';
export { AlloyPropertyGridGroupRow} from './models/property-grid-group-row';
export { AlloyPropertyGridMessageService } from './services/property-grid-message.service';
export { AlloyPropertyGridOutputService } from './services/property-grid-output.service';
export { AlloyPropertyGridPropertyRow} from './models/property-grid-property-row';
export { AlloyPropertyGridTypeService } from './services/property-grid-type.service';
export { AlloyPropertyGridValidatorService } from './services/property-grid-validator.service';
export { PropertyGridColumn, IPropertyGridColumn } from './models/property-grid-column';
export { PropertyGridOption, IPropertyGridOption } from './models/property-grid-option';
// ts impl

// export * from './property-grid.component';
// export * from './cell-module/property-grid-editor-container.component';
// export * from './cell-module/property-cell.component';
// export * from './editors/editor-viewer.component';

// export * from './services/message.service';
// export * from './services/output.service';
// export * from './services/style.service';
// export * from './services/type.service';

