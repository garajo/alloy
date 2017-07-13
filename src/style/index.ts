import { NgModule } from '@angular/core';

import { AlloyStyle } from './style'

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
export class AlloyStyleModule {}

export { AlloyStyle } from './style';
