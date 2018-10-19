import { ElementRef, Component, AfterViewInit, Input } from '@angular/core';
import { DropdownOverlay } from './dropdown-overlay';

@Component({
    selector: 'dropdown-overlay-menu',
    templateUrl: './dropdown-overlay-menu.html'
})
export class DropdownOverlayMenu extends DropdownOverlay implements AfterViewInit {
    @Input('side') public side = false;
    @Input() zIndex = 0;

    protected adjustDirection(div: ElementRef) {
        // Check if the parent menu opens to the left then attempt to continue to open in the same direction
        const closestMenu = this.dropdownDiv.nativeElement.parentNode.parentNode.closest('dropdown-overlay-menu');
        if (closestMenu && closestMenu.children[0].classList.contains('dropdown-left')) {
            this.renderer.addClass(div.nativeElement, 'dropdown-left');
        }
        super.adjustDirection(div);
    }
}
