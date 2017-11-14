import {
    Input,
    Component,
    ViewEncapsulation
} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'alloy-checkbox',
    templateUrl: './checkbox.html',
    styleUrls: ['./checkbox.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AlloyCheckbox {

    /** Whether or not the checkbox is disabled  */
    private _isDisabled = false;

    /** Whether or not the checkbox is checked */
    private _isChecked = false;

    /** Checkbox label */
    private _label = '';

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

    /** Checkbox label to be shown */
    @Input()
    get label() { return this._label; }
    set label(value: string) {
        this._label = value;
    }
}
