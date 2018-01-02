import { Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'alloy-switcher',
    templateUrl: './switcher.html'
})

export class AlloySwitcher {
    private _onSwitchStatus = false;
    private _disabled = false;

    @Output() onSwitchListener: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input()
    get onSwitchStatus(): boolean { return this._onSwitchStatus; }
    set onSwitchStatus(value: boolean) {
        this._onSwitchStatus = value;
    }

    @Input()
    get disabled(): boolean { return this._disabled; }
    set disabled(value: boolean) {
        this._disabled = value;
    }

    onSwitch(): void {
        this._onSwitchStatus = !this._onSwitchStatus;
        this.onSwitchListener.emit(this._onSwitchStatus);
    }
}
