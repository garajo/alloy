import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DropdownsPageComponent } from './components/dropdowns-page/dropdowns-page.component';
import { CheckboxPageComponent } from './components/checkbox-page/checkbox-page.component';

const routes: Routes = [
    { path: '', redirectTo: 'dropdowns', pathMatch: 'full' },
    { path: 'dropdowns', component: DropdownsPageComponent },
    { path: 'checkbox', component: CheckboxPageComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
