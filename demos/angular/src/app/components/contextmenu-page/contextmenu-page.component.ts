import { Component, AfterContentInit, } from '@angular/core';

@Component({
    selector: 'app-contextmenu-page',
    templateUrl: './contextmenu-page.component.html'
})
export class ContextmenuPageComponent implements AfterContentInit {
    items: any[] = [
        {
            name: 'Item 1'
        },
        {
            name: 'Item 2'
        },
        {
            name: 'Item 3'
        }
    ];
    isEnabled = true;
    isVisible = false;

    ngAfterContentInit() {
    }

    // callback function when menu items clicked
    onContextMenuItemClick($event: any): void {
        console.log('onContextMenuItemClick', $event);
    }

    onEnabled(): void {
        this.isEnabled = !this.isEnabled;
    }

    onVisible(): void {
        this.isVisible = !this.isVisible;
    }


}
