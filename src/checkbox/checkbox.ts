import {
    Input,
    Component,
    ViewEncapsulation
} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'alloy-checkbox',
    templateUrl: './checkbox.html',
    encapsulation: ViewEncapsulation.None
})
export class AlloyCheckbox {

    /** Whether or not the checkbox is disabled  */
    private _isDisabled = false;

    /** Whether or not the checkbox is checked */
    private _isChecked = false;

    /** Whether or not the checkbox label/ icon is hovered upon */
    private _isHovered = false;

    /** Checkbox label */
    private _label = '';

    /** Checkbox icon */
    private _iconSource = '';

    /** Input boolean to check the checkbox */
    @Input()
    get checked() { return this._isChecked; }
    set checked(value: boolean) {
        this._isChecked = value;
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
