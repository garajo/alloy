# Alloy Button

`<button alloy>` adds caranu styling to the native element.

```html
<button alloy |type| [disabled]="disabled"></button>
```

The available styles are:

* Standard - This is the implied style. `<button alloy standard>` or  `<button alloy>`
* Default - The button attached to the 'enter' key. `<button alloy default>`
* Quick Access - The button styling for a quick access bar. `<button alloy quickaccess>`
* Toolbar - The button styling for a tool bar. `<button alloy toolbar>`
* Switch - The button styling for a boolean switch. `<button alloy switch>`

`Alloy Button` supports `IdentityDirective` and hence supports the `alloyLabel` and `alloyIcon` attributes.

### Label binding

```html
<button alloy default alloyLabel="My Label"></button>
```

### Icon binding

```html
<button alloy toolbar alloyIcon="my-icon-class"></button>
```

### Mixed binding

```html
<button alloy standard alloyLabel="My Label" alloyIcon="my-icon-class"></button>
```

`Alloy Button` also supports the `ToggleDirective` and hence supports the `(toggle)` event.  $event is a boolean state of the button.
```html
<button alloy standard toggle (toggle)="onToggled($event)" alloyLabel="My Label"></button>
```

### Switch binding

The `switch` attribute may also be bound to a boolean.  It is actually an alias for `[toggle]`.  As such `(toggle)` is also available if needed.

```html
<button alloy [switch]="boolean"></button>
```
