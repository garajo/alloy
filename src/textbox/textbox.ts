import {
    Input,
    Component,
    ViewEncapsulation
} from '@angular/core';

import {NgForm} from '@angular/forms';

@Component({
    moduleId: module.id,
    selector: 'alloy-textbox',
    templateUrl: './textbox.html',
    styleUrls: ['./textbox.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AlloyTextbox {

    private _size: number;
    private _maxLength: number;
    private _placeholder = '';
    private _defaultValue = '';
    private _pattern = '';
    private _isDisabled = false;
    private _isRequired = false;
    private _isReadOnly = false;
    public isWidthSet = false;

    @Input()
    get size() { return this._size; }
    set size(value: number) {
        if(typeof value !== undefined){
            if(value < 1){
                this.isWidthSet = false;
            }
            else{
                this._size = value;
                this.isWidthSet = true;
            }
        }
    }

    @Input()
    get maxLength() { return this._maxLength; }
    set maxLength(value: number) {
        if(typeof value !== undefined){
            this._maxLength = value;
        }
    }

    @Input()
    get disabled() { return this._isDisabled; }
    set disabled(value: boolean) {
        this._isDisabled = value;
    }

    @Input()
    get readonly() { return this._isReadOnly; }
    set readonly(value: boolean) {
        this._isReadOnly = value;
    }

    @Input()
    get placeholder() { return this._placeholder; }
    set placeholder(value: string) {
        value = "" + value;
        this._placeholder = value;
    }

    @Input()
    get defaultValue() { return this._defaultValue; }
    set defaultValue(value: string) {
        this._defaultValue = value;
    }

    @Input()
    get required() { return this._isRequired; }
    set required(value: boolean) {
        this._isRequired = value;
    }

    @Input()
    get pattern() { return this._pattern; }
    set pattern(value: string) {
        this._pattern = value;
    }
}