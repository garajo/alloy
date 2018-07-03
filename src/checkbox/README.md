# Alloy Checkbox

**`<alloy-checkbox>` <span style="color:red">is now deprecated**<span>.
Instances of `<alloy-checkbox>` should be migrated to the new directive:

```html
<!-- All attributes align -->
<alloy-checkbox></alloy-checkbox> -> <input type="checkbox" alloy>
```

## Full API

```html
<input type="checkbox" alloy
   [label]="string"
   [icon]="sourceString"
   [disabled]="boolean"
   [checked]="boolean"
   [readonly]="boolean"
   [size]="number"
   [error]="boolean" [errorMessage]="string">
```

### Attributes

* disabled - Same as `input disabled`
* checked  - Same as `input checked="state"`
* size     - Current changes *only* the box size
* error    - Sets the error styling for the checkbox
* errorMessage - sets the `title` (tooltip) for the checkbox *if* `[error]`
* readonly     - does not exist for `input [checkbox]`, this sets `disabled` and slightly different styling

### Label binding

You can bind a label to a dynamic value by adding `[label]` binding.

```html
<input type="checkbox" alloy
   [label]="string">
```

### Icon binding

You can bind an icon to a dynamic value by adding `[icon]` binding.

```html
<input type="checkbox" alloy
   [icon]="sourceString">
```

### Mixed binding

You can bind both a label as well as an icon to the checkbox by adding both `[label]` and `[icon]` bindings.
The icon will appear to the left of the label.
