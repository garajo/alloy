# Alloy Context menu

`<alloy-contextmenu>`

## Usage example
```ts
<ul>
    <li *ngFor="let item of items" [alloyContextMenu]="basicMenu" [alloyContextMenuData]="item">
        Right Click: {{item?.name}}
    </li>
</ul>
}
```

### Template
```ts
<alloy-contextmenu #basicMenu>
    <ng-template contextMenuItem let-item [enabled]="isEnabled" (execute)="onClick($event)">
        Add {{ item?.name }}
    </ng-template>
    <ng-template contextMenuItem divider="true"></ng-template>
    <ng-template contextMenuItem let-item [enabled]="isEnabled" (execute)="onClick($event)">
        Copy {{ item?.name }}
    </ng-template>
    <ng-template contextMenuItem let-item [enabled]="isEnabled" (execute)="onClick($event)">
        Delete {{ item?.name }}
    </ng-template>
    <ng-template contextMenuItem [visible]="isVisible" (execute)="onClick($event)">
        You cannot see this if visible is False
    </ng-template>
</alloy-contextmenu>
```

### Input parameters
Configuration settings for `AlloyDialogConfig`
* `divider?: boolean`     -  (Optional) Renders a divider between context items.
* `enabled?: boolean`     -  (Optional) Toggle enabled for selection.
* `visible?: boolean`     -  (Optional) Renders display true/false.

### AlloyContextMenuAPI
```ts
attachListener(target: any, contextMenuData: any, customContextMenuTemplate?: AlloyContextMenuComponent): void;
```
If you cannot access DOM element of the `target`, you can attach a listener with `api.attachListener` to listen for contextmenu event manually. If `alloy-contextmenu` template is in a different component, you need to set your contextMenuTemplate.

Note: For a real-time usage example of context menu, refer context-menu component that is built leveraging the `<alloy-contextmenu>`.
