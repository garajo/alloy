# ErrorDirective

`ErrorDirective` is not actually a directive, due to [current limitations of Angular](https://github.com/angular/angular/issues/8785).
It is a class that can be extended that applies `has-error` styling.  This is useful
since Angular apps will have an easy way to determine if errors are handled by a widget
and hook to them.

```html
<input type="text" [error]="bool">
```

A consuming app could use it in this manner (pseudo):

```typescript
errorReceived(string message) {
    if (widget instanceof ErrorDirective) {
      widget.error = true;
      // do something with message
    }
}
```

Pure HTML apps can simply use the class directly:

```html
<input type="text" class="has-error">
```
