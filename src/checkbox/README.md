# Alloy Checkbox

`<alloy-checkbox>` is a form control for adding a checkbox, similar to the native
`<input type="checkbox">` element.

In your template, create an `alloy-checkbox` element. Note that you can disable a checkbox by adding the `disabled` boolean attribute or
binding to it. Similarly you can check a checkbox using the `checked` boolean attribute or binding to it.

*my-comp.html*
```html
<alloy-checkbox [label]="placeholder" [disabled]="disabled" [checked]="checked">
</alloy-checkbox>
```

### Label binding

You can bind a label to a dynamic value by adding `[label]` binding.

*my-comp.html*
```html
<alloy-checkbox [label]="placeholder" [disabled]="disabled" [checked]="checked">
</alloy-checkbox>
```

### Icon binding

You can bind an icon to a dynamic value by adding `[icon]` binding.

*my-comp.html*
```html
<alloy-checkbox [icon]="iconSrc.svg" [disabled]="disabled" [checked]="checked">
</alloy-checkbox>
```

### Mixed binding

You can bind both a label as well as an icon to the checkbox by adding both `[label]` and `[icon]` bindings.
The icon will appear to the left of the label.

*my-comp.html*
```html
<alloy-checkbox [icon]="iconSrc.svg" [label]="placeholder" [disabled]="disabled" [checked]="checked">
</alloy-checkbox>
```