import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlloyMenu, AlloySubmenu, AlloyMenuItem } from './menu';
import { DropdownOverlayMenu, AlloyDropdownOverlayModule } from '../dropdown-overlay/index';
import { OverlayModule } from '@angular/cdk/overlay';
import { AlloyDirectivesModule } from '../directives/index';

@NgModule({
    imports: [
        CommonModule,
        AlloyDropdownOverlayModule,
        OverlayModule,
        AlloyDirectivesModule
    ],
    exports: [
        AlloyMenu,
        AlloySubmenu,
        AlloyMenuItem
    ],
    declarations: [
        AlloyMenu,
        AlloySubmenu,
        AlloyMenuItem
    ],
    entryComponents: [DropdownOverlayMenu]
})

export class AlloyMenuModule { }

export { AlloyMenu, AlloySubmenu, AlloyMenuItem } from './menu';
