import { NgModule } from '@angular/core';

import { AlloyDropdown } from './dropdown';

@NgModule({
    imports: [
    ],
    declarations: [
        AlloyDropdown
    ],
    exports: [
        AlloyDropdown
    ]
})
export class AlloyDropdownModule { }

export { AlloyDropdown } from './dropdown';