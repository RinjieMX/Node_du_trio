import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {HighchartsChartModule} from 'highcharts-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuNavbarComponent } from './menu-navbar/menu-navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AddnewPackageComponent } from './addnew-package/addnew-package.component';
import { PackageComponent } from './package/package.component';
import { DisplayPackageComponent } from './display-package/display-package.component';
import { DisplayFactsComponent } from './display-facts/display-facts.component';
import { NomoreFactComponent } from './nomore-fact/nomore-fact.component';
import { StudyNowComponent } from './study-now/study-now.component';
import { FactComponent } from './fact/fact.component';
import { EditPackageComponent } from "./edit-package/edit-package.component";
import { ProgressStatisticsComponent } from './progress-statistics/progress-statistics.component';
import { FactsStatisticsComponent } from './facts-statistics/facts-statistics.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HelpAboutComponent } from './help-about/help-about.component';
import { HelpDocumentationComponent } from './help-documentation/help-documentation.component';
import { DisplayAchievements } from "./achievements-page/achievements-page.component";
import { PackageStatisticsComponent } from "./package-statistics/package-statistics.component";
import { NomorePackageComponent } from './nomore-package/nomore-package.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuNavbarComponent,
    AddnewPackageComponent,
    PackageComponent,
    DisplayPackageComponent,
    DisplayFactsComponent,
    NomoreFactComponent,
    StudyNowComponent,
    EditPackageComponent,
    FactComponent,
    ProgressStatisticsComponent,
    FactsStatisticsComponent,
    HomePageComponent,
    HelpAboutComponent,
    HelpDocumentationComponent,
    DisplayAchievements,
    PackageStatisticsComponent,
    NomorePackageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    HighchartsChartModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
