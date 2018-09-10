import {
    ElementRef, Renderer2, Component, AfterViewInit, ViewChild, ViewChildren,
    QueryList, Output, EventEmitter, ChangeDetectorRef, HostListener
} from '@angular/core';
import { ViewportRuler } from '@angular/cdk/overlay';
import { fromEvent } from 'rxjs/observable/fromEvent';

@Component({
    templateUrl: './dropdown-overlay.html'
})
export class DropdownOverlay implements AfterViewInit {
    @ViewChild('dropdown') private dropdown: ElementRef;
    @ViewChild('dropdownDiv') private dropdownDiv: ElementRef;
    @ViewChild('allCheckbox') private allCheckbox: ElementRef;
    @ViewChild('filterInput') private filterInput: ElementRef;
    @ViewChildren('checkbox') private checkboxes: QueryList<ElementRef>;

    @Output() onSelect = new EventEmitter<[number, boolean]>(true);

    private _multiple = false;
    private selectAllLabel = 'Select All';
    public filterList = [];

    public hasSelectAll = false;
    public filterable = false;
    public options: HTMLOptionsCollection;

    set multiple(val: boolean) {
        this._multiple = val;
        if (this._multiple) {
            this.renderer.addClass(this.dropdownDiv.nativeElement, 'dropdown-multiple');
        } else {
            this.renderer.removeClass(this.dropdownDiv.nativeElement, 'dropdown-multiple');
        }
    }

    get noMatch(): boolean {
        if (this.filterList.length === 0) {
            return false;
        }
        return this.filterList.every(i => i);
    }

    constructor(
        private viewportRuler: ViewportRuler,
        private renderer: Renderer2,
        private changeRef: ChangeDetectorRef) {
    }

    ngAfterViewInit() {
        this.adjustDirection();
        this.updateSelectAll();
        this.focusFilter();
        this.changeRef.detectChanges();

        // Prevent scrolling if at the top or bottom of dropdown to prevent the window from scrolling
        // which would cause the dropdown to close
        fromEvent(this.dropdown.nativeElement, 'wheel').subscribe((e: any) => {
            if ((e.wheelDelta < 0 && this.dropdown.nativeElement.clientHeight ===
                    (this.dropdown.nativeElement.scrollHeight - this.dropdown.nativeElement.scrollTop)) ||
                    (e.wheelDelta > 0 && this.dropdown.nativeElement.scrollTop === 0)) {
                e.preventDefault();
            }
        });
    }

    // Close on escape keypress
    @HostListener('keyup', ['$event'])
    KeyboardEvent(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            // Setting value of -1 closes without changing
            this.onSelect.emit([-1, false]);
        }
    }

    focusFilter() {
        if (this.filterInput) {
            this.filterInput.nativeElement.focus();
        }
    }

    // Will open down and to the right if room
    // Will switch direction to up or left if no room
    // If no room in either direction open in direction with the most room and adjust size
    private adjustDirection() {
        let dropRect = this.dropdownDiv.nativeElement.getBoundingClientRect();
        const viewportRect = this.viewportRuler.getViewportRect();
        const border = 15; // Size in px to keep dropdown away from edge of window

        if (dropRect.bottom + border > viewportRect.height) {
            this.renderer.addClass(this.dropdownDiv.nativeElement, 'dropdown-up');
        }
        if (dropRect.right + border > viewportRect.width) {
            this.renderer.addClass(this.dropdownDiv.nativeElement, 'dropdown-left');
        }

        dropRect = this.dropdownDiv.nativeElement.getBoundingClientRect();

        if (dropRect.top < border) {
            const extraHeight = dropRect.height - this.dropdown.nativeElement.getBoundingClientRect().height;
            if (dropRect.bottom < viewportRect.height / 2) {
                this.renderer.removeClass(this.dropdownDiv.nativeElement, 'dropdown-up');
                dropRect = this.dropdownDiv.nativeElement.getBoundingClientRect();
                this.renderer.setStyle(this.dropdown.nativeElement, 'max-height',
                    (viewportRect.height - dropRect.top - extraHeight - border) + 'px');
            } else {
                this.renderer.setStyle(this.dropdown.nativeElement, 'max-height', (dropRect.bottom) - extraHeight - border + 'px');
            }
        }

        if (dropRect.left < border) {
            if (dropRect.right < viewportRect.width / 2) {
                this.renderer.removeClass(this.dropdownDiv.nativeElement, 'dropdown-left');
                dropRect = this.dropdownDiv.nativeElement.getBoundingClientRect();
                this.renderer.setStyle(this.dropdown.nativeElement, 'max-width', (viewportRect.width - dropRect.left - border) + 'px');
            } else {
                this.renderer.setStyle(this.dropdown.nativeElement, 'max-width', (dropRect.right - border) + 'px');
            }
        }
    }

    // Update the state and text of select all checkbox
    private updateSelectAll() {
        if (this.hasSelectAll && this.allCheckbox && this.checkboxes) {
            let count = 0;
            let length = 0;
            this.checkboxes.forEach((i: ElementRef) => {
                if (!i.nativeElement.hidden && !i.nativeElement.disabled && !i.nativeElement.readonly) {
                    if (i.nativeElement.checked) {
                        count++;
                    }
                    length++;
                }
            });
            if (count === length) {
                this.allCheckbox.nativeElement.checked = true;
                this.selectAllLabel = 'Deselect All';
            } else {
                this.allCheckbox.nativeElement.checked = false;
                this.selectAllLabel = 'Select All';
            }
        }
    }

    // Update the filter
    public onFilterKeyUp(event): void {
        const value = event.target.value;

        for (let i = 0; i < this.options.length; i++) {
            this.filterList[i] = !this.options[i].label.toLowerCase().includes(value.toLowerCase());
        }
        setTimeout(() => (this.updateSelectAll()));
    }

    // Called when any option is checked and sends to directive to update the option
    public checked(index: number, value: boolean) {
        this.updateSelectAll();
        // Make sure two checkboxes are not checked at same time
        if (!this._multiple) {
            this.checkboxes.toArray()[index].nativeElement.checked = false;
        }
        this.onSelect.emit([index, value]);
    }

    // Called when select all is checked to check all values not disabled or shown
    public selectAll(value: boolean) {
        for (let i = 0; i < this.options.length; i++) {
            if (!this.options[i].disabled && !this.options[i].hidden && !this.filterList[i]) {
                this.onSelect.emit([i, value]);
            }
        }
        this.selectAllLabel = value ? 'Deselect All' : 'Select All';
    }
}
