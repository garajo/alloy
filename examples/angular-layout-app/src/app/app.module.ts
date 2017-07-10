import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AlloyModule } from '@ksf/alloy';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DropdownsPageComponent } from './components/dropdowns-page/dropdowns-page.component';

@NgModule({
  declarations: [
    AppComponent,
    DropdownsPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AlloyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }