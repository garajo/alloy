import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlloyCheckbox } from './checkbox';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        AlloyCheckbox
    ],
    declarations: [
        AlloyCheckbox
    ]
})
export class AlloyCheckboxModule { }

export * from './checkbox';
