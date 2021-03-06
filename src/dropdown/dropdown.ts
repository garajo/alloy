import {
    Input,
    QueryList,
    Component,
    ElementRef,
    ViewChild,
    OnInit,
    Self,
    Attribute,
    Optional,
    Output,
    OnDestroy,
    ContentChildren,
    AfterContentInit,
    ViewEncapsulation,
    EventEmitter,
    ChangeDetectorRef
} from '@angular/core';

import { ConnectedOverlayDirective, ViewportRuler } from '@angular/cdk/overlay';

import { ControlValueAccessor, NgControl } from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { merge } from 'rxjs/observable/merge';
import { filter } from 'rxjs/operators/filter';
import { startWith } from 'rxjs/operators/startWith';

import { ENTER, SPACE, UP_ARROW, DOWN_ARROW, HOME, END, ESCAPE } from '../core/keyboard/keycodes';
import { AlloyOption, AlloyOptionSelectionChange } from '../core/option/index';
import { FocusKeyManager } from '../core/a11y/focus-key-manager';
import { SelectionModel } from '../core/selection/selection';

/**
 * The following style constants are necessary to save here in order
 * to properly calculate the alignment of the selected option over
 * the trigger element.
 */

/** The fixed height of every option element (option, group header etc.). */
export const SELECT_ITEM_HEIGHT = 40;

/** The max height of the select's overlay panel */
export const SELECT_PANEL_MAX_HEIGHT = 256;

/** The max number of options visible at once in the select panel. */
export const SELECT_MAX_OPTIONS_DISPLAYED =
    Math.floor(SELECT_PANEL_MAX_HEIGHT / SELECT_ITEM_HEIGHT);

/** The fixed height of the select's trigger element. */
export const SELECT_TRIGGER_HEIGHT = 30;

/**
 * Must adjust for the difference in height between the option and the trigger,
 * so the text will align on the y axis.
 */
export const SELECT_OPTION_HEIGHT_ADJUSTMENT = (SELECT_ITEM_HEIGHT - SELECT_TRIGGER_HEIGHT) / 2;

/** The panel's padding on the x-axis */
export const SELECT_PANEL_PADDING_X = 16;

/** The panel's x axis padding if it is indented (e.g. there is an option group). */
export const SELECT_PANEL_INDENT_PADDING_X = SELECT_PANEL_PADDING_X * 2;

/**
 * Distance between the panel edge and the option text in
 * multi-selection mode.
 *
 * (SELECT_PADDING * 1.75) + 20 = 48
 * The padding is multiplied by 1.75 because the checkbox's margin is half the padding, and
 * the browser adds ~4px, because we're using inline elements.
 * The checkbox width is 20px.
 */
export const SELECT_MULTIPLE_PANEL_PADDING_X = SELECT_PANEL_PADDING_X * 1.75 + 20;

/**
 * The panel's padding on the y-axis. This padding indicates there are more
 * options available if you scroll.
 */
export const SELECT_PANEL_PADDING_Y = 16;

/**
 * The select panel will only "fit" inside the viewport if it is positioned at
 * this value or more away from the viewport boundary.
 */
export const SELECT_PANEL_VIEWPORT_PADDING = 8;

/** Change event object that is emitted when the select value has changed. */
export class AlloyDropdownChange {
    constructor(public source: AlloyDropdown, public value: any) { }
}

