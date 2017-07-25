import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlloyDropdown } from './dropdown';
import { AlloyOptionModule } from '../core';

@NgModule({
    imports: [
        CommonModule,
        AlloyOptionModule,
    ],
    declarations: [
        AlloyDropdown,
    ],
    exports: [
        AlloyDropdown,
        AlloyOptionModule,
    ]
})
export class AlloyDropdownModule { }

export * from './dropdown';
