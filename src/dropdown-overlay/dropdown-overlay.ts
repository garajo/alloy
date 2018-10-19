import {
    ElementRef, Renderer2, Component, AfterViewInit, ViewChild, ViewChildren,
    QueryList, Output, EventEmitter, ChangeDetectorRef, Input
} from '@angular/core';
import { ViewportRuler } from '@angular/cdk/overlay';

@Component({
    templateUrl: './dropdown-overlay.html'
})
export class DropdownOverlay implements AfterViewInit {
    @ViewChild('dropdown') protected dropdown: ElementRef;
    @ViewChild('dropdownDiv') protected dropdownDiv: ElementRef;
    @ViewChildren('button') protected buttons: QueryList<ElementRef>;

    @Input('items') public items = [];

    @Output() onSelect = new EventEmitter<number[]>(true);

    public openLeft = false;

    constructor(
        protected viewportRuler: ViewportRuler,
        protected renderer: Renderer2,
        protected changeRef: ChangeDetectorRef) {
    }

    ngAfterViewInit() {
        this.changeRef.detectChanges();

        // Need setTimeout() so element has a change to get correct size
        // Need to set then remove opacity so user cannot see positions rapidly change
        this.renderer.setStyle(this.dropdownDiv.nativeElement, 'opacity', '0');
        setTimeout(() => {
            this.renderer.removeStyle(this.dropdownDiv.nativeElement, 'opacity');
            this.adjustDirection(this.dropdownDiv);
        });
    }


    // Will open down and to the right if room
    // Will switch direction to up or left if no room
    // If no room in either direction open in direction with the most room and adjust size
    protected adjustDirection(div: ElementRef) {
        let dropRect = div.nativeElement.getBoundingClientRect();
        const viewportRect = this.viewportRuler.getViewportRect();

        const border = 15; // Size in px to keep dropdown away from edge of window

        if (dropRect.bottom + border > viewportRect.height) {
            this.renderer.addClass(div.nativeElement, 'dropdown-up');
        }
        if (dropRect.right + border > viewportRect.width) {
            this.openLeft = true;
            this.renderer.addClass(div.nativeElement, 'dropdown-left');
        }

        dropRect = div.nativeElement.getBoundingClientRect();

        if (dropRect.top < border) {
            const extraHeight = dropRect.height - div.nativeElement.getBoundingClientRect().height;
            if (dropRect.bottom < viewportRect.height / 2) {
                this.renderer.removeClass(div.nativeElement, 'dropdown-up');
                dropRect = div.nativeElement.getBoundingClientRect();
                this.renderer.setStyle(div.nativeElement, 'max-height',
                    (viewportRect.height - dropRect.top - extraHeight - border) + 'px');
            } else {
                this.renderer.setStyle(div.nativeElement, 'max-height', (dropRect.bottom) - extraHeight - border + 'px');
            }
        }

        if (dropRect.left < border) {
            if (dropRect.right < viewportRect.width / 2) {
                this.renderer.removeClass(div.nativeElement, 'dropdown-left');
                this.openLeft = false;
                dropRect = div.nativeElement.getBoundingClientRect();
                this.renderer.setStyle(div.nativeElement, 'max-width', (viewportRect.width - dropRect.left - border) + 'px');
            } else {
                this.renderer.setStyle(div.nativeElement, 'max-width', (dropRect.right - border) + 'px');
            }
        }
    }

    public itemClicked(index: number) {
        this.onSelect.emit([index]);
    }
}
