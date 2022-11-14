import { Patient } from './newpatient/patient';
import { COURSES } from './courses/mock-courses';
import { Course } from './courses/course';
import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';
import { Consultation } from './consultation/Consultation';
import { Doctor } from './core/models/Doctor';



@Injectable({
  providedIn: 'root'
})

export class CoursesService {
  constructor(private http: HttpClient) { }

  getAllPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${environment.apiUrl}/patients/all`)
  }

  createConsult(consult: Consultation) {
    return this.http.post<Consultation>(environment.apiUrl+'/consultation', consult)
  }
 
  getConsults(): Observable<Consultation[]>{
    return this.http.get<Consultation[]>(environment.apiUrl+'/consultation')
  }

  getCourses(): Observable<Course[]> {
    return of(COURSES)
  }

  getBeers() {
   return this.http.get('https://api.openbrewerydb.org/breweries')
  }


  getPatientList(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${environment.apiUrl}/patients`)
   }

   updatePatient(p: Patient) {
    return this.http.put<Patient>(environment.apiUrl+'/patients/'+p.id, p)
  }

   createPatient(p:Patient){
    console.log('Environment apiUrl ='+environment.apiUrl);
     return this.http.post<Patient>(`${environment.apiUrl}/patients`, p)
   }

   getDossiersMedicaux(){
    return this.http.get(`${environment.apiUrl}/dossiers`)
   }

   getAllDoctors() {
    return this.http.get<Doctor[]>(`${environment.apiUrl}/consultation/doctors`)
   }
}
