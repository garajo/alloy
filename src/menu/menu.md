# Menu Component

`AlloyMenu` is used to create custom dropdown menus. `AlloySubmenu` is used to create submenus within an Alloy menu and `AlloyMenuItem` is used to create items that a user can register clicks to within a menu or submenu.

## Basic usage:

```html
<alloy-menu alloyLabel="Menu">
    <alloy-menu-item alloyLabel="Item 1" (click)="action1()"></alloy-menu-item>
    <alloy-menu-item alloyLabel="Item 2" (click)="action2()"></alloy-menu-item>
    <alloy-submenu alloyLabel="Submenu">
        <alloy-menu-item alloyLabel="Item 3" (click)="action3()"></alloy-menu-item>
        <alloy-menu-item alloyLabel="Item 4" (click)="action4()"></alloy-menu-item>
    </alloy-submenu>
</alloy-menu>
```

## Options:

The following can be used on the alloy menu, submenu, and items:
* `disabled` to make the element unclickable/unable to open
* `alloyLabel` (part of identity directive) to assign labels to elements
* `alloyIcon` (part of identity directive) to assign icons to elements

`hr` elements can also be inserted to create a divider between items:
```html
<alloy-menu alloyLabel="Menu">
    <alloy-menu-item alloyLabel="Item 1"></alloy-menu-item>
    <hr/>
    <alloy-menu-item alloyLabel="Item 2"></alloy-menu-item>
</alloy-menu>
```

Custom styling can be applied to the toolbar button within the menu by applying styling or classes to the menu itself:
```html
<alloy-menu alloyLabel="Menu" style="width:100px">
    <alloy-menu-item alloyLabel="Item 1"></alloy-menu-item>
</alloy-menu>
```

The menu can also be attached to another element so it opens when that element is clicked if unique styling is desired:
```html
<button alloy alloyLabel="Button" #buttonRef></button>
<alloy-menu [originRef]="buttonRef">
    <alloy-menu-item alloyLabel="Item 1"></alloy-menu-item>
    <alloy-menu-item alloyLabel="Item 1"></alloy-menu-item>
</alloy-menu>
```

The `isOpen` event can be used on the menu to determine when the menu is open. This can be helpful for custom styling of the element that the menu is attached to.
```html
<button alloy alloyLabel="Button" #buttonRef [toggle]="menuOpen"></button>
<alloy-menu [originRef]="buttonRef" (isOpen)="menuOpen=$event">
    <alloy-menu-item alloyLabel="Item 1"></alloy-menu-item>
    <alloy-menu-item alloyLabel="Item 1"></alloy-menu-item>
</alloy-menu>
```

## Behavior

The menu will attempt to open below and expand to the right. If there is not enough space it will attempt to open up and/or to the left. Submenus will open in the same direction (left/right) as the the menu unless there is not enough space in which case it will open the other direction.

Hovering over a submenu for long enough will cause it to open and will not close unless you hover over a different item for enough time. This is to prevent the submenu from closing when the mouse is crossing over other items to reach an item in the submenu.

When an item is clicked the menu will close.