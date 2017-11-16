import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  AlloyDropdownModule,
  AlloyCheckboxModule,
  AlloyNotificationIconModule
} from '@keysight/alloy';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DropdownsPageComponent } from './components/dropdowns-page/dropdowns-page.component';
import { CheckboxPageComponent } from './components/checkbox-page/checkbox-page.component';
import { NotificationIconPageComponent } from './components/notification-icon-page/notification-icon-page.component';

/**
 * NgModule that includes all Alloy modules that are required to serve the demo app.
 * This approach allows to perform tree shaking.
 */
@NgModule({
  exports: [
    AlloyDropdownModule,
    AlloyCheckboxModule,
    AlloyNotificationIconModule
  ]
})
export class AlloyDemoModule { }

@NgModule({
  declarations: [
    AppComponent,
    DropdownsPageComponent,
    CheckboxPageComponent,
    NotificationIconPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AlloyDemoModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
