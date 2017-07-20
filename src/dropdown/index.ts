import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlloyDropdown } from './dropdown';
import { AlloyOptionModule } from '../core/option/index';

@NgModule({
    imports: [
        CommonModule,
        AlloyOptionModule,
    ],
    declarations: [
        AlloyDropdown,
    ],
    exports: [
        AlloyOptionModule,
        AlloyDropdown,
    ]
})
export class AlloyDropdownModule { }

export * from './dropdown';
