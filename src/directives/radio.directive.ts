import { Directive, HostBinding, ElementRef, Renderer2, Input, Optional, Host, ContentChildren, forwardRef, QueryList, ChangeDetectorRef, HostListener, Output, EventEmitter } from '@angular/core';
import { LabelWrapperDirective } from './labelWrapper.directive';
import { FocusMonitor } from '@angular/cdk/a11y';
import { AlloyIdentityDirective } from './identity.directive';

// Increasing integer for generating unique ids for radio components.
let nextUniqueId = 0;

/**
 * A group of radio buttons. May contain one or more `<mat-radio-button>` elements.
 */
@Directive({
    // tslint:disable-next-line:directive-selector
    selector: 'alloy-radio-group',
    exportAs: 'alloyRadioGroup'
})
export class AlloyRadioGroupDirective {
    /** Child radio buttons. */
    @ContentChildren(forwardRef(() => AlloyRadioDirective), { descendants: true })
    private radios: QueryList<AlloyRadioDirective>;

    private _name: string = `alloy-radio-group-${nextUniqueId++}`;
    /** Name of the radio button group. All radio buttons inside this group will use this name. */
    @Input()
    get name(): string { return this._name; }
    set name(value: string) {
        this._name = value;
        this.updateRadioButtonNames();
    }

    /**
     * Value for the radio-group. Should equal the value of the selected radio button if there is
     * a corresponding radio button with a matching value. If there is not such a corresponding
     * radio button, this value persists to be applied in case a new radio button is added with a
     * matching value.
     */
    @Input()
    get selection(): any { return this.value; }
    set selection(newValue: any) { this.value = newValue; }

    private _value: any = null;
    /**
     * Value for the radio-group. Should equal the value of the selected radio button if there is
     * a corresponding radio button with a matching value. If there is not such a corresponding
     * radio button, this value persists to be applied in case a new radio button is added with a
     * matching value.
     */
    @Input()
    get value(): any { return this._value; }
    set value(newValue: any) {
        if (this._value !== newValue) {
            // Set this before proceeding to ensure no circular loop occurs with selection.
            this._value = newValue;

            this.updateSelectedRadioFromValue();
            this.valueChange.emit(this._value);
        }
    }
    @Output() valueChange = new EventEmitter();


    private _selected: AlloyRadioDirective | null = null;
    /**
     * The currently selected radio button. If set to a new radio button, the radio group value
     * will be updated to match the new selected button.
     */
    @Input()
    get selected() { return this._selected; }
    set selected(selected: AlloyRadioDirective | null) {
        if (this.selected && this.selected.error) {
            this.selected.error = false;    // We want to limit error to only the selected item
            this.selected.errorMessage = null;
        }
        this._selected = selected;
        this.value = selected ? selected._getValue() : null;
    }

    private _disabled = false;
    /** Whether the radio group is disabled */
    @Input()
    get disabled(): boolean { return this._disabled; }
    set disabled(value) {
        this._disabled = value != null && `${value}` !== 'false';

        if (this.radios) {
            this.radios.forEach(radio => radio.disabled = value);
        }
    }

    private _readonly = false;
    /** Whether the radio group is readonly */
    @Input()
    get readonly(): boolean { return this._readonly; }
    set readonly(value) {
        this._readonly = value != null && `${value}` !== 'false';

        if (this.radios) {
            this.radios.forEach(radio => radio.readonly = value);
        }
    }

    private errorState: boolean;
    @Input()
    get error() { return this.errorState; }
    set error(value: boolean) {
        this.errorState = value;
        if (this.selected) {
            this.selected.error = value;
        }
    }

    private message: string;
    @Input()
    get errorMessage() { return this.message; }
    set errorMessage(value: string) {
        this.message = value;
        if (this.selected) {
            this.selected.errorMessage = value;
        }
    }

    private updateRadioButtonNames(): void {
        if (this.radios) {
            this.radios.forEach(radio => {
            radio._setName(this.name);
            });
        }
    }

    /** Updates the `selected` radio button from the internal value state. */
    private updateSelectedRadioFromValue(): void {
        // If the value already matches the selected radio, do nothing.
        const isAlreadySelected = this.selected !== null && this.selected._getValue() === this.value;

        if (this.radios && !isAlreadySelected) {
            this.selected = null;
            this.radios.forEach(radio => {
                const isChecked = this.value === radio._getValue();
                radio._setChecked(isChecked);
                if (isChecked) {
                    this._selected = radio;
                }
            });
        }
    }
}

@Directive({
    selector: `input [type=radio] [alloy]`
})
export class AlloyRadioDirective extends LabelWrapperDirective {
    @HostBinding('class.alloy-radio') true;

    /** *Experimental* Checkbox size */
    private _size;
    /**
     * Returns the current size of the checkbox *box*.
     */
    get size() { return this._size; }
    /**
     * Sets the current checkbox size.  Note: currently only applies to the box itself, not the labels.
     */
    @Input() set size(value: number) {
        (value <= 0 || !value) ? this._size = 16 : this._size = value;
        this.reconstructor();
    }

    @HostListener('change') onChange() {
        // Only seems to fire on true, not sure what would happen if we supported uncheck (no selection)
        const groupValueChanged = this.radioGroup && this._getValue() !== this.radioGroup.value;

        if (this.radioGroup) {
            if (groupValueChanged) {
                this.radioGroup.selected = this;
            }
        }
    }

    constructor(
        protected el: ElementRef,
        protected renderer: Renderer2,
        protected focusMonitor: FocusMonitor,
        private changeDetector: ChangeDetectorRef,
        @Host() @Optional() protected identityDirective: AlloyIdentityDirective,
        @Optional() private radioGroup: AlloyRadioGroupDirective) {
            super(el, renderer, focusMonitor, identityDirective);

            this.renderer.addClass(this.labelElement, 'alloy-radio-wrapper');
            this.radioGroup = radioGroup;
    }

    ngOnInit() {
        if (this.radioGroup) {
          // If the radio is inside a radio group, determine if it should be checked
          this.el.nativeElement.checked = this.radioGroup.value === this.el.nativeElement.value;
          // Copy name from parent radio group
          this.el.nativeElement.name = this.radioGroup.name;
        }
    }

    /**
     * Handles constructing the DOM for the checkbox based on changes to the features (img, text) or style
     */
    reconstructor() {
        // AJM: This is experimental.  We attempt to proportionately scale font/icon/check
        if (this.size) {
            this.renderer.setStyle(this.styledElement, 'transform', 'scale(' + this._size / 16 + ')');
            this.renderer.setStyle(this.styledElement, 'margin-top', this._size / 16 * 10 - 9 + 'px');
            this.renderer.setStyle(this.styledElement, 'margin-left', this._size / 16 * 8 - 8 + 'px');
            this.renderer.setStyle(this.styledElement, 'margin-right', this._size / 16 * 8 - 8 + 'px');

            if (this.identityDirective) {
                this.identityDirective.setSize(this._size * 1.143, this._size);
            }
        }
    }

    // private accessors for radio group
    _setChecked(checked: boolean) {
        this.el.nativeElement.checked = checked;
    }

    _getValue(): any {
        return this.el.nativeElement.value;
    }

    _setName(value: string) {
        this.el.nativeElement.name = value;
    }
}
