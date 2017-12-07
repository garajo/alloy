import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlloyTextarea } from './textarea';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        AlloyTextarea
    ],
    declarations: [
        AlloyTextarea
    ]
})
export class AlloyTextareaModule { }

export * from './textarea';