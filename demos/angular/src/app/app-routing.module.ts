import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutBoxPageComponent } from './components/about-box-page/about-box-page.component';
import { ButtonPageComponent } from './components/button-page/button-page.component';
import { CheckboxPageComponent } from './components/checkbox-page/checkbox-page.component';
import { CompoundPageComponent } from './components/compound-page/compound-page.component';
import { ContextmenuPageComponent } from './components/contextmenu-page/contextmenu-page.component';
import { DisplaySettingsPageComponent } from './components/display-settings-page/display-settings-page.component';
import { DropdownsPageComponent } from './components/dropdowns-page/dropdowns-page.component';
import { NotificationIconPageComponent } from './components/notification-icon-page/notification-icon-page.component';
import { PropertyEditorComponent } from './components/property-page/property-editor.component';
import { SwitcherPageComponent } from 'app/components/switcher-page/switcher-page.component';
import { TextboxPageComponent } from './components/textbox-page/textbox-page.component';
import { TextareaPageComponent } from './components/textarea-page/textarea-page.component';

const routes: Routes = [
    { path: '', redirectTo: 'dropdowns', pathMatch: 'full' },
    { path: 'about-box', component: AboutBoxPageComponent},
    { path: 'button', component: ButtonPageComponent},
    { path: 'checkbox', component: CheckboxPageComponent},
    { path: 'compound', component: CompoundPageComponent },
    { path: 'contextmenu', component: ContextmenuPageComponent },
    { path: 'display-settings', component: DisplaySettingsPageComponent },
    { path: 'dropdowns', component: DropdownsPageComponent },
    { path: 'notification-icon', component: NotificationIconPageComponent },
    { path: 'propertygrid', component: PropertyEditorComponent },
    { path: 'switcher', component: SwitcherPageComponent},
    { path: 'textarea', component: TextareaPageComponent },
    { path: 'textbox', component: TextboxPageComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
