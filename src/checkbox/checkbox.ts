import {
    Input,
    Component,
    forwardRef
} from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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
export class AlloyCheckbox implements ControlValueAccessor {

    /** Whether or not the checkbox is disabled  */
    private _isDisabled = false;

    /** Whether or not the checkbox is checked */
    private _isChecked = false;

    /** Whether or not the checkbox label/ icon is hovered upon */
    private _isHovered = false;

    /** Whether or not the checkbox is in the error state */
    private _isErrors = false;

    /** Checkbox label */
    private _label = '';

    /** Checkbox icon */
    private _iconSource = '';

    /** ControlValueAccessor interface implementation */
    onChange: any = () => { };
    onTouched: any = () => { };

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

    /** Input boolean to set the checkbox in error state */
    @Input()
    get errors() { return this._isErrors; }
    set errors(value: boolean) {
        this._isErrors = value;
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

    /** Determines whether icon needs to be displayed */
    showIcon(): boolean {
        return this._iconSource !== '';
    }

    /** Determines whether label needs to be displayed */
    showLabel(): boolean {
        return this._label !== '';
    }

    /** Toggles the enabled/disabled states of the checkbox */
    toggle(): void {
        if (!this._isDisabled) {
            this._isChecked = !this._isChecked;
        }
    }

    /** Toggles the hovered state of the checkbox when it's label or icon is hovered upon */
    toggleHover(): void {
        this._isHovered = !this._isHovered;
    }
}
