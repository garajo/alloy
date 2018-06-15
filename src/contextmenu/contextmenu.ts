// tslint:disable-next-line:max-line-length
import { Component, ViewEncapsulation, Host, Directive, Renderer2, Input, HostListener } from '@angular/core';
import { ContextMenuComponent, ContextMenuService } from 'ngx-contextmenu';

@Component({
    encapsulation: ViewEncapsulation.None,
    // tslint:disable-next-line:component-selector
    selector: 'alloy-contextmenu',
    styles: [`
    .ngx-contextmenu.cdk-overlay-pane {
      position: absolute;
      pointer-events: auto;
      box-sizing: border-box;
    }
  `],
    template: ` `
})
// tslint:disable-next-line:component-class-suffix
export class AlloyContextMenuComponent extends ContextMenuComponent {
    // Intended to be empty for content wrapping
}

/*================================
* Basic alloyContextMenu
* ================================
* When using basic contextmenu binding method:
*
*     <element [alloyContextMenu]="basicMenu">Basic Alloy Context Menu</element>
*     <alloy-contextmenu #basicMenu>
*          <ng-template contextMenuItem>Basic right-click binding</ng-template>
*     </alloy-contextmenu>
*/
@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[alloyContextMenu]'
})
export class AlloyContextMenuAttachDirective {
    @Input() alloyContextMenu: AlloyContextMenuComponent;
    @Input() alloyContextMenuData: any;

    constructor(private contextMenuService: ContextMenuService, private renderer: Renderer2) {
        this.renderer.setAttribute(document.body, 'oncontextmenu', 'return false');
    }

    @HostListener('contextmenu', ['$event'])
    onContextMenu(event: MouseEvent): void {
        this.contextMenuService.show.next({
            contextMenu: this.alloyContextMenu,
            event,
            item: this.alloyContextMenuData
        });
        event.preventDefault();
        event.stopPropagation();
    }

    // Added support for ag-grid scroll event
    @HostListener('bodyScroll', ['$event'])
    onBodyScroll($event) {
        this.contextMenuService.closeAllContextMenus();
    }

    // Added support for attached component scroll event
    @HostListener('scroll' , ['$event'])
    onElementScroll($event) {
        this.contextMenuService.closeAllContextMenus();
    }

    @HostListener('document:scroll', ['$event'])
    onWindowScroll(event) {
        // console.log('on window scroll');
    }

}

/*====
*  Manual Contextmenu binding event/API
* ====
* Additional logics or custom controls can be added here.
*/
@Directive({
    // tslint:disable-next-line:directive-selector
    selector: 'alloy-contextmenu',
    exportAs: 'contextMenuDirective'
})
// tslint:disable-next-line:directive-class-suffix
export class AlloyContextMenu {
    api = new AlloyContextMenuAPI(this.contextMenuTemplate, this.contextMenuService, this.renderer);
    constructor(
        @Host() private contextMenuTemplate: AlloyContextMenuComponent,
        private contextMenuService: ContextMenuService,
        private renderer: Renderer2
    ) {
        this.renderer.setAttribute(document.body, 'oncontextmenu', 'return false');
    }
}

export class AlloyContextMenuAPI {
    constructor(
        @Host() private contextMenuTemplate: AlloyContextMenuComponent,
        private contextMenuService: ContextMenuService,
        private renderer: Renderer2
    ) { }

    private onContextMenu($event: MouseEvent, contextMenuData: any, customContextMenuTemplate?: AlloyContextMenuComponent): void {
        this.contextMenuService.show.next({
            contextMenu: customContextMenuTemplate || this.contextMenuTemplate,
            event: $event,
            item: contextMenuData
        });
        $event.preventDefault();
        $event.stopPropagation();
    }

    // If you cannot access DOM element of the `target`, you can attach a listener to listen for contextmenu event manually.
    attachListener(target: any, contextMenuData: any, customContextMenuTemplate?: AlloyContextMenuComponent) {
        this.renderer.listen(target, 'contextmenu', (event) => this.onContextMenu(event, contextMenuData, customContextMenuTemplate));
    }
}
