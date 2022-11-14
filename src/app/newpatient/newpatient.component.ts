import { AuthService } from './../core/services/auth.service';
import { DossierMedical } from './DossierMedical';
import { CoursesService } from './../courses.service';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Patient } from './patient';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-newpatient',
  templateUrl: './newpatient.component.html',
  styleUrls: ['./newpatient.component.css'],
  providers: [DatePipe]
})
export class NewpatientComponent implements OnInit {
  toCreate: boolean = false;
  modify: boolean;
  done: boolean;
  admin = false;


  constructor(
    private route: ActivatedRoute,
    private courseService: CoursesService,
    private authService: AuthService,
    private datePipe: DatePipe) {

  }
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    this.modify = false;
    this.authService.user$.pipe(
      map((user) => {
        console.log(">>User role: "+ user.role)
        if (user && user.role === 'Admin') {
          this.admin = true;
          console.log(" >>> In admin ROLE ;;;;;")
        } else {
          this.admin = false;
        }
      })
    ); 
    let role = localStorage.getItem('user_role');
    console.log(">> USER ROLE = "+ role);
    if(role === 'Admin') {
      this.admin = true;
      this.loadAllP();
    } else {
      this.loadPatients();
    } 
    

  }

  loadAllP(): void {
    this.courseService.getAllPatients().subscribe(patients => this.patientList = patients)
  }

  errorMessage = '';
  postId = '';
  dateOfBirth = this.datePipe.transform(new Date(1990, 4, 7), 'dd/MM/yyyy')
  //.toISOString().slice(0,10);
  dossierMed = new DossierMedical(null, '', '', '', '')
  patient: Patient =  {
    "id": null,
    "lname": null,
    "fname": '',
    "birth": this.dateOfBirth,
    "status": 0,
    "personInCharge": null,
    "dossierMedical": this.dossierMed,
    "phone": null,
    "familySituation": null,
    "profession": null,
    "sexe": null
  };
  
  SEXE = ['Féminin', 'Masculin']
  PROFILES = ['Célibataire', 'Marié', 'Divorcé', 'Veuf(ve)']

  patientList: Patient[];

  ajouterNew(){
    this.toCreate=true;
    this.patient =  {
      "id": null,
      "lname": null,
      "fname": '',
      "birth": this.dateOfBirth,
      "status": 0,
      "personInCharge": null,
      "dossierMedical": this.dossierMed,
      "phone": null,
      "familySituation": null,
      "profession": null,
      "sexe": null
    }

  }

  loadPatients(): void {
    this.courseService.getPatientList().subscribe(patients => this.patientList = patients)
  }

  createPatient(): void {

    this.courseService.createPatient(this.patient).subscribe({
      next: data => {
        this.postId = JSON.stringify(data);
        this.done = true;
      },
      error: error => {
        this.errorMessage = error.message;
        console.error('There was an error! ', error);
        this.done = false;
      }
    });
    console.log("New patient created ..." + JSON.stringify(this.patient));
    this.toCreate = false;
    this.loadPatients();
  }

  showDetail(id: number) {
    // const id = Number(this.route.snapshot.paramMap.get('id'));
    this.patient = this.patientList.find(h => h.id === id);
    this.toCreate = true
    this.modify = true
  }

  updatePatient() {
    this.courseService.updatePatient(this.patient).subscribe({
      next: data => {
        this.postId = JSON.stringify(data);
      },
      error: error => {
        this.errorMessage = error.message;
        console.error('There was an error!', error);
      }
    });
    this.toCreate = false;
    this.modify = false;
  }
}
