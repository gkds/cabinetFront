import { CoursesService } from './../courses.service';
import { COURSES } from './mock-courses';
import { Component, OnInit } from '@angular/core';
import { Course } from './course';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  courses :Course[];
  coursename = "";
  selectedCourse:Course;
  beers: object;

  constructor(private courseService : CoursesService) { }

  ngOnInit(): void {
    this.getCourse();
    this.courseService.getBeers().subscribe(data => this.beers = data);
  }

  onSelect(course:Course): void {
    console.log(`${course.name} is selected`);
    this.selectedCourse=course;
  }

  getCourse(): void {
    this.courseService.getCourses().subscribe(courses => this.courses=courses)
  }

}
