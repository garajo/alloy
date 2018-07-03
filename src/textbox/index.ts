import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlloyTextbox } from './textbox';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        AlloyTextbox
    ],
    declarations: [
        AlloyTextbox
    ]
})
export class AlloyTextboxModule { }

export * from './textbox';
