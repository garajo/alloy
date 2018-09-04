import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutBoxPageComponent } from './components/about-box-page/about-box-page.component';
import { ButtonPageComponent } from './components/button-page/button-page.component';
import { CheckboxPageComponent } from './components/checkbox-page/checkbox-page.component';
import { ContextmenuPageComponent } from './components/contextmenu-page/contextmenu-page.component';
import { DisplaySettingsPageComponent } from './components/display-settings-page/display-settings-page.component';
import { DropdownsPageComponent } from './components/dropdowns-page/dropdowns-page.component';
import { NotificationIconPageComponent } from './components/notification-icon-page/notification-icon-page.component';
import { ProgressBarPageComponent } from './components/progress-bar-page/progress-bar-page.component';
import { PropertyEditorComponent } from './components/property-page/property-editor.component';
import { SwitcherPageComponent } from './components/switcher-page/switcher-page.component';
import { TextboxPageComponent } from './components/textbox-page/textbox-page.component';
import { TextareaPageComponent } from './components/textarea-page/textarea-page.component';
import { VerificationPageComponent } from './components/verification/verification-page.component';
import { VerifiyTextboxComponent } from './components/verification/textbox/verify-textbox.component';
import { VerifyCheckboxComponent } from './components/verification/checkbox/verify-checkbox.component';
import { VerifyButtonComponent } from './components/verification/button/verify-button.component';
import { IconPageComponent } from './components/icon-page/icon-page.component';
import { VerifyDropdownComponent } from './components/verification/dropdown/verify-dropdown.component';

const routes: Routes = [
    { path: '', redirectTo: 'dropdowns', pathMatch: 'full' },
    { path: 'about-box', component: AboutBoxPageComponent},
    { path: 'button', component: ButtonPageComponent},
    { path: 'checkbox', component: CheckboxPageComponent},
    { path: 'contextmenu', component: ContextmenuPageComponent },
    { path: 'display-settings', component: DisplaySettingsPageComponent },
    { path: 'dropdowns', component: DropdownsPageComponent },
    { path: 'icons', component: IconPageComponent },
    { path: 'notification-icon', component: NotificationIconPageComponent },
    { path: 'progress-bar', component: ProgressBarPageComponent },
    { path: 'propertygrid', component: PropertyEditorComponent },
    { path: 'switcher', component: SwitcherPageComponent},
    { path: 'switcher', component: SwitcherPageComponent},
    { path: 'textarea', component: TextareaPageComponent },
    { path: 'textbox', component: TextboxPageComponent},
    { path: 'verification', component: VerificationPageComponent,
        children: [
          { path: '', component: VerifiyTextboxComponent},
          { path: 'button', component: VerifyButtonComponent },
          { path: 'checkbox', component: VerifyCheckboxComponent },
          { path: 'textbox', component: VerifiyTextboxComponent },
          { path: 'dropdown', component: VerifyDropdownComponent }
        ] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
