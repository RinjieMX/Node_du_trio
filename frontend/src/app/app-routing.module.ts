import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginFormComponent} from "./login-form/login-form.component";
import {NewaccountFormComponent} from "./newaccount-form/newaccount-form.component";
import {AddnewPackageComponent} from "./addnew-package/addnew-package.component";
import {DisplayPackageComponent} from "./display-package/display-package.component";
import {DisplayFactsComponent} from "./display-facts/display-facts.component";
import {NomoreFactComponent} from "./nomore-fact/nomore-fact.component";
import {StudyNowComponent} from "./study-now/study-now.component";
import {EditPackageComponent} from "./edit-package/edit-package.component";
import {ProgressStatisticsComponent} from "./progress-statistics/progress-statistics.component";
import {FactsStatisticsComponent} from "./facts-statistics/facts-statistics.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {HelpAboutComponent} from "./help-about/help-about.component";
import {HelpDocumentationComponent} from "./help-documentation/help-documentation.component"
import {DisplayAchievements} from "./achievements-page/achievements-page.component"


const routes: Routes = [
  { path: '', redirectTo: '/home-page', pathMatch: 'full' },
  { path:'login-form', component: LoginFormComponent },
  { path:'newaccount-form', component: NewaccountFormComponent },
  { path:'addnew-package', component: AddnewPackageComponent },
  { path:'display-package', component: DisplayPackageComponent , data: { refresh: true } },
  { path:'display-facts/:id_package', component: DisplayFactsComponent },
  { path:'study-now', component: StudyNowComponent },
  { path:'nomore-fact', component: NomoreFactComponent },
  { path:'edit-package/:id_package', component: EditPackageComponent },
  { path: 'progress-statistics', component: ProgressStatisticsComponent},
  { path: 'facts-statistics',component:FactsStatisticsComponent},
  { path: 'home-page', component: HomePageComponent },
  { path: 'help-about', component: HelpAboutComponent},
  { path:'help-documentation', component: HelpDocumentationComponent},
  { path:'achievements-page', component: DisplayAchievements}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
