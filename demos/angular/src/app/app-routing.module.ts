import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DropdownsPageComponent } from './components/dropdowns-page/dropdowns-page.component';
import { CheckboxPageComponent } from './components/checkbox-page/checkbox-page.component';
import { NotificationIconPageComponent } from './components/notification-icon-page/notification-icon-page.component';
import { PropertyEditorComponent } from './components/property-page/property-editor.component';
import { TextareaPageComponent } from './components/textarea-page/textarea-page.component';

const routes: Routes = [
    { path: '', redirectTo: 'dropdowns', pathMatch: 'full' },
    { path: 'dropdowns', component: DropdownsPageComponent },
    { path: 'checkbox', component: CheckboxPageComponent},
    { path: 'notification-icon', component: NotificationIconPageComponent },
    { path: 'propertygrid', component: PropertyEditorComponent },
    { path: 'textarea', component: TextareaPageComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
