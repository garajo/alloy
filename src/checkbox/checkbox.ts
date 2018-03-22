import {
    Input,
    Component,
    forwardRef,
    ViewChild,
    ElementRef,
    Renderer2
} from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FocusableOption } from '@angular/cdk/a11y';

@Component({
    moduleId: module.id,
    selector: 'alloy-checkbox',
    templateUrl: './checkbox.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AlloyCheckbox),
            multi: true
        }
    ]
})
export class AlloyCheckbox implements ControlValueAccessor, FocusableOption {
    @ViewChild('checkbox') private inputCheckbox: ElementRef;
    @ViewChild('checkboxContainer') private checkboxContainer: ElementRef;

    /** Whether or not the checkbox is disabled  */
    private _isDisabled = false;

    /** Whether or not the checkbox is checked */
    private _isChecked = false;

    /** Whether or not the checkbox label/ icon is hovered upon */
    private _isHovered = false;

    /** Whether or not the checkbox is in readonly state */
    private _isReadonly = false;

    /** Whether or not the checkbox is in the error state */
    private _isErrors = false;

    /** Checkbox validation message */
    private _errorMessage = '';

    /** Checkbox label */
    private _label = '';

    /** Checkbox icon */
    private _iconSource = '';

    /** Checkbox size */
    private _size = 14;

    /** ControlValueAccessor interface implementation */
    onChange: any = () => { };
    onTouched: any = () => { };

    constructor(private renderer: Renderer2) {}

    registerOnChange(fn) {
        this.onChange = fn;
    }

    registerOnTouched(fn) {
        this.onTouched = fn;
    }

    writeValue(value) {
        if (value) {
            this.checked = value;
        }
    }

    /** Input boolean to check the checkbox */
    @Input()
    get checked() { return this._isChecked; }
    set checked(value: boolean) {
        this._isChecked = value;
        this.onChange(value);
        this.onTouched();
    }

    /** Input boolean to disable the checkbox */
    @Input()
    get disabled() { return this._isDisabled; }
    set disabled(value: boolean) {
        this._isDisabled = value;
    }

    /** Input boolean to set the checkbox in hovered state */
    @Input()
    get hovered() { return this._isHovered; }
    set hovered(value: boolean) {
        this._isHovered = value;
    }

    /** Input boolean to set the readonly state for the checkbox */
    @Input()
    get readonly() { return this._isReadonly; }
    set readonly(value: boolean) {
        this._isReadonly = value;
    }

    /** Input boolean to set the checkbox in error state */
    @Input()
    get errors() { return this._isErrors; }
    set errors(value: boolean) {
        this._isErrors = value;
    }

    /** Checkbox error message shown as a tooltip */
    @Input()
    get errorMessage() { return this._errorMessage; }
    set errorMessage(value: string) {
        this._errorMessage = value;
    }

    /** Checkbox label to be shown */
    @Input()
    get label() { return this._label; }
    set label(value: string) {
        this._label = value;
    }

    /** Checkbox icon to be shown */
    @Input()
    get icon() { return this._iconSource; }
    set icon(value: string) {
        this._iconSource = value;
    }

    /** Checkbox size */
    @Input()
    get size() { return this._size; }
    set size(value: number) {
        (value <= 0 || !value) ? this._size = 14 : this._size = value;
        this.renderer.setAttribute(this.checkboxContainer.nativeElement, 'style', 'transform: scale(' + (this._size / 14) + ')');
    }

    /** Determines whether icon needs to be displayed */
    showIcon(): boolean {
        return this._iconSource !== '';
    }

    /** Determines whether label needs to be displayed */
    showLabel(): boolean {
        return this._label !== '';
    }

    /** Toggles the checked/unchecked states of the checkbox */
    toggle(): boolean {
        if (!this._isDisabled && !this._isReadonly) {
            this._isChecked = !this._isChecked;
            this.focus();
            return true;
        }
        return false;
    }

    /** Toggles the hovered state of the checkbox when it's label or icon is hovered upon */
    toggleHover(): void {
        if (this._isDisabled || this._isReadonly) {
            this._isHovered = false;
        } else {
            this._isHovered = !this._isHovered;
        }
    }

    /** Checks if the checkbox currently can be focused */
    isFocusable(): boolean {
        return !this.readonly && !this.disabled;
    }

    /** Get the checkbox to focus and receive keystrokes */
    focus(): void {
        if (this.isFocusable()) {
            this.inputCheckbox.nativeElement.focus();
        }
    }
}
