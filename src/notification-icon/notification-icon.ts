import {
    Input,
    Component,
    ViewEncapsulation
} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'alloy-notification-icon',
    templateUrl: './notification-icon.html',
    encapsulation: ViewEncapsulation.None
})
export class AlloyNotificationIcon {

    /** Message count */
    private _count: number;
    private _height: number;
    private _width: number;
    public messageCount: string;

    /** Number of messages to be shown */
    @Input()
    get count() { return this._count; }
    set count(value: number) {
        if (value) {
            this._count = value;
        } else {
            this._count = 0;
        }
        this.messageCount = this._count.toString();
        // If more than 99 messages show '...' on icon.
        if (value > 99 || this.messageCount.length > 2) {
            this.messageCount = '...';
        }
    }

    /**Height of the icon in px */
    @Input()
    get height() { return this._height; }
    set height(value: number) {
        this._height = value;
    }

    /**Width of the icon in px */
    @Input()
    get width() { return this._width; }
    set width(value: number) {
        this._width = value;
    }

    // Return a boolean if the count is 0.
    isCountZero() {
        return (this.messageCount === '0');
    }

    // Change the y value if the text is '...'
    returnYvalue() {
        if (this.messageCount === '...') {
            return 11;
        } else {
            return 14;
        }
    }
}
