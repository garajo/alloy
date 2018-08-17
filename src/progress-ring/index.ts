import { NgModule } from '@angular/core';

import { AlloyProgressRing } from './progress-ring';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [ CommonModule ],
    exports: [ AlloyProgressRing ],
    declarations: [ AlloyProgressRing ]
})
export class AlloyProgressRingModule { }

export { AlloyProgressRing } from './progress-ring';
