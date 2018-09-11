import {
    Directive, ElementRef, Renderer2, Host, Optional, Input, HostListener, ComponentRef, AfterViewInit, Output, EventEmitter, OnInit
} from '@angular/core';
import { AlloyIdentityDirective } from './identity.directive';
import { Overlay, OverlayRef, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { DropdownOverlay } from '../dropdown-overlay/dropdown-overlay';

@Directive({
    selector: `select [alloy]`
})

export class AlloySelectDirective implements AfterViewInit, OnInit {

    private _placeholder = '';
    private _isOpen = false;
    private _multiple = false;
    private _hasSelectAll = false;
    private _filterable = false;

    private buttonEl: any;
    private buttonLabelEl: any;
    private placeholderOption;
    private overlayRef: OverlayRef;

    // Option to enable search
    @Input() set filterable(value: boolean) {
        this._filterable = value !== false;
    }

    // Option to select multiple items
    @Input() set multiple(value: any) {
        this._multiple = true;
    }

    // Show select all option in dropdown
    @Input() set hasSelectAll(value: any) {
        this._hasSelectAll = value !== false;
    }

    // Set placeholder shown before option is selected
    @Input()
    get placeholder() { return this._placeholder; }
    set placeholder(value: string) {
        this._placeholder = value;

        // Create empty hidden option to be used as placeholder
        // If select is not multiple it must always have an option selected
        if (!this._multiple) {
            if (this.placeholderOption) {
                this.renderer.setProperty(this.placeholderOption, 'label', this._placeholder);
            } else {
                this.placeholderOption = this.renderer.createElement('option');
                this.renderer.insertBefore(this.el.nativeElement, this.placeholderOption, this.el.nativeElement.firstChild);
                this.renderer.setProperty(this.placeholderOption, 'label', this._placeholder);
                this.renderer.setProperty(this.placeholderOption, 'value', '');
                this.renderer.setAttribute(this.placeholderOption, 'selected', 'true');
                this.renderer.setProperty(this.placeholderOption, 'hidden', 'true');
            }
        }

        this.updateButton();
    }

    // Change to alternate style according to Caranu
    @Input() set alternateStyle(value: boolean) {
        if (value === false) {
            this.renderer.removeClass(this.buttonEl, 'alternateStyle');
        } else {
            this.renderer.addClass(this.buttonEl, 'alternateStyle');
        }
    }

    @Input() set disabled(value: boolean) {
        if (value === false) {
            this.renderer.setProperty(this.buttonEl, 'disabled', false);
        } else {
            this.renderer.setProperty(this.buttonEl, 'disabled', true);
        }
    }

    @Input() set readonly(value: any) {
        if (value === true || value === 'true') {
            this.renderer.addClass(this.buttonEl, 'readonly');
        } else {
            this.renderer.removeClass(this.buttonEl, 'readonly');
        }
    }

    // Events for when dropdown is opened or closed
    @Output() onOpen: EventEmitter<void> = new EventEmitter<void>();
    @Output() onClose: EventEmitter<void> = new EventEmitter<void>();

    // Set styling for button based on if dropdown is open
    private get isOpen() { return this._isOpen; };
    private set isOpen(value: boolean) {
        this._isOpen = value;
        if (this._isOpen) {
            this.onOpen.emit();
            this.renderer.addClass(this.buttonEl, 'is-open');
        } else {
            this.onClose.emit();
            this.renderer.removeClass(this.buttonEl, 'is-open');
        }
    }

    constructor(
        private el: ElementRef,
        private renderer: Renderer2,
        private overlay: Overlay,
        @Host() @Optional() private identityDirective: AlloyIdentityDirective) {

        let originalClasses = this.el.nativeElement.className as string;
        let originalStyle = this.el.nativeElement.attributes['style'];

        this.buttonEl = this.renderer.createElement('button');
        this.renderer.setAttribute(this.buttonEl, 'type', 'button');
        this.renderer.addClass(this.buttonEl, 'select-button');

        // Apply all classes and styles from select element to button element
        if (originalClasses) {
            originalClasses.split(' ').forEach(element => {
                this.renderer.addClass(this.buttonEl, element);
            });
        }
        if (originalStyle) {
            this.renderer.setAttribute(this.buttonEl, originalStyle.name, originalStyle.value);
        }

        // Toggle dropdown on button click
        this.buttonEl.addEventListener('click', this.toggle.bind(this));
        // Update button on change of select element
        this.el.nativeElement.addEventListener('change', this.updateButton.bind(this));
    }

    ngOnInit(): void {
        this.renderer.insertBefore(this.renderer.parentNode(this.el.nativeElement), this.buttonEl, this.el.nativeElement);
        this.renderer.appendChild(this.buttonEl, this.el.nativeElement);

        if (!this.identityDirective) {
            this.buttonLabelEl = this.renderer.createElement('label');
            this.renderer.appendChild(this.buttonEl, this.buttonLabelEl);
        }
    }

    ngAfterViewInit() {
        if (this.identityDirective) {
            this.identityDirective.assignTo(this.buttonEl);
        }
        this.updateButton();

        // Observe changes in child list of select element and trigger change detection so
        // if option is added or removed the binding updates
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => { this.el.nativeElement.dispatchEvent(new CustomEvent('change')); });
        });
        observer.observe(this.el.nativeElement, { childList: true });
    }

    // Update label for button to reflect what is selected
    updateButton() {
        if (this.buttonLabelEl) {
            let count = 0;
            for (let i of this.el.nativeElement.options) {
                if (i.selected) {
                    count++;
                }
            }
            if (count === 0) {
                this.buttonLabelEl.innerText = this._placeholder;
            } else if (count === 1) {
                this.buttonLabelEl.innerText = this.el.nativeElement.options[this.el.nativeElement.options.selectedIndex].label;
            } else {
                this.buttonLabelEl.innerText = '[' + count + '] Selected';
            }
        }
    }

    // Update select/option elements when value is selected
    select(selected: number, value: boolean) {
        // Ability to close window without changing anything
        if (selected === -1) {
            this.closeWindow();
            return;
        }
        const changed = this.el.nativeElement.options[selected].selected !== value;

        if (!this._multiple) {
            this.toggle();
            this.el.nativeElement.options[selected].selected = true;
        } else {
            this.el.nativeElement.options[selected].selected = value;
        }

        // Check if value changed and dispach event so ngModel knows to update
        if (changed) {
            this.el.nativeElement.dispatchEvent(new CustomEvent('change'));
        }
    }

    // Close dropdown if the window scrolls
    @HostListener('window:scroll')
    private closeWindow() {
        if (this.overlayRef && this.isOpen) {
            this.overlayRef.dispose();
            this.isOpen = false;
        }
    }

    // Create new overlay with the dropdown overlay component
    private openWindow() {
        const config = new OverlayConfig();
        // Set window size to button size so dropdown CSS can reference it
        config.width = this.buttonEl.clientWidth;
        config.height = this.buttonEl.clientHeight;
        config.hasBackdrop = true;
        config.positionStrategy = this.overlay.position().connectedTo(new ElementRef(this.buttonEl),
            { originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'top' });
        config.scrollStrategy = this.overlay.scrollStrategies.noop();
        config.backdropClass = 'cdk-overlay-transparent-backdrop';
        // Class to prevent pane from taking clicks (otherwise area over button would not be part
        // of backdrop and would not close dropdown)
        config.panelClass = 'dropdown-cdk-pane';

        this.overlayRef = this.overlay.create(config);
        const dropdownPortal = new ComponentPortal(DropdownOverlay);
        const compRef: ComponentRef<DropdownOverlay> = this.overlayRef.attach(dropdownPortal);

        compRef.instance.options = this.el.nativeElement.options;
        compRef.instance.hasSelectAll = this._hasSelectAll;
        compRef.instance.multiple = this._multiple;
        compRef.instance.filterable = this._filterable;
        compRef.instance.onSelect.subscribe((selected: [number, boolean]) => { this.select(selected[0], selected[1]); });

        this.overlayRef.backdropClick().subscribe(() => this.closeWindow());

        this.isOpen = true;
    }

    toggle() {
        if (this.isOpen) {
            this.closeWindow();
        } else {
            this.openWindow();
        }
    }
}
