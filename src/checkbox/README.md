# Alloy Checkbox

`<alloy-checkbox>` is a form control for adding a checkbox, similar to the native
`<input type="checkbox">` element.

In your template, create an `alloy-checkbox` element. Note that you can disable a checkbox by adding the `disabled` boolean attribute or
binding to it. Similarly you can check a checkbox using the `checked` boolean attribute or binding to it.
Also, checkbox can have other states such as readonly and error state. You can as well specify an error message that is to be shown when the checkbox is in error state, which is shown as a tooltip when hovered on the error icon.
The size of the icon is adjustable through the `size` attribute. Just use numeric values that represents the number of pixels for the dimension of the checkbox and the width and height of the checkbox
will be set to this amount. The checkbox container along with the label and icon will be scaled according to the checkbox size. The default checkbox size is 14px. if the size value is 0, negative, or undefined, the checkbox will keep the default size.

*my-comp.html*
```html
<alloy-checkbox [label]="placeholder" [disabled]="disabled" [checked]="checked" [readonly]="readonly" 
    [size]="size" [errors]="errors" [errorMessage]="errorMessage">
</alloy-checkbox>
```

### Label binding

You can bind a label to a dynamic value by adding `[label]` binding.

*my-comp.html*
```html
<alloy-checkbox [label]="placeholder" [disabled]="disabled" [checked]="checked" [readonly]="readonly" 
    [errors]="errors" [errorMessage]="errorMessage">
</alloy-checkbox>
```

### Icon binding

You can bind an icon to a dynamic value by adding `[icon]` binding.

*my-comp.html*
```html
<alloy-checkbox [icon]="iconSrc.svg" [disabled]="disabled" [checked]="checked" [readonly]="readonly" 
    [errors]="errors" [errorMessage]="errorMessage">
</alloy-checkbox>
```

### Mixed binding

You can bind both a label as well as an icon to the checkbox by adding both `[label]` and `[icon]` bindings.
The icon will appear to the left of the label.

*my-comp.html*
```html
<alloy-checkbox [icon]="iconSrc.svg" [label]="placeholder" [disabled]="disabled" [checked]="checked" [readonly]="readonly" 
    [errors]="errors" [errorMessage]="errorMessage">
</alloy-checkbox>
```
