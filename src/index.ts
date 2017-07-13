import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlloyDropdownModule } from './dropdown/index';
import { AlloyStyleModule } from './style/index';


const ALLOY_MODULES = [
    AlloyStyleModule,
    AlloyDropdownModule
]

@NgModule({
    imports: ALLOY_MODULES,
    exports: ALLOY_MODULES
})
export class AlloyModule {}

export * from './dropdown/index';
export * from './style/index';
