import { NgModule } from '@angular/core';
import { DropdownOverlay } from './dropdown-overlay';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [CommonModule],
    declarations: [DropdownOverlay]
})
export class AlloyDropdownOverlayModule { }

export { DropdownOverlay } from './dropdown-overlay';
