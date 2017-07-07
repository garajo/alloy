import { NgModule } from '@angular/core';

import { AlloyStyle } from './style'

export * from './style'

@NgModule({
    imports: [
    ],
    declarations: [
        AlloyStyle
    ],
    exports: [
        AlloyStyle
    ]
})
export class AlloyStyleModule {
}
