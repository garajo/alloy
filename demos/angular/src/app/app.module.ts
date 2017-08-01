import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  AlloyStylesModule,
  AlloyDropdownModule,
} from '@ksf/alloy';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DropdownsPageComponent } from './components/dropdowns-page/dropdowns-page.component';

/**
 * NgModule that includes all Alloy modules that are required to serve the demo app.
 * This approach allows to perform tree shaking.
 */
@NgModule({
  exports: [
    AlloyStylesModule,
    AlloyDropdownModule,
  ]
})
export class AlloyDemoModule { }

@NgModule({
  declarations: [
    AppComponent,
    DropdownsPageComponent,
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
