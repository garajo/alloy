import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlloyDropdownModule } from './dropdown'
import { AlloyStyleModule } from './style'

@NgModule({
    imports: [
    ],
    declarations: [
    ],
    exports: [
        AlloyStyleModule,
        AlloyDropdownModule
    ]
})
export class AlloyModule {
}