import {
    Directive,
    ElementRef,
    Input,
    Renderer2,
    AfterViewInit,
    OnDestroy,
    HostBinding,
    Optional,
} from '@angular/core';
import { FocusMonitor } from '@angular/cdk/a11y';
import { AlloyToggleDirective } from './toggle.directive';

// TODO: AJM: Need upgraded ng/ts for this enum to work.
// enum Styles {
//     Standard = 'standard',
//     Default = 'default',
//     Quickaccess = 'quickaccess',
//     Toolbar = 'toolbar',
//     Switch = 'switch'
// }
type Styles = 'standard' | 'default' | 'quickaccess' | 'toolbar' | 'switch';
const Styles = {
    Standard: 'standard' as Styles,
    Default: 'default' as Styles,
    Quickaccess: 'quickaccess' as Styles,
    Toolbar: 'toolbar' as Styles,
    Switch: 'switch' as Styles
};
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

    @HostBinding(`class.alloy-button-${Styles.Switch}`) @Input(Styles.Switch)
    get isSwitch() { return this.currentStyle === Styles.Switch; }
    set isSwitch(value: any) {
        if (value !== null) {
            this.currentStyle = Styles.Switch;
        }
        this.toggleDirective.isToggled = value;
    }

    constructor(
        elementRef: ElementRef,
        renderer: Renderer2,
        private focusMonitor: FocusMonitor,
        @Optional() private toggleDirective: AlloyToggleDirective
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
