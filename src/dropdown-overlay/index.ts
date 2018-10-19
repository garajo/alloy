import { NgModule } from '@angular/core';
import { DropdownOverlay } from './dropdown-overlay';
import { DropdownOverlaySelect } from './dropdown-overlay-select';
import { DropdownOverlayMenu } from './dropdown-overlay-menu';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [CommonModule],
    exports: [DropdownOverlayMenu],
    declarations: [DropdownOverlay, DropdownOverlaySelect, DropdownOverlayMenu]
})
export class AlloyDropdownOverlayModule { }

export { DropdownOverlay } from './dropdown-overlay';
export { DropdownOverlaySelect } from './dropdown-overlay-select';
export { DropdownOverlayMenu } from './dropdown-overlay-menu';
