# Alloy Button

`<alloy-button>` is a form control for adding a button, similar to the native
`<input type="button">` element.

In your template, create an `alloy-button` element. Note that you can disable, select, or hover a button by adding the respective boolean attributes (e.g. disabled, hover, active) or
binding to it. Currently, alloy supports default, standard, quick-access, and toolbar button styling.

*my-comp.html*
```html
<button alloy-button quick-access [disabled]="disabled" [hover]="hovered" [active]="clicked">
</button>
```

### Label binding

You can place a label inside of an alloy button by simply using plain text.

*my-comp.html*
```html
<button alloy-button default>
    My Label
</button>
```

### Icon binding

You can place an icon in a button using the alloy icon directive.

*my-comp.html*
```html
<button alloy-button toolbar>
    <alloy-icon class="my-icon-class"></alloy-icon>
</button>
```

### Mixed binding

You can apply both a label as well as an icon to the button by adding both an icon directive and plain text.
The icon will appear to whichever order of the plain text you add it. The following places the icon to the right
of the label.

*my-comp.html*
```html
<button alloy-button standard>
    My Label
    <alloy-icon class="my-icon-class"></alloy-icon>
</button>
```