@Component({
    moduleId: module.id,
    selector: 'alloy-dropdown',
    templateUrl: './dropdown.html',
    inputs: ['color'],
    encapsulation: ViewEncapsulation.None
})
export class AlloyDropdown implements AfterContentInit, OnDestroy, OnInit,
    ControlValueAccessor {

    private _disabled: boolean;

    /** Whether or not the overlay panel is open. */
    private _panelOpen = false;

    /** internal property to determine is more than one option has been selected */
    public multipleSelected = false;

    /** Subscriptions to option events. */
    private _optionSubscription: Subscription | null;

    /** Subscription to changes in the option list. */
    private _changeSubscription: Subscription;

    /** Subscription to tab events while overlay is focused. */
    private _tabSubscription: Subscription;

    /** Whether filling out the select is required in the form.  */
    private _required: boolean = false;

    /** The scroll position of the overlay panel, calculated to center the selected option. */
    private _scrollTop = 0;

    /** The placeholder displayed in the trigger of the select. */
    private _placeholder: string;

    /** Property for icon imported by 'require' stmt. Needs to be that for browser to digest it */
    private _icon: any;

    /** internal property to determine if the intended icon is an image or a style class  */
    public isIconClass = false;

    /** Whether or not the dropdown is in readonly state */
    private _isReadonly = false;

    /** Whether or not the dropdown is in the error state */
    private _isErrors = false;

    /** Dropdown validation message */
    private _errorMessage = '';

    /** Property for right alignment of dd pane */
    private _rightAlign: boolean;

    /** A boolean determining visual state (lightweight or alternate) for styling */
    private _alternate_style: boolean;

    /** Whether the component is in multiple selection mode. */
    private _multiple: boolean = false;

    /** Whether the component options are filterable. */
    private _filterable: boolean = false;

    /** Whether the options allow a selectAll function */
    private _selectAllOption: boolean = false;

    /** label to be displayed for selectAll */
    public selectAllLabel: string = 'Select All';
    public isSelectAll: boolean = false;

    /** Deals with the selection logic. */
    _selectionModel: SelectionModel<AlloyOption>;

    /** The animation state of the placeholder. */
    private _placeholderState = '';

    /** Tab index for the element. */
    private _tabIndex: number;

    /**
     * The width of the trigger. Must be saved to set the min width of the overlay panel
     * and the width of the selected value.
     */
    _triggerWidth: number;

    /** Manages keyboard events for options in the panel. */
    _keyManager: FocusKeyManager;

    /** The last measured value for the trigger's client bounding rect. */
    _triggerRect: ClientRect;

    /**
     * The width of the selected option's value. Must be set programmatically
     * to ensure its overflow is clipped, as it's absolutely positioned.
     */
    _selectedValueWidth: number;

    /** View -> model callback called when value changes */
    _onChange: (value: any) => void = () => { };

    /** View -> model callback called when select has been touched */
    _onTouched = () => { };

    /** The IDs of child options to be passed to the aria-owns attribute. */
    _optionIds: string = '';

    /** The value of the select panel's transform-origin property. */
    _transformOrigin: string = 'top';

    /** Whether the panel's animation is done. */
    _panelDoneAnimating: boolean = false;

    /** the initial placeholder determined by user */
    initialPlaceholder: string;

    /**
     * The y-offset of the overlay panel in relation to the trigger's top start corner.
     * This must be adjusted to align the selected option text over the trigger text.
     * when the panel opens. Will change based on the y-position of the selected option.
     */
    _offsetY = 0;

    /**
     * This position config ensures that the top "start" corner of the overlay
     * is aligned with with the top "start" of the origin by default (overlapping
     * the trigger completely). If the panel cannot fit below the trigger, it
     * will fall back to a position above the trigger.
     */
    _positions = [
        {
            originX: 'start',
            originY: 'top',
            overlayX: 'start',
            overlayY: 'top',
        },
        {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'bottom',
        },
    ];

    _maxPanelHeight = '0px';

    /** Trigger that opens the select. */
    @ViewChild('trigger') trigger: ElementRef;

    /** Reference of dropdown filter inputbox. */
    @ViewChild('filterInput') filterInput: ElementRef;

    /** Panel containing the select options. */
    @ViewChild('panel') panel: ElementRef;

    /** Overlay pane containing the options. */
    @ViewChild(ConnectedOverlayDirective) overlayDir: ConnectedOverlayDirective;

    /** All of the defined select options. */
    @ContentChildren(AlloyOption, { descendants: true }) options: QueryList<AlloyOption>;

    /** Classes to be passed to the select panel. Supports the same syntax as `ngClass`. */
    @Input() panelClass: string | string[] | Set<string> | { [key: string]: any };

    /** Whether the component is disabled. */
    @Input()
    get disabled() { return this._disabled; }
    set disabled(value: boolean) {
        this._disabled = value;
    }

    /** Placeholder to be shown if no value has been selected. */
    @Input()
    get placeholder() { return this._placeholder; }
    set placeholder(value: string) {
        this._placeholder = value;
        this.initialPlaceholder = value;

        // Must wait to record the trigger width to ensure placeholder width is included.
        Promise.resolve(null).then(() => this._setTriggerWidth());
    }

    /** Icon input to show icon as button dropdown instead of text */
    @Input()
    get icon() { return this._icon; }
    set icon(value: any) {

        if (value.startsWith('alloy-ic-')) {
            // console.log('We have an alloy icon class');

            // We've determined the intended icon is not a data url but a string and we presume it to be the name of an
            // Alloy class because it starts with alloy-ic
            this.isIconClass = true;
        } else {
            // console.log('We have traditional JS/require icon use of DropDown. Value is: ' + value);

            // We've determined the intended icon is a data URL JS/require and we presume it is meant to be a source of an img/src
            this.isIconClass = false;
        }

        this._icon = value;
    }

    /** Input boolean to set the readonly state for the DropDown */
    @Input()
    get readonly() { return this._isReadonly; }
    set readonly(value: boolean) {
        this._isReadonly = value;
    }

    /** Input boolean to set the DropDown in error state */
    @Input()
    get errors() { return this._isErrors; }
    set errors(value: boolean) {
        this._isErrors = value;
    }

    /** DropDown error message shown as a tooltip */
    @Input()
    get errorMessage() { return this._errorMessage; }
    set errorMessage(value: string) {
        this._errorMessage = value;
    }

    /** Input boolean to align the pane with the right side of the button */
    @Input()
    get right_align() { return this._rightAlign; }
    set right_align(value: any) {
        this._rightAlign = value;
    }

    /** Change to the alternate style of dd according to Caranu spec */
    @Input()
    // todo: fix this naming style to alternateStyle
    get alternate_style() { return this._alternate_style; }
    set alternate_style(value: boolean) {
        this._alternate_style = value;
    }

    /** Whether the component is required. */
    @Input()
    get required() { return this._required; }
    set required(value: any) { this._required = coerceBooleanProperty(value); }

    /** Whether the user should be allowed to select multiple options. */
    @Input()
    get multiple(): boolean { return this._multiple; }
    set multiple(value: boolean) {
        if (this._selectionModel) {
            // throw getMdSelectDynamicMultipleError();
        }

        this._multiple = coerceBooleanProperty(value);
    }

    /** Whether the user should be allowed to filter options. */
    @Input()
    get filterable(): boolean { return this._filterable; }
    set filterable(value: boolean) {
        this._filterable = value;
    }

    /** Whether Select ALl should be allowed */
    @Input()
    get selectAllOption(): boolean { return this._selectAllOption; }
    set selectAllOption(value: boolean) {
        this._selectAllOption = value;
    }

    /** Tab index for the select element. */
    @Input()
    get tabIndex(): number { return (this.disabled || this.readonly) ? -1 : this._tabIndex; }
    set tabIndex(value: number) {
        if (typeof value !== 'undefined') {
            this._tabIndex = value;
        }
    }

    /** Aria label of the select. If not specified, the placeholder will be used as label. */
    @Input('aria-label') ariaLabel: string = '';

    /** Input that can be used to specify the `aria-labelledby` attribute. */
    @Input('aria-labelledby') ariaLabelledby: string = '';

    /** Combined stream of all of the child options' change events. */
    get optionSelectionChanges(): Observable<AlloyOptionSelectionChange> {
        return merge(...this.options.map(option => option.onSelectionChange));
    }

    /** Event emitted when the select has been opened. */
    @Output() onOpen: EventEmitter<void> = new EventEmitter<void>();

    /** Event emitted when the select has been closed. */
    @Output() onClose: EventEmitter<void> = new EventEmitter<void>();

    /** Event emitted when the selected value has been changed by the user. */
    @Output() change: EventEmitter<AlloyDropdownChange> = new EventEmitter<AlloyDropdownChange>();

    public noMatch = false;
    public eRef: ElementRef;
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private elementRef: ElementRef,
        private _viewportRuler: ViewportRuler,
        @Self() @Optional() public _control: NgControl,
        @Attribute('tabindex') tabIndex: string) {
        this.eRef = elementRef;
        if (this._control) {
            this._control.valueAccessor = this;
        }
        this._tabIndex = parseInt(tabIndex) || 0;
    }

    ngOnInit() {
        this._selectionModel = new SelectionModel<AlloyOption>(this.multiple, undefined, false);
    }

    ngAfterContentInit() {
        this._initKeyManager();

        this._changeSubscription = this.options.changes.pipe(
            startWith(null)
        )
        .subscribe(() => {
            this._resetOptions();
            if (this._control) {
                // Defer setting the value in order to avoid the "Expression
                // has changed after it was checked" errors from Angular.
                Promise.resolve(null).then(() => this._setSelectionByValue(this._control.value));
            }
        });
    }

    ngOnDestroy() {
        this._dropSubscriptions();

        if (this._changeSubscription) {
            this._changeSubscription.unsubscribe();
        }

        if (this._tabSubscription) {
            this._tabSubscription.unsubscribe();
        }
    }

    onSelectAll(): void {
        if (this._selectionModel.selected.length === this.options.length) {
            this._clearSelection();

        } else {
            this.options.forEach(option => {
                this._selectionModel.select(option);
                    option.select();
            });
        }
        this.setSelectAllLabel();
        this.setPlaceholder();
        this._propagateChanges();
    }


    /** Listen for (keyup) keystrokes from dropdown filter inputbox. For option filtering. */
    onFilterKeyUp(event): void {
        event.stopPropagation();

        const value = event.target.value;
        const keyCode = event.keyCode;

        if (keyCode === ESCAPE) this.toggle();

        // If found, set option.matched to true, else false
        this.options.toArray().forEach(option => {
            option.matched = option.viewValue.toLowerCase().includes(value.toLowerCase());
        });

        // Check if there is a matching option, otherwise show 'No match found!'
        this.noMatch = !this.options.toArray().some((option) => option.matched);
    }

    /** Focus search inputbox and clear input when dropdown open(). */
    filterInputFocus(): void {
        setTimeout(() => {
            this.filterInput.nativeElement.focus();
        }, 0);
    }

    /** Toggles the overlay panel open or closed. */
    toggle(): void {

        // We may want this extra security but with the "pointer-events: none" the widget doesn't response to any mouse/touch/keyboard event
        // if (this.disabled || this.readonly) {
        //     return;
        // }

        this.panelOpen ? this.close() : this.open();
    }

    /** Opens the overlay panel. */
    open(): void {
        if (this.disabled || this.readonly || !this.options.length) {
            return;
        }

        this._triggerRect = this.trigger.nativeElement.getBoundingClientRect();
        if (!this._triggerWidth) {
            this._setTriggerWidth();
        }

        this._calculateOverlayPosition();
        this._panelOpen = true;

        if (this._multiple) {
            this.options.toArray().map((s) => { s.multiple = true })
        }

        /** Focuses on input, reset to default values */
        if (this.filterable) {
            this.filterInputFocus();
            this.options.toArray().map((s) => { s.matched = true });
            this.noMatch = false;
        }
        this._changeDetectorRef.markForCheck();
    }

    /** Closes the overlay panel and focuses the host element. */
    close(): void {
        if (this._panelOpen) {
            this._panelOpen = false;

            if (this._selectionModel.isEmpty()) {
                this._placeholderState = '';
            }
            this._changeDetectorRef.markForCheck();
            this.focus();
        }
    }

    /**
     * Sets the select's value. Part of the ControlValueAccessor interface
     * required to integrate with Angular's core forms API.
     *
     * @param value New value to be written to the model.
     */
    writeValue(value: any): void {
        if (this.options) {
            this._setSelectionByValue(value);
        }
    }

    /**
     * Saves a callback function to be invoked when the select's value
     * changes from user input. Part of the ControlValueAccessor interface
     * required to integrate with Angular's core forms API.
     *
     * @param fn Callback to be triggered when the value changes.
     */
    registerOnChange(fn: (value: any) => void): void {
        this._onChange = fn;
    }

    /**
     * Saves a callback function to be invoked when the select is blurred
     * by the user. Part of the ControlValueAccessor interface required
     * to integrate with Angular's core forms API.
     *
     * @param fn Callback to be triggered when the component has been touched.
     */
    registerOnTouched(fn: () => {}): void {
        this._onTouched = fn;
    }

    /**
     * Disables the select. Part of the ControlValueAccessor interface required
     * to integrate with Angular's core forms API.
     *
     * @param isDisabled Sets whether the component is disabled.
     */
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    /** Whether or not the overlay panel is open. */
    get panelOpen(): boolean {
        return this._panelOpen;
    }

    /** The currently selected option. */
    get selected(): AlloyOption | AlloyOption[] {
        return this.multiple ? this._selectionModel.selected : this._selectionModel.selected[0];
    }

    /** The value displayed in the trigger. */
    get triggerValue(): string {
        if (this._multiple) {
            let selectedOptions = this._selectionModel.selected.map(option => option.viewValue);

            // TODO(crisbeto): delimiter should be configurable for proper localization.
            return selectedOptions.join(', ');
        }

        return this._selectionModel.selected[0].viewValue;
    }

    /**
     * Sets the width of the trigger element. This is necessary to match
     * the overlay width to the trigger width.
     */
    private _setTriggerWidth(): void {
        this._triggerWidth = this._getTriggerRect().width;
    }

    /** Handles the keyboard interactions of a closed select. */
    _handleClosedKeydown(event: KeyboardEvent): void {

        // We may want this extra security but with the "pointer-events: none" the widget doesn't response to any mouse/touch/keyboard event
        // if (this.disabled || this.readonly) {
        //     return;
        // }

        if (event.keyCode === ENTER || event.keyCode === SPACE) {
            event.preventDefault(); // prevents the page from scrolling down when pressing space
            this.open();
        } else if (event.keyCode === UP_ARROW || event.keyCode === DOWN_ARROW) {
            this._handleArrowKey(event);
        }
    }

    /** Handles keypresses inside the panel. */
    _handlePanelKeydown(event: KeyboardEvent): void {
        if (event.keyCode === HOME || event.keyCode === END) {
            event.preventDefault();
            event.keyCode === HOME ? this._keyManager.setFirstItemActive() :
                this._keyManager.setLastItemActive();
        } else {
            this._keyManager.onKeydown(event);
        }
    }

    /**
     * When the panel element is finished transforming in (though not fading in), it
     * emits an event and focuses an option if the panel is open.
     */
    _onPanelDone(): void {
        if (this.panelOpen) {
            this._focusCorrectOption();
            this.onOpen.emit();
        } else {
            this.onClose.emit();
            this._panelDoneAnimating = false;
            this.overlayDir.offsetX = 0;
            this._changeDetectorRef.markForCheck();
        }
    }

    /**
     * When the panel content is done fading in, the _panelDoneAnimating property is
     * set so the proper class can be added to the panel.
     */
    _onFadeInDone(): void {
        this._panelDoneAnimating = this.panelOpen;
        this.panel.nativeElement.focus();
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Calls the touched callback only if the panel is closed. Otherwise, the trigger will
     * "blur" to the panel when it opens, causing a false positive.
     */
    _onBlur() {
        if (!this.panelOpen) {
            this._onTouched();
        }
    }

    /**
     * Callback that is invoked when the overlay panel has been attached.
     */
    _onAttached(): void {
        this._changeDetectorRef.detectChanges();
        this.panel.nativeElement.scrollTop = this._scrollTop;
        this._calculateOverlayOffsetX();
        this._setScrollTop();
    }

    /**
     * Sets the scroll position of the scroll container. This must be called after
     * the overlay pane is attached or the scroll container element will not yet be
     * present in the DOM.
     */
    private _setScrollTop(): void {
        const scrollContainer =
            this.overlayDir.overlayRef.overlayElement.querySelector('.dropdown-pane');
        scrollContainer!.scrollTop = this._scrollTop;
    }

    /**
     * Sets the selected option based on a value. If no option can be
     * found with the designated value, the select trigger is cleared.
     */
    private _setSelectionByValue(value: any | any[], isUserInput = false): void {
        const isArray = Array.isArray(value);

        if (this.multiple && value && !isArray) {
            // throw getMdSelectNonArrayValueError();
        }

        this._clearSelection();

        if (isArray) {
            value.forEach((currentValue: any) => this._selectValue(currentValue, isUserInput));
            this._sortValues();
        } else {
            this._selectValue(value, isUserInput);
        }

        this._setValueWidth();

        if (this._selectionModel.isEmpty()) {
            this._placeholderState = '';
        }

        this._changeDetectorRef.markForCheck();
    }

    /**
     * Finds and selects and option based on its value.
     * @returns Option that has the corresponding value.
     */
    private _selectValue(value: any, isUserInput = false): AlloyOption | undefined {
        let optionsArray = this.options.toArray();
        let correspondingOption = optionsArray.find(option => {
            return option.value != null && option.value === value;
        });

        if (correspondingOption) {
            isUserInput ? correspondingOption._selectViaInteraction() : correspondingOption.select();
            this._selectionModel.select(correspondingOption);
            this._keyManager.setActiveItem(optionsArray.indexOf(correspondingOption));
        }

        return correspondingOption;
    }

    /**
     * Clears the select trigger and deselects every option in the list.
     * @param skip Option that should not be deselected.
     */
    private _clearSelection(skip?: AlloyOption): void {
        this._selectionModel.clear();
        this.options.forEach(option => {
            if (option !== skip) {
                option.deselect();
            }
        });
    }

    private _getTriggerRect(): ClientRect {
        return this.trigger.nativeElement.getBoundingClientRect();
    }

    /** Sets up a key manager to listen to keyboard events on the overlay panel. */
    private _initKeyManager() {
        this._keyManager = new FocusKeyManager(this.options);
        this._tabSubscription = this._keyManager.tabOut.subscribe(() => this.close());
    }

    /** Drops current option subscriptions and IDs and resets from scratch. */
    private _resetOptions(): void {
        this._dropSubscriptions();
        this._listenToOptions();
        this._setOptionIds();
        this._setOptionMultiple();
    }

    /** Listens to user-generated selection events on each option. */
    private _listenToOptions(): void {
        this._optionSubscription = this.optionSelectionChanges.pipe(
            filter((event: AlloyOptionSelectionChange) => event.isUserInput)
        )
        .subscribe((event: AlloyOptionSelectionChange) => {
            this._onSelect(event.source);
            this._setValueWidth();

            if (!this.multiple) {
                this.close();
            }
        });
    }

    /** Invoked when an option is clicked. */
    private _onSelect(option: AlloyOption): void {
        const wasSelected = this._selectionModel.isSelected(option);

        // TODO(crisbeto): handle blank/null options inside multi-select.
        if (this.multiple) {
            this._selectionModel.toggle(option);
            wasSelected ? option.deselect() : option.select();
            this._sortValues();
        } else {
            this._clearSelection(option.value == null ? undefined : option);

            if (option.value == null) {
                this._propagateChanges(option.value);
            } else {
                this._selectionModel.select(option);
            }
        }

        if (wasSelected !== this._selectionModel.isSelected(option)) {
            this._propagateChanges();
        }

        if (this._multiple) {
            if (this.selectAllOption) {
                this.setSelectAllLabel();
            }
            this.multipleSelected = false;
            this.setPlaceholder();

        } else {
            this._placeholder = option.viewValue;
        }
        this._changeDetectorRef.markForCheck();
    }

    private setPlaceholder(): void {

        if (this._selectionModel.selected.length > 0) {
            this._placeholder = this._selectionModel.selected[0].viewValue;
            if (this._selectionModel.selected.length > 1) {
                // const values = this._selectionModel.selected.map(element => {
                //     return element.viewValue;
                // }).join(', ');
                const values = '[' + this._selectionModel.selected.length + ']' + ' Selected';
                this._placeholder = values;
                this.multipleSelected = true;
            }
        } else {
            this._placeholder = this.initialPlaceholder;
        }
    }

    private setSelectAllLabel(): void {
        if (this._selectionModel.selected.length === this.options.length) {
            this.isSelectAll = true;
            this.selectAllLabel = 'Deselect All';
        } else {
            this.isSelectAll = false;
            this.selectAllLabel = 'Select All';
        }
    }

    /**
     * Sorts the model values, ensuring that they keep the same
     * order that they have in the panel.
     */
    private _sortValues(): void {
        if (this._multiple) {
            this._selectionModel.clear();

            this.options.forEach(option => {
                if (option.selected) {
                    this._selectionModel.select(option);
                }
            });
        }
    }

    /** Unsubscribes from all option subscriptions. */
    private _dropSubscriptions(): void {
        if (this._optionSubscription) {
            this._optionSubscription.unsubscribe();
            this._optionSubscription = null;
        }
    }

    /** Emits change event to set the model value. */
    private _propagateChanges(fallbackValue?: any): void {
        let valueToEmit: any = null;

        if (Array.isArray(this.selected)) {
            valueToEmit = this.selected.map(option => option.value);
        } else {
            valueToEmit = this.selected ? this.selected.value : fallbackValue;
        }

        this._onChange(valueToEmit);
        this.change.emit(new AlloyDropdownChange(this, valueToEmit));
    }

    /** Records option IDs to pass to the aria-owns property. */
    private _setOptionIds() {
        this._optionIds = this.options.map(option => option.id).join(' ');
    }

    /**
     * Sets the `multiple` property on each option. The promise is necessary
     * in order to avoid Angular errors when modifying the property after init.
     */
    private _setOptionMultiple() {
        if (this.multiple) {
            Promise.resolve(null).then(() => {
                this.options.forEach(option => option.multiple = this.multiple);
            });
        }
    }

    /**
     * Must set the width of the selected option's value programmatically
     * because it is absolutely positioned and otherwise will not clip
     * overflow. The selection arrow is 9px wide, add 4px of padding = 13
     */
    private _setValueWidth() {
        this._selectedValueWidth = this._triggerWidth - 13;
    }

    /**
     * Focuses the selected item. If no option is selected, it will focus
     * the first item instead.
     */
    private _focusCorrectOption(): void {
        if (this._selectionModel.isEmpty()) {
            this._keyManager.setFirstItemActive();
        } else {
            this._keyManager.setActiveItem(this._getOptionIndex(this._selectionModel.selected[0])!);
        }
    }

    /** Focuses the select element. */
    focus(): void {
        this.elementRef.nativeElement.focus();
    }

    /** Gets the index of the provided option in the option list. */
    private _getOptionIndex(option: AlloyOption): number | undefined {
        return this.options.reduce((result: number, current: AlloyOption, index: number) => {
            return result === undefined ? (option === current ? index : undefined) : result;
        }, undefined);
    }

    /** Calculates the scroll position and x- and y-offsets of the overlay panel. */
    private _calculateOverlayPosition(): void {
        const items = this._getItemCount();
        let panelHeight = items * SELECT_ITEM_HEIGHT;
        let scrollContainerHeight = items * SELECT_ITEM_HEIGHT;
        if (this._filterable || this._multiple) {
            panelHeight += SELECT_ITEM_HEIGHT;
            scrollContainerHeight += SELECT_ITEM_HEIGHT;
        }
        const viewportRect = this._viewportRuler.getViewportRect();
        if (panelHeight > viewportRect.height) {
            const remainder = viewportRect.height % SELECT_ITEM_HEIGHT;
            panelHeight = viewportRect.height - remainder;
        }
        this._maxPanelHeight = panelHeight + SELECT_PANEL_VIEWPORT_PADDING + 'px';

        // The farthest the panel can be scrolled before it hits the bottom
        const maxScroll = scrollContainerHeight - panelHeight;

        if (this._selectionModel.hasValue()) {
            let selectedOptionOffset = this._getOptionIndex(this._selectionModel.selected[0])!;

            // We must maintain a scroll buffer so the selected option will be scrolled to the
            // center of the overlay panel rather than the top.
            const scrollBuffer = panelHeight / 2;
            this._scrollTop = this._calculateOverlayScroll(selectedOptionOffset, scrollBuffer, maxScroll);
            this._offsetY = this._calculateOverlayOffsetY(selectedOptionOffset, scrollBuffer, maxScroll);
        } else {
            // If no option is selected, the panel centers on the first option. In this case,
            // we must only adjust for the height difference between the option element
            // and the trigger element, then multiply it by -1 to ensure the panel moves
            // in the correct direction up the page.
            this._offsetY = (SELECT_ITEM_HEIGHT - SELECT_TRIGGER_HEIGHT) / 2 * -1;
        }
        this._checkOverlayWithinViewport(maxScroll, panelHeight);
    }

    /**
     * Checks that the attempted overlay position will fit within the viewport.
     * Check material-select code to see how they adjust the scroll position and the associated
     * y-offset so the panel can open fully on-screen.
     * This implementation attempts to comply with the Caranu specs
     */
    private _checkOverlayWithinViewport(maxScroll: number, panelHeight: number): void {
        const viewportRect = this._viewportRuler.getViewportRect();
        const triggerRect = this._getTriggerRect();

        const topSpaceAvailable = triggerRect.top - SELECT_PANEL_VIEWPORT_PADDING;
        const bottomSpaceAvailable =
            viewportRect.height - triggerRect.bottom - SELECT_PANEL_VIEWPORT_PADDING;

        const panelHeightTop = Math.abs(this._offsetY);
        const panelHeightBottom = panelHeight - panelHeightTop - triggerRect.height;
        if( panelHeight  < bottomSpaceAvailable ){
            this._offsetY = this._getTriggerRect().height;
        } else if (panelHeight < topSpaceAvailable) {
            this._offsetY = -panelHeight - SELECT_PANEL_VIEWPORT_PADDING;
        } else if (panelHeightBottom > bottomSpaceAvailable) {
            this._adjustPanelUp(panelHeightBottom, bottomSpaceAvailable);
        } else if (panelHeightTop > topSpaceAvailable) {
            this._adjustPanelDown(panelHeightTop, topSpaceAvailable, maxScroll);
        } else {
            this._transformOrigin = this._getOriginBasedOnOption();
        }
    }

    /**
     * Calculates the scroll position of the select's overlay panel.
     *
     * Attempts to center the selected option in the panel. If the option is
     * too high or too low in the panel to be scrolled to the center, it clamps the
     * scroll position to the min or max scroll positions respectively.
     */
    _calculateOverlayScroll(selectedIndex: number, scrollBuffer: number,
        maxScroll: number): number {
        const optionOffsetFromScrollTop = SELECT_ITEM_HEIGHT * selectedIndex;
        const halfOptionHeight = SELECT_ITEM_HEIGHT / 2;

        // Starts at the optionOffsetFromScrollTop, which scrolls the option to the top of the
        // scroll container, then subtracts the scroll buffer to scroll the option down to
        // the center of the overlay panel. Half the option height must be re-added to the
        // scrollTop so the option is centered based on its middle, not its top edge.
        const optimalScrollPosition = optionOffsetFromScrollTop - scrollBuffer + halfOptionHeight;
        return clampValue(0, optimalScrollPosition, maxScroll);
    }

    /** Returns the aria-label of the select component. */
    get _ariaLabel(): string | null {
        // If an ariaLabelledby value has been set, the select should not overwrite the
        // `aria-labelledby` value by setting the ariaLabel to the placeholder.
        return this.ariaLabelledby ? null : this.ariaLabel || this.placeholder;
    }

    /**
     * Sets the x-offset of the overlay panel in relation to the trigger's top start corner.
     * This must be adjusted to align the selected option text over the trigger text when
     * the panel opens. Will change based on LTR or RTL text direction. Note that the offset
     * can't be calculated until the panel has been attached, because we need to know the
     * content width in order to constrain the panel within the viewport.
     */
    private _calculateOverlayOffsetX(): void {
        const viewportRect = this._viewportRuler.getViewportRect();
        const panelContainer = this.overlayDir.overlayRef.overlayElement.querySelector('.dropdown-pane');
        let offsetX = 0;
        const rightOverflow = this._triggerRect.left + panelContainer.clientWidth - viewportRect.width;

        if (rightOverflow > 0) {
          offsetX -= rightOverflow + SELECT_PANEL_VIEWPORT_PADDING;
        }
        // Set the offset directly in order to avoid having to go through change detection and
        // potentially triggering "changed after it was checked" errors.
        this.overlayDir.offsetX = offsetX;
        this.overlayDir.overlayRef.updatePosition();
    }

    /**
     * Calculates the y-offset of the select's overlay panel in relation to the
     * top start corner of the trigger. It has to be adjusted in order for the
     * selected option to be aligned over the trigger when the panel opens.
     */
    private _calculateOverlayOffsetY(selectedIndex: number, scrollBuffer: number,
        maxScroll: number): number {
        let optionOffsetFromPanelTop: number;

        if (this._scrollTop === 0) {
            optionOffsetFromPanelTop = selectedIndex * SELECT_ITEM_HEIGHT;
        } else if (this._scrollTop === maxScroll) {
            const firstDisplayedIndex = this._getItemCount() - SELECT_MAX_OPTIONS_DISPLAYED;
            const selectedDisplayIndex = selectedIndex - firstDisplayedIndex;

            // Because the panel height is longer than the height of the options alone,
            // there is always extra padding at the top or bottom of the panel. When
            // scrolled to the very bottom, this padding is at the top of the panel and
            // must be added to the offset.
            optionOffsetFromPanelTop =
                selectedDisplayIndex * SELECT_ITEM_HEIGHT + SELECT_PANEL_PADDING_Y;
        } else {
            // If the option was scrolled to the middle of the panel using a scroll buffer,
            // its offset will be the scroll buffer minus the half height that was added to
            // center it.
            optionOffsetFromPanelTop = scrollBuffer - SELECT_ITEM_HEIGHT / 2;
        }

        // The final offset is the option's offset from the top, adjusted for the height
        // difference, multiplied by -1 to ensure that the overlay moves in the correct
        // direction up the page.
        return optionOffsetFromPanelTop * -1 - SELECT_OPTION_HEIGHT_ADJUSTMENT;
    }

    /** Adjusts the overlay panel up to fit in the viewport. */
    private _adjustPanelUp(panelHeightBottom: number, bottomSpaceAvailable: number) {
        const distanceBelowViewport = panelHeightBottom - bottomSpaceAvailable;

        // Scrolls the panel up by the distance it was extending past the boundary, then
        // adjusts the offset by that amount to move the panel up into the viewport.
        this._scrollTop -= distanceBelowViewport;
        this._offsetY -= distanceBelowViewport;
        this._transformOrigin = this._getOriginBasedOnOption();

        // If the panel is scrolled to the very top, it won't be able to fit the panel
        // by scrolling, so set the offset to 0 to allow the fallback position to take
        // effect.
        if (this._scrollTop <= 0) {
            this._scrollTop = 0;
            // this._offsetY = 0;
            this._transformOrigin = `50% bottom 0px`;
        }
    }

    /** Adjusts the overlay panel down to fit in the viewport. */
    private _adjustPanelDown(panelHeightTop: number, topSpaceAvailable: number,
        maxScroll: number) {
        const distanceAboveViewport = panelHeightTop - topSpaceAvailable;

        // Scrolls the panel down by the distance it was extending past the boundary, then
        // adjusts the offset by that amount to move the panel down into the viewport.
        this._scrollTop += distanceAboveViewport;
        this._offsetY += distanceAboveViewport;
        this._transformOrigin = this._getOriginBasedOnOption();

        // If the panel is scrolled to the very bottom, it won't be able to fit the
        // panel by scrolling, so set the offset to 0 to allow the fallback position
        // to take effect.
        if (this._scrollTop >= maxScroll) {
            this._scrollTop = maxScroll;
            // this._offsetY = 0;
            this._transformOrigin = `50% top 0px`;
            return;
        }
    }

    /** Sets the transform origin point based on the selected option. */
    private _getOriginBasedOnOption(): string {
        const originY =
            Math.abs(this._offsetY) - SELECT_OPTION_HEIGHT_ADJUSTMENT + SELECT_ITEM_HEIGHT / 2;
        return `50% ${originY}px 0px`;
    }

    /** Handles the user pressing the arrow keys on a closed select.  */
    private _handleArrowKey(event: KeyboardEvent): void {

        // We may want this extra security but with the "pointer-events: none" the widget doesn't response to any mouse/touch/keyboard event
        // if (this.disabled || this.readonly) {
        //     return;
        // }

        if (this._multiple) {
            event.preventDefault();
            this.open();
        } else {
            const prevActiveItem = this._keyManager.activeItem;

            // Cycle though the select options even when the select is closed,
            // matching the behavior of the native select element.
            // TODO(crisbeto): native selects also cycle through the options with left/right arrows,
            // however the key manager only supports up/down at the moment.
            this._keyManager.onKeydown(event);

            const currentActiveItem = this._keyManager.activeItem as AlloyOption;

            if (currentActiveItem !== prevActiveItem) {
                this._clearSelection();
                this._setSelectionByValue(currentActiveItem.value, true);
                this._propagateChanges();
            }
        }
    }

    /** Calculates the amount of items in the select. This includes options and group labels. */
    private _getItemCount(): number {
        return this.options.length;
    }
}

/** Clamps a value n between min and max values. */
function clampValue(min: number, n: number, max: number): number {
    return Math.min(Math.max(min, n), max);
}
