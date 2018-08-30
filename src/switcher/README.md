# Alloy Switcher

`<alloy-switcher>` is <b>DEPRECATED</b>

In your template, create an `alloy-switcher` element. The button slides as user click the switcher. Consumer can set the status of switcher by passing boolean variable to the `onSwitchStatus` attribute. The status is by default off. User can also disable the switcher by passing value to `disabled` attribute. Switcher is by default Change of status of the switcher can be listened by binding to the `onSwitchListener` eventemitter, which returns true as switcher turns on and vise versa. Users can use the switcher to control other behaviors through registering the event to their functions.

*my-comp.html*
```html
<alloy-switcher [onSwitchStatus]="false" [disabled]="false" (onSwitchListener)="onSwitch($event)">
</alloy-switcher>
```
