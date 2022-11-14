import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoursesComponent } from './courses/courses.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewpatientComponent } from './newpatient/newpatient.component';
import { DossiersMedicauxComponent } from './dossiers-medicaux/dossiers-medicaux.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { JwtModule } from '@auth0/angular-jwt';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from './core/core.module';
import { ConsultationComponent } from './consultation/consultation.component';

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    CourseDetailComponent,
    DashboardComponent,
    NewpatientComponent,
    DossiersMedicauxComponent,
    LoginComponentComponent,
    ConsultationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoreModule,
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
