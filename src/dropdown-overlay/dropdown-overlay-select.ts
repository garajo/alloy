import {
    ElementRef, Renderer2, Component, AfterViewInit, ViewChild, ChangeDetectorRef, HostListener
} from '@angular/core';
import { ViewportRuler } from '@angular/cdk/overlay';
import { DropdownOverlay } from './dropdown-overlay';

@Component({
    templateUrl: './dropdown-overlay-select.html'
})
export class DropdownOverlaySelect extends DropdownOverlay implements AfterViewInit {
    @ViewChild('selectAllButton') private selectAllButton: ElementRef;
    @ViewChild('filterInput') private filterInput: ElementRef;

    private _multiple = false;
    private selectAllLabel = true;
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
            protected viewportRuler: ViewportRuler,
            protected renderer: Renderer2,
            protected changeRef: ChangeDetectorRef) {
        super(viewportRuler, renderer, changeRef);
    }

    ngAfterViewInit() {
        this.updateSelectAll();
        this.focusFilter();
        super.ngAfterViewInit();

        // Prevent scrolling if at the top or bottom of dropdown to prevent the window from scrolling
        // which would cause the dropdown to close
        this.renderer.listen(this.dropdown.nativeElement, 'wheel', (e: any) => {
            if ((e.wheelDelta < 0 && this.dropdown.nativeElement.clientHeight ===
                    (this.dropdown.nativeElement.scrollHeight - this.dropdown.nativeElement.scrollTop)) ||
                    (e.wheelDelta > 0 && this.dropdown.nativeElement.scrollTop === 0)) {
                e.preventDefault();
            }
        });
    }

    focusFilter() {
        if (this.filterInput) {
            this.filterInput.nativeElement.focus();
        }
    }

    // Close on escape keypress
    @HostListener('document:keyup', ['$event'])
    KeyboardEvent(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            // Closes without changing value
            this.onSelect.emit([]);
        }
    }

    // Update the state and text of select all checkbox
    private updateSelectAll() {
        if (this.hasSelectAll && this.selectAllButton) {
            let count = 0;
            let length = 0;

            for (let i = 0; i < this.options.length; i++) {
                if (!this.options[i].disabled && !this.options[i].hidden && !this.filterList[i]) {
                    if (this.options[i].selected) {
                        count++;
                    }
                    length++;
                }
            }

            if (count === length) {
                this.selectAllButton.nativeElement.checked = true;
                this.selectAllLabel = false;
            } else {
                this.selectAllButton.nativeElement.checked = false;
                this.selectAllLabel = true;
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

    // Called when select all is checked to check all values not disabled or shown
    public selectAll(value: boolean) {
        let selects: number[] = [];
        for (let i = 0; i < this.options.length; i++) {
            if (!this.options[i].disabled && !this.options[i].hidden && !this.filterList[i]) {
                if (this.selectAllLabel !== this.options[i].selected) {
                    // this.onSelect.emit(i);
                    selects.push(i);
                }
            }
        }
        this.onSelect.emit(selects);
    }

    public itemClicked(index: number) {
        super.itemClicked(index);
    }

    public itemsChanged() {
        this.updateSelectAll();
    }
}
