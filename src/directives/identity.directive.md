# Identity Directive

`IdentityDirective` is a generic directive to add label and/or icon to a content node.

**WIP - References to class names (ie: `alloy-label`) are not implemented yet.**

## API

* `alloyLabel="string"` will set the label for the node
* `alloyIcon="className"` will set the background to the defined class
* `alloyImage="source"` will set the background to the defined path

The directive will generate a child `div` for the icon and a `span` for the label.

The `div` will be assigned the `.alloy-icon` class.  The `span` will be assigned the `.alloy-label` class.

In action:

```html
<button alloy alloyLabel="label" alloyIcon="className">
```

expands to:

```html
<button alloy alloyLabel="label" alloyIcon="className">
  <div class="alloy-icon className">
  <span class="alloy-label">label</span>
</button>
```

```css
.host {
    &>.alloy-icon { ... }
    &>.alloy-label { ... }
}
```

### Advanced Use Case
If the host of the directive is not the eventual parent of the label and icon you may assign the directive to another element.  This is useful in the case of, say, `AlloyCheckboxDirective` which must inject a wrapper element.  For example:

```ts
constructor(
    @Host() @Optional() private identityDirective: AlloyIdentityDirective) {

    ...
    identityDirective.assignTo(alternateElement);
}
```
