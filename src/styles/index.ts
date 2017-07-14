import { NgModule } from '@angular/core';

import { AlloyStyles } from './styles'

@NgModule({
    imports: [
    ],
    declarations: [
        AlloyStyles
    ],
    exports: [
        AlloyStyles
    ]
})
export class AlloyStylesModule {}

export { AlloyStyles } from './styles';
