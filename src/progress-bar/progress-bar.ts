import { Component, Input, HostBinding } from '@angular/core';

@Component({
    selector: `alloy-progress-bar`,
    templateUrl: 'progress-bar.html'
})
export class AlloyProgressBar {
    Arr = Array;    // Ghetto ngRepeat
    public balls = 5;   // Sync with the scss!

    /**
     * Current value of the progress bar.
     */
    @Input() public value: number;

    // AJM: Angular clobbers attributes, so we need to apply a class
    @HostBinding('class.indeterminate-bar') get isIndeterminate() { return isNaN(this.value); }
    @HostBinding('class.determinate-bar') get isDeterminate() { return !isNaN(this.value); }

    constructor() {}

    /** Transforms the width of the progress indicator */
    // tslint:disable-next-line:no-unused-variable
    private progressTransform() {
        const scale = Math.min(this.value, 100) / 100;
        return { transform: `scaleX(${scale})` };
    }
}
