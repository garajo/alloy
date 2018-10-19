import { Component, Input, ElementRef, ViewChild, ContentChildren, QueryList,
    AfterViewInit, Optional, Host, EventEmitter, Output, HostListener, Renderer2 } from '@angular/core';
import { AlloyIdentityDirective } from '../directives/identity.directive';
import { OverlayOrigin } from '@angular/cdk/overlay';


@Component({
    selector: 'alloy-menu-item',
    template: `
        <li>
            <button #button (mouseover)="mouseItem()" (click)="clickButton()" [disabled]="disabled">{{label}}</button>
        </li>`
})
export class AlloyMenuItem implements AfterViewInit {
    private _disabled = false;
    @Input('disabled')
    set disabled(val: boolean) {
        if (val === false) {
            this._disabled = false;
        } else {
            this._disabled = true;
        }
    }
    get disabled() {
        return this._disabled;
    }

    @ViewChild('button') buttonEl: ElementRef;

    constructor(protected el: ElementRef,
        protected renderer: Renderer2,
        @Host() @Optional() private identityDirective: AlloyIdentityDirective) {
    }

    // Will be set by parent menu to keep track of selected/hovered menu item
    mouseItem() {}

    ngAfterViewInit() {
        // Reassign identity directive to button element
        if (this.identityDirective && this.buttonEl) {
            this.identityDirective.assignTo(this.buttonEl.nativeElement);
        }
    }

    clickButton() {
        // Dispatch event that propagates to menu knows when to close
        this.buttonEl.nativeElement.dispatchEvent(new Event('menuClick', { bubbles: true }));
    }
}

@Component({
    selector: 'alloy-submenu',
    template: `
        <li>
            <button (mouseover)="mouseItem()" #button class="submenu" [ngClass]="{'hover': showHover()}"
                [disabled]="disabled">{{label}}</button>
            <dropdown-overlay-menu (mouseover)="mouseItem()" *ngIf="showOverlayWrap()" side="true" [zIndex]="zIndex">
                <ng-content></ng-content>
            </dropdown-overlay-menu>
        </li>`
})
export class AlloySubmenu extends AlloyMenuItem implements AfterViewInit {
    public zIndex = 0;

    @ContentChildren(AlloyMenuItem) menuItems: QueryList<AlloyMenuItem>;
    @ContentChildren(AlloySubmenu) submenuItems: QueryList<AlloySubmenu>;

    public mouseTimeout;
    public subMenuIndex;
    public subMenuIndexImm;

    private mouseItemMenu(identifier) {
        // Set immediate index to update item that shows hover
        this.subMenuIndexImm = identifier;
        // Restart the timer for when the menu index changes to update which submenu is open
        // This allows a user to mouse over multiple items while moving mouse to a submenu without the submenu closing
        clearTimeout(this.mouseTimeout);
        this.mouseTimeout = setTimeout(() => { this.subMenuIndex = identifier; }, 300);
    }

    ngAfterViewInit() {
        super.ngAfterViewInit();
        // Set functions for each submenu so it knows when to open, update current index, and show it is hovered
        this.submenuItems.forEach((submenu) => {
            submenu.mouseItem = () => { this.mouseItemMenu(submenu); };
            submenu.showOverlay = () => this.subMenuIndex === submenu;
            submenu.showHover = () => this.subMenuIndexImm === submenu;
            submenu.zIndex = this.zIndex + 1;
        });
        // Set function to update index for each menu item
        this.menuItems.forEach((item) => {
            item.mouseItem = () => { this.mouseItemMenu(item); };
        });
    }

    // Set by parent when submenu should be opened
    showOverlay() {
        return false;
    }

    // Set by parent when submenu should show it is hovered
    showHover() {
        return false;
    }

    // Wrapper so it can be overriden by inherited menu component
    showOverlayWrap() {
        if (!this.showOverlay()) {
            this.subMenuIndex = null;
            this.subMenuIndexImm = null;
        }
        return this.showOverlay();
    }
}


@Component({
    selector: 'alloy-menu',
    templateUrl: 'menu.component.html'
})
export class AlloyMenu extends AlloySubmenu implements AfterViewInit {
    private _isOpen = false;

    // tslint:disable-next-line:no-output-rename
    @Output('isOpen') isOpenOut = new EventEmitter<boolean>();
    set isOpen(val: boolean) {
        if (this.overlayOrigin) {
            this._isOpen = val;
        } else {
            this._isOpen = false;
        }
        this.isOpenOut.emit(this._isOpen);
    }
    get isOpen() {
        return this._isOpen;
    }

    // Used to keep track of what element overlay is attached to
    public overlayOrigin: OverlayOrigin;
    public externalOrigin = false;

    // Set external element to attach overlay to
    @Input('originRef')
    set originRef(ref: HTMLElement) {
        this.overlayOrigin = new OverlayOrigin(new ElementRef(ref));
        ref.addEventListener('click', () => {
            this.isOpen = !this.isOpen;
        });
        this.externalOrigin = true;
    }

    // Close menu when window scrolls
    @HostListener('window:scroll')
    closeMenu() {
        this.isOpen = false;
    }

    ngAfterViewInit() {
        super.ngAfterViewInit();
        if (!this.externalOrigin) {
            // If no external origin set to button within component
            this.overlayOrigin = new OverlayOrigin(this.buttonEl);

            // Apply all classes and styles from select element to button element
            let originalClasses = this.el.nativeElement.className as string;
            let originalStyle = this.el.nativeElement.attributes['style'];
            if (originalClasses) {
                originalClasses.split(' ').forEach(element => {
                    this.renderer.addClass(this.buttonEl.nativeElement, element);
                    this.renderer.removeClass(this.el.nativeElement, element);
                });
            }
            if (originalStyle) {
                this.renderer.setAttribute(this.buttonEl.nativeElement, originalStyle.name, originalStyle.value);
                this.renderer.removeAttribute(this.el.nativeElement, originalStyle.name);
            }
        }
    }

    showOverlayWrap() {
        if (!this.isOpen) {
            this.subMenuIndex = null;
            this.subMenuIndexImm = null;
        }
        return this.isOpen;
    }
}
