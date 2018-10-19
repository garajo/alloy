/*
 * Copyright Keysight Technologies 2017. All rights reserved.
 */
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  AlloyAboutBox,
  AlloyAboutBoxModule,
  AlloyButtonModule,
  AlloyCheckboxModule,
  AlloyContextmenuModule,
  AlloyDirectivesModule,
  AlloyDisplaySettingsModule,
  AlloyDropdownModule,
  AlloyIconModule,
  AlloyNotificationIconModule,
  AlloyProgressBarModule,
  AlloyProgressRingModule,
  AlloyPropertyGridModule,
  AlloyPropertyGridMessageService,
  AlloySwitcherModule,
  AlloyMenuModule,
  AlloyDialogModule,
  AlloyWizardModule
} from '@keysight/alloy';

import { AboutBoxPageComponent } from './components/about-box-page/about-box-page.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ButtonPageComponent } from './components/button-page/button-page.component';
import { CheckboxDynamicComponent } from './components/property-page/editors/dynamic-components/checkbox/checkbox-dynamic.component';
import { CheckboxPageComponent } from './components/checkbox-page/checkbox-page.component';
import { ContextmenuPageComponent } from './components/contextmenu-page/contextmenu-page.component';
import { DisplaySettingsPageComponent } from './components/display-settings-page/display-settings-page.component';
import { DropdownDynamicComponent } from './components/property-page/editors/dynamic-components/dropdown/dropdown-dynamic.component';
import { DropdownsPageComponent } from './components/dropdowns-page/dropdowns-page.component';
import { NotificationIconPageComponent } from './components/notification-icon-page/notification-icon-page.component';
import { ProgressBarPageComponent } from './components/progress-bar-page/progress-bar-page.component';
import { PropertyEditorComponent } from './components/property-page/property-editor.component';
import { RadioPageComponent } from './components/radio-page/radio-page.component';
import { SwitcherPageComponent } from './components/switcher-page/switcher-page.component';
import { TextareaPageComponent } from './components/textarea-page/textarea-page.component';
import { TextboxPageComponent } from './components/textbox-page/textbox-page.component';
import { TextfieldDynamicComponent } from './components/property-page/editors/dynamic-components/textfield/textfield-dynamic.component';
import { VerificationPageComponent } from './components/verification/verification-page.component';

import { DataService } from './components/property-page/editors/services/data.service';
import { EditorService } from './components/property-page/editors/services/editor.service';
import { VerifiyTextboxComponent } from './components/verification/textbox/verify-textbox.component';
import { VerifyCheckboxComponent } from './components/verification/checkbox/verify-checkbox.component';
import { VerifyRadioComponent } from './components/verification/radio/verify-radio.component';
import { VerifyButtonComponent } from './components/verification/button/verify-button.component';
import { IconPageComponent } from './components/icon-page/icon-page.component';
import { VerifyDropdownComponent } from './components/verification/dropdown/verify-dropdown.component';
import { WizardPageComponent } from './components/wizard-page/wizard-page.component';
import { WizardDemoComponent } from './components/wizard-page/demo-wizard.component';
import { MenuPageComponent } from './components/menu-page/menu-page.component';

/**
 * NgModule that includes all Alloy modules that are required to serve the demo app.
 * This approach allows to perform tree shaking.
 */
@NgModule({
  exports: [
    AlloyAboutBoxModule,
    AlloyButtonModule,
    AlloyCheckboxModule,
    AlloyContextmenuModule,
    AlloyDisplaySettingsModule,
    AlloyDropdownModule,
    AlloyIconModule,
    AlloyNotificationIconModule,
    AlloySwitcherModule,
    AlloyDirectivesModule,
    AlloyProgressBarModule,
    AlloyProgressRingModule,
    AlloyMenuModule,
    AlloyDialogModule,
    AlloyWizardModule
  ],
  entryComponents: [
    AlloyAboutBox,
    WizardDemoComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AlloyButtonModule,
    AlloyIconModule,
    AlloyNotificationIconModule,
    AlloyContextmenuModule,
    AlloyDirectivesModule,
    AlloyProgressBarModule,
    AlloyProgressRingModule,
    AlloyWizardModule,
    AlloyMenuModule
  ]
})
export class AlloyDemoModule { }

@NgModule({
  declarations: [
    AboutBoxPageComponent,
    AppComponent,
    ButtonPageComponent,
    CheckboxDynamicComponent,
    CheckboxPageComponent,
    ContextmenuPageComponent,
    DisplaySettingsPageComponent,
    DropdownDynamicComponent,
    DropdownsPageComponent,
    MenuPageComponent,
    NotificationIconPageComponent,
    ProgressBarPageComponent,
    PropertyEditorComponent,
    RadioPageComponent,
    SwitcherPageComponent,
    TextfieldDynamicComponent,
    TextboxPageComponent,
    TextareaPageComponent,
    SwitcherPageComponent,
    ContextmenuPageComponent,
    VerificationPageComponent,
    VerifyCheckboxComponent,
    VerifyRadioComponent,
    VerifiyTextboxComponent,
    VerifyButtonComponent,
    IconPageComponent,
    VerifyDropdownComponent,
    WizardPageComponent,
    WizardDemoComponent
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
