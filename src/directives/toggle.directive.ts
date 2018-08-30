import {
    Directive, Input, HostListener, HostBinding, Output, EventEmitter
} from '@angular/core';

@Directive({
    selector: `
        [toggle],
        button [alloy] [switch]`  // TODO: remove when angular adds way to dynamically add directives
})

/**
 * This directive can be used to add boolean toggle logic to an element.
 * By default it will toggle based on clicks injecting class: `alloy-toggled` when true.
 * TODO: AJM: This will need a toggle-group directive to manage exclusivity
 */
export class AlloyToggleDirective {
    private toggled = false;
    @HostBinding('class.alloy-toggled') @Input('toggle')
    get isToggled() { return this.toggled; }
    set isToggled(value: boolean) { this.toggled = value; }
    @Output() toggle: EventEmitter<boolean> = new EventEmitter();

    @HostListener('click')
    onclick() {
        this.toggled = !this.toggled;
        this.toggle.emit(this.toggled);
    }
}
