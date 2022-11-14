import { ConsultationComponent } from './consultation/consultation.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { DossiersMedicauxComponent } from './dossiers-medicaux/dossiers-medicaux.component';
import { NewpatientComponent } from './newpatient/newpatient.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { CoursesComponent } from './courses/courses.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core';



const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: NewpatientComponent,
    canActivate: [AuthGuard],
  },
  {path:'home', component:DashboardComponent},
  {path:'consultation', component:ConsultationComponent, canActivate: [AuthGuard]},
  {path:'courses', component:CoursesComponent, canActivate: [AuthGuard]},
  {path:'detail/:id', component:NewpatientComponent, canActivate: [AuthGuard]},
  {path:'newpatient', component:NewpatientComponent, canActivate: [AuthGuard]},
  {path:'dossiers', component: DossiersMedicauxComponent, canActivate: [AuthGuard]},
  {path:'login', component: LoginComponentComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
