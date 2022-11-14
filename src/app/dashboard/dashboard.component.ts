import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core';
import { Doctor } from '../core/models/Doctor';
import { CoursesService } from '../courses.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  accessToken = '';
  user_role = '';
  doctors :  Doctor[];
  role_admin =false;

  counter:number = 0;
  yellow='yellow'


  constructor(public authService: AuthService,
    private courseService: CoursesService) { }

  ngOnInit(): void {
    this.accessToken = localStorage.getItem('access_token');
    this.user_role = localStorage.getItem('user_role');
    if(this.user_role === 'Admin'){
      this.role_admin = true;
      this.loadAllDoctors();
    }
  }

  onClick() {
    this.counter++;
  }


  setClasses() {
    let classes = {
      active: this.counter > 4,
      notative: this.counter <=4,
      oder:this.counter > 6
    }
    return classes
  }

  loadAllDoctors(): void {
    this.courseService.getAllDoctors().subscribe(doctors => this.doctors = doctors)
  }

  addNew(): void {
    
  }
}
