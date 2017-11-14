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

### Placeholder binding

You can bind a placeholder to a dynamic value by id adding `[placeholder]` binding.

*my-comp.html*
```html
<alloy-checkbox [label]="placeholder" [disabled]="disabled" [checked]="checked">
</alloy-checkbox>
```
