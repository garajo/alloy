import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlloyButton } from './button';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        AlloyButton
    ],
    declarations: [
        AlloyButton
    ]
})
export class AlloyButtonModule { }

export { AlloyButton } from './button';
