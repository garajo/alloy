import {
    Directive,
    ElementRef,
    Input,
    Renderer2,
    AfterViewInit,
    OnDestroy,
    HostBinding,
} from '@angular/core';
import { FocusMonitor } from '@angular/cdk/a11y';

// TODO: AJM: Need upgraded ng/ts for this enum to work.
// enum Styles {
//     Standard = 'standard',
//     Default = 'default',
//     Quickaccess = 'quickaccess',
//     Toolbar = 'toolbar'
// }
type Styles = 'standard' | 'default' | 'quickaccess' | 'toolbar';
const Styles = {
    get Standard(): Styles { return 'standard'; },
    get Default(): Styles { return 'default'; },
    get Quickaccess(): Styles { return 'quickaccess'; },
    get Toolbar(): Styles { return 'toolbar'; }
}
@Directive({
    selector: `button [alloy]`
})
export class AlloyButtonDirective implements AfterViewInit, OnDestroy {

    private renderer: Renderer2;
    private elementRef: ElementRef;
    // Default mode: Standard
    private currentStyle = Styles.Standard;

    @HostBinding(`class.alloy-button-${Styles.Standard}`) @Input(Styles.Standard)
    get isStandard() { return this.currentStyle === Styles.Standard; }
    set isStandard(value: any) {
        if (value !== false) {
            this.currentStyle = Styles.Standard;
        }
    }

    @HostBinding(`class.alloy-button-${Styles.Default}`) @Input(Styles.Default)
    get isDefault() { return this.currentStyle === Styles.Default; }
    set isDefault(value: any) {
        if (value !== false) {
            this.currentStyle = Styles.Default;
        }
    }

    @HostBinding(`class.alloy-button-${Styles.Quickaccess}`) @Input(Styles.Quickaccess)
    get isQuickaccess() { return this.currentStyle === Styles.Quickaccess; }
    set isQuickaccess(value: any) {
        if (value !== false) {
            this.currentStyle = Styles.Quickaccess;
        }
    }

    @HostBinding(`class.alloy-button-${Styles.Toolbar}`) @Input(Styles.Toolbar)
    get isToolbar() { return this.currentStyle === Styles.Toolbar; }
    set isToolbar(value: any) {
        if (value !== false) {
            this.currentStyle = Styles.Toolbar;
        }
    }

    constructor(
        elementRef: ElementRef,
        renderer: Renderer2,
        private focusMonitor: FocusMonitor,
      ) {
        this.elementRef = elementRef;
        this.renderer = renderer;
    }

    ngAfterViewInit() {
        this.focusMonitor.monitor(this.elementRef.nativeElement, this.renderer, false);
    }

    ngOnDestroy() {
        this.focusMonitor.stopMonitoring(this.elementRef.nativeElement);
    }

    /**
     * Due to 'program' bug in focusMonitor we reroute programmatic as 'keyboard' to allow focus ring
     */
    focus(): void {
        this.focusMonitor.focusVia(this.elementRef.nativeElement, 'keyboard');
    }
}
