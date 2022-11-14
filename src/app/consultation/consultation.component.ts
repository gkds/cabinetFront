import { Consultation } from './Consultation';
import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../courses.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.css']
})
export class ConsultationComponent implements OnInit {

  done:boolean;
  consult : Consultation
  errorMessage;
  consultList: Consultation[];

  constructor(private route: ActivatedRoute,
    private courseService: CoursesService) { }

  ngOnInit(): void {
  }

  loadAll(): void {
    this.courseService.getConsults().subscribe(
      {
        next: consults => {
          //this.postId = JSON.stringify(data);
          this.consultList = consults;
        },
        error: error => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
          this.done = false;
        }

      }
    )
  }
  createConsult(): void {

    this.courseService.createConsult(this.consult).subscribe({
      next: data => {
        //this.postId = JSON.stringify(data);
        this.done = true;
      },
      error: error => {
        this.errorMessage = error.message;
        console.error('There was an error!', error);
        this.done = false;
      }
    });
    console.log("New consult created ..." + JSON.stringify(this.consult));
 
  }
showDetail(id:number){
  
}
}
