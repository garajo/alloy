
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlloyContextMenuComponent, AlloyContextMenuAttachDirective, AlloyContextMenu } from './contextmenu';

import { ContextMenuModule } from 'ngx-contextmenu';

@NgModule({
    imports: [
        CommonModule,
        ContextMenuModule
    ],
    exports: [
        ContextMenuModule,
        AlloyContextMenuAttachDirective,
        AlloyContextMenuComponent,
        AlloyContextMenu
    ],
    declarations: [
        AlloyContextMenuAttachDirective,
        AlloyContextMenuComponent,
        AlloyContextMenu
    ]
})
export class AlloyContextmenuModule {
}

export * from './contextmenu';
