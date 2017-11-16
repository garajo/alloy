# Alloy Notification Icon

`<alloy-notification-icon>` is used to add alloy notification icon.

In your template, create an `alloy-notification-icon` element. The number of messages can be passed to this icon by adding a
numeric variable (`count`) binding to it. 
The size of the icon is adjustable through the `height` and `width` attributes. Just use numeric values that represents the
number of pixels for the dimension of the icon. It is prefered to choose equal values for the `height` 
and `width` of the icon to keep the original form of the icon.

*my-comp.html*
```html
<alloy-notification-icon [count]="messageCount" [height]="32" [width]="32"><alloy-notification-icon>
```
