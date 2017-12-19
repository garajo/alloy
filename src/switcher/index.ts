import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlloySwitcher } from './switcher';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        AlloySwitcher
    ],
    declarations: [
        AlloySwitcher
    ]
})

export class AlloySwitcherModule { }

export { AlloySwitcher } from './switcher';
