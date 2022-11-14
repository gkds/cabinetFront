import { Component, OnInit } from '@angular/core';


import { CoursesService } from './../courses.service';

@Component({
  selector: 'app-dossiers-medicaux',
  templateUrl: './dossiers-medicaux.component.html',
  styleUrls: ['./dossiers-medicaux.component.css']
})
export class DossiersMedicauxComponent implements OnInit {
  

  constructor(
    private courseService: CoursesService,
  ) { }

  dossiersMedicaux: Object

  ngOnInit(): void {
    this.courseService.getDossiersMedicaux().subscribe(dossiers => this.dossiersMedicaux = dossiers)
  }

}
