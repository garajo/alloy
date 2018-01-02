import {
    Input,
    Component,
    ViewEncapsulation
} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'alloy-textarea',
    templateUrl: './textarea.html',
    encapsulation: ViewEncapsulation.None
})
export class AlloyTextarea {

    private _cols: number;
    private _rows: number;
    private _width: string;
    private _height: string;
    private _resize: string;
    private _dirname: string;
    private _form: string;
    private _maxlength: number;
    private _minlength: number;
    private _name: string;
    private _placeholder: string;
    private _wrap: string;
    private _type: string;
    private _value: string;
    private _disabled: boolean;
    private _autofocus: boolean;
    private _readonly: boolean;
    private _required: boolean;
    private _spellcheck: boolean;

    // Specifies the visible width of a text area.
    @Input()
    get cols() { return this._cols; }
    set cols(value: number) {
        this._cols = value;
    }

    // Specifies the visible number of lines in a text area.
    @Input()
    get rows() { return this._rows; }
    set rows(value: number) {
        this._rows = value;
    }

    /**Width of the textarea in px */
    @Input()
    get width() { return this._width; }
    set width(value: string) {
        if (value !== 'auto') {
            value = value + 'px';
        }
        this._width = value;
    }

    /**Height of the textarea in px */
    @Input()
    get height() { return this._height; }
    set height(value: string) {
        if (value !== 'auto') {
            value = value + 'px';
        }
        this._height = value;
    }

    // specifies if the textbox is not resizable.
    @Input()
    get resize() { return this._resize; }
    set resize(value: string) {  // value can be null or "none".
        this._resize = value;
    }

    // Specifies that the text direction of the textarea will be submitted.
    @Input()
    get dirname() { return this._dirname; }
    set dirname(value: string) {
        this._dirname = value;
    }

    // Specifies one or more forms the text area belongs to.
    @Input()
    get form() { return this._form; }
    set form(value: string) { // the value hould be the form-id.
        this._form = value;
    }

    // 	Specifies the maximum number of characters allowed in the text area.
    @Input()
    get maxlength() { return this._maxlength; }
    set maxlength(value: number) {
        this._maxlength = value;
    }

    // 	Specifies the minimum number of characters allowed in the text area.
    @Input()
    get minlength() { return this._minlength; }
    set minlength(value: number) {
        this._minlength = value;
    }

    // Specifies a name for a text area.
    @Input()
    get name() { return this._name; }
    set name(value: string) {
        this._name = value;
    }

    // Specifies a short hint that describes the expected value of a text area.
    @Input()
    get placeholder() { return this._placeholder; }
    set placeholder(value: string) {
        this._placeholder = value;
    }

    // Specifies how the text in a text area is to be wrapped when submitted in a form.
    @Input()
    get wrap() { return this._wrap; }
    set wrap(value: string) {  // the value can be "hard" or "soft" or "off".
        this._wrap = value;
    }

    // Returns the type of the form element the text area is.
    @Input()
    get type() { return this._type; }
    set type(value: string) {
        this._type = value;
    }

    // Sets or returns the contents of a text area.
    @Input()
    get value() { return this._value; }
    set value(value: string) {
        if (value) {
            this._value = value;
        } else {
            this._value = '';
        }
    }

    // Specifies that a text area should be disabled.
    @Input()
    get disabled() { return this._disabled; }
    set disabled(value: boolean) {
        this._disabled = value;
    }

    // Specifies that a text area should automatically get focus when the page loads.
    @Input()
    get autofocus() { return this._autofocus; }
    set autofocus(value: boolean) {
        this._autofocus = value;
    }

    // Specifies that a text area should be read-only.
    @Input()
    get readonly() { return this._readonly; }
    set readonly(value: boolean) {
        this._readonly = value;
    }

    // Specifies that a text area is required/must be filled out.
    @Input()
    get required() { return this._required; }
    set required(value: boolean) {
        this._required = value;
    }

    // Specifies that a text area is required/must be filled out.
    @Input()
    get spellcheck() { return this._spellcheck; }
    set spellcheck(value: boolean) {
        this._spellcheck = value;
    }
}
