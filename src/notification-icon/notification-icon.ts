import {
    Input,
    Component,
    ViewEncapsulation
} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'alloy-notification-icon',
    templateUrl: './notification-icon.html',
    styleUrls: ['./notification-icon.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AlloyNotificationIcon {

    /** Message count */
    private _count: number;
    private _height: number;
    private _width: number;
    public largeCount: boolean;

    /** Number of messages to be shown */
    @Input()
    get count() { return this._count; }
    set count(value: number) {
        this._count = value;
        // If more than 99 messages show '...' on icon.
        if (value > 99 || value.toString().length > 2) {
            this.largeCount = true;
        } else {
            this.largeCount = false;
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
}
