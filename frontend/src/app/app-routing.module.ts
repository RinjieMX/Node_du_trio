import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginFormComponent} from "./login-form/login-form.component";
import {NewaccountFormComponent} from "./newaccount-form/newaccount-form.component";
import {AddnewPackageComponent} from "./addnew-package/addnew-package.component";
import {DisplayPackageComponent} from "./display-package/display-package.component";

const routes: Routes = [
  { path:'login-form', component: LoginFormComponent },
  { path:'newaccount-form', component: NewaccountFormComponent },
  { path:'addnew-package', component: AddnewPackageComponent },
  { path:'display-package', component: DisplayPackageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
