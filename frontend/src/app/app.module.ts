import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { NewaccountFormComponent } from './newaccount-form/newaccount-form.component';
import { MenuNavbarComponent } from './menu-navbar/menu-navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { AddnewPackageComponent } from './addnew-package/addnew-package.component';
import { PackageComponent } from './package/package.component';
import { DisplayPackageComponent } from './display-package/display-package.component';
import { DisplayFactsComponent } from './display-facts/display-facts.component';
import { NomoreFactComponent } from './nomore-fact/nomore-fact.component';
import { StudyNowComponent } from './study-now/study-now.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    NewaccountFormComponent,
    MenuNavbarComponent,
    AddnewPackageComponent,
    PackageComponent,
    DisplayPackageComponent,
    DisplayFactsComponent,
    NomoreFactComponent,
    StudyNowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
