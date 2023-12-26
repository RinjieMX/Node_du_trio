import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginFormComponent} from "./login-form/login-form.component";
import {NewaccountFormComponent} from "./newaccount-form/newaccount-form.component";

const routes: Routes = [
  { path:'login-form', component: LoginFormComponent },
  { path:'newaccount-form', component: NewaccountFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
