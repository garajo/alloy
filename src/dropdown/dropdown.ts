import {
    Input,
    QueryList,
    Component,
    ElementRef,
    ViewChild,
    ContentChildren,
    AfterContentInit,
    ViewEncapsulation
} from '@angular/core';

import { AlloyOption, AlloyOptionSelectionChange } from '../core/option/index';

@Component({
    moduleId: module.id,
    selector: 'alloy-dropdown',
    templateUrl: './dropdown.html',
    styleUrls: ['./dropdown.scss'],
    encapsulation: ViewEncapsulation.None,
    exportAs: 'AlloyDropdown',
})
export class AlloyDropdown implements AfterContentInit{
    /** Whether or not the overlay panel is open. */
    private _panelOpen = false;

    /**
     * The width of the trigger. Must be saved to set the min width of the overlay panel
     * and the width of the selected value.
     */
    _triggerWidth: number;

    /** Trigger that opens the select. */
    @ViewChild('trigger') trigger: ElementRef;

    // FOR WHATEVER REASON CAUSES
    // rror: Cannot read property 'module' of undefined
    //
    /** All of the defined select options. */
    @ContentChildren(AlloyOption, {descendants: true }) options: QueryList<AlloyOption>;

    @Input() disabled: boolean;

    constructor(public _elementRef: ElementRef) { }

    ngAfterContentInit() {
        // this._initKeyManager();


        console.log(this.options);

        // this._changeSubscription = startWith.call(this.options.changes, null).subscribe(() => {
        //     this._resetOptions();

        //     if (this._control) {
        //         // Defer setting the value in order to avoid the "Expression
        //         // has changed after it was checked" errors from Angular.
        //         Promise.resolve(null).then(() => this._setSelectionByValue(this._control.value));
        //     }
        // });
    }

    /** Calculates the scroll position and x- and y-offsets of the overlay panel. */
    private _calculateOverlayPosition(): void { }

    /**
     * Sets the width of the trigger element. This is necessary to match
     * the overlay width to the trigger width.
     */
    private _setTriggerWidth(): void {
        this._triggerWidth = this._getTriggerRect().width;
    }

    private _getTriggerRect(): ClientRect {
        return this.trigger.nativeElement.getBoundingClientRect();
    }

    /** Whether or not the overlay panel is open. */
    get panelOpen(): boolean {
        return this._panelOpen;
    }

    /** Focuses the select element. */
    focus(): void {
        this._elementRef.nativeElement.focus();
    }

    /** Toggles the overlay panel open or closed. */
    toggle(): void {
        this.panelOpen ? this.close() : this.open();
    }


    /** Opens the overlay panel. */
    open(): void {
        // if (this.disabled || !this.options.length) {
        if (this.disabled) {
            return;
        }

        if (!this._triggerWidth) {
            this._setTriggerWidth();
        }

        this._calculateOverlayPosition();
        this._panelOpen = true;
    }

    /** Closes the overlay panel and focuses the host element. */
    close(): void {
        if (this._panelOpen) {
            this._panelOpen = false;


            this.focus();
        }
    }
}
