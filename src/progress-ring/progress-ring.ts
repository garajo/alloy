import {
    Component, Input,
} from '@angular/core';

// TODO: AJM: Need upgraded ng/ts for this enum to work.
// enum Styles {
//     Small = 'ring-small',
//     Medium = 'ring-medium',
//     Large = 'ring-large',
// }
type Styles = 'ring-icon' | 'ring-small' | 'ring-medium' | 'ring-large';
const Styles = {
    Icon: 'ring-icon' as Styles,
    Small: 'ring-small' as Styles,
    Medium: 'ring-medium' as Styles,
    Large: 'ring-large' as Styles,
};
@Component({
    selector: `alloy-progress-ring`,
    // styleUrls: ['progress-ring.scss'],  //TODO: Broken in alloy right now
    templateUrl: 'progress-ring.html'
})
export class AlloyProgressRing {
    Arr = Array;    // Ghetto ngRepeat
    // TODO: AJM: With css custom properties we could potentially set styling dynamically

    public balls = 8;
    public ringStyle = Styles.Small;

    @Input() set icon(value: any) {
        if (value !== false) {
            this.ringStyle = Styles.Icon;
            this.balls = 5;     // for now copy of scss
        }
    }

    @Input() set small(value: any) {
        if (value !== false) {
            this.ringStyle = Styles.Small;
            this.balls = 5;     // for now copy of scss
        }
    }

    @Input() set medium(value: any) {
        if (value !== false) {
            this.ringStyle = Styles.Medium;
            this.balls = 8;     // for now copy of scss
        }
    }

    @Input() set large(value: any) {
        if (value !== false) {
            this.ringStyle = Styles.Large;
            this.balls = 8;     // for now copy of scss
        }
    }

    constructor() {}
}
