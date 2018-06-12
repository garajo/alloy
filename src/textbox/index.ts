import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlloyTextbox } from './textbox';
import { AlloyTextboxDirective } from './textbox-directive';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        AlloyTextbox,
        AlloyTextboxDirective
    ],
    declarations: [
        AlloyTextbox,
        AlloyTextboxDirective
    ]
})
export class AlloyTextboxModule { }

export * from './textbox';
export * from './textbox-directive';
