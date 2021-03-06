import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

import { AlloyDropdown } from './dropdown';
import { AlloyOptionModule } from '../core/option/index';

@NgModule({
    imports: [
        AlloyOptionModule,
        CommonModule,
        OverlayModule
    ],
    exports: [
        AlloyDropdown,
        AlloyOptionModule
    ],
    declarations: [
        AlloyDropdown
    ]
})
export class AlloyDropdownModule { }

export * from './dropdown';
