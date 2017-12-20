import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlloyIcon } from './icon';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        AlloyIcon
    ],
    declarations: [
        AlloyIcon
    ]
})
export class AlloyIconModule { }

export { AlloyIcon } from './icon';
