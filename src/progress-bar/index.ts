import { NgModule } from '@angular/core';

import { AlloyProgressBar } from './progress-bar';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [ CommonModule ],
    exports: [ AlloyProgressBar ],
    declarations: [ AlloyProgressBar ]
})
export class AlloyProgressBarModule { }

export { AlloyProgressBar } from './progress-bar';
