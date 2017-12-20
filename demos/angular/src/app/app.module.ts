/*
 * Copyright Keysight Technologies 2017. All rights reserved.
 */
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  AlloyAboutBox,
  AlloyAboutBoxModule,
  AlloyDropdownModule,
  AlloyButtonModule,
  AlloyIconModule,  
  AlloyCheckboxModule,
  AlloyNotificationIconModule,
  AlloyPropertyGridModule,
  AlloyPropertyGridMessageService,
  AlloyTextboxModule,
  AlloySwitcherModule,
  AlloyTextareaModule
} from '@keysight/alloy';

import { AboutBoxPageComponent } from './components/about-box-page/about-box-page.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DropdownsPageComponent } from './components/dropdowns-page/dropdowns-page.component';
import { ButtonPageComponent } from './components/button-page/button-page.component';
import { CheckboxPageComponent } from './components/checkbox-page/checkbox-page.component';
import { NotificationIconPageComponent } from './components/notification-icon-page/notification-icon-page.component';

import { DataService } from './components/property-page/editors/services/data.service';
import { PropertyEditorComponent } from './components/property-page/property-editor.component';
import { CheckboxDynamicComponent } from './components/property-page/editors/dynamic-components/checkbox/checkbox-dynamic.component';
import { TextfieldDynamicComponent } from './components/property-page/editors/dynamic-components/textfield/textfield-dynamic.component';
import { DropdownDynamicComponent } from './components/property-page/editors/dynamic-components/dropdown/dropdown-dynamic.component';
import { EditorService } from './components/property-page/editors/services/editor.service';
import { TextboxPageComponent } from './components/textbox-page/textbox-page.component';
import { TextareaPageComponent } from './components/textarea-page/textarea-page.component';
import { SwitcherPageComponent } from './components/switcher-page/switcher-page.component';


/**
 * NgModule that includes all Alloy modules that are required to serve the demo app.
 * This approach allows to perform tree shaking.
 */
@NgModule({
  exports: [
    AlloyAboutBoxModule,
    AlloyButtonModule,  
    AlloyCheckboxModule,  
    AlloyDropdownModule,
    AlloyIconModule,  
    AlloyNotificationIconModule,
    AlloySwitcherModule,
    AlloyTextboxModule,
    AlloyTextareaModule
  ],
  entryComponents: [
    AlloyAboutBox
  ],
  imports: [
    MatDialogModule,
    BrowserAnimationsModule,
    AlloyButtonModule,    
    AlloyIconModule,    
    AlloyNotificationIconModule,
    AlloyTextboxModule,
    AlloyTextareaModule 
  ]
})
export class AlloyDemoModule { }

@NgModule({
  declarations: [
    AppComponent,
    DropdownsPageComponent,
    ButtonPageComponent,
    CheckboxPageComponent,
    AboutBoxPageComponent,
    NotificationIconPageComponent,
    PropertyEditorComponent,
    CheckboxDynamicComponent,
    TextfieldDynamicComponent,
    DropdownDynamicComponent,
    TextboxPageComponent,
    TextareaPageComponent,
    SwitcherPageComponent
  ],
  imports: [
    AlloyDemoModule,
    AlloyPropertyGridModule.withComponents([
      CheckboxDynamicComponent,
      TextfieldDynamicComponent,
      DropdownDynamicComponent
    ]),
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    AlloyPropertyGridMessageService,
    DataService,
    EditorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
