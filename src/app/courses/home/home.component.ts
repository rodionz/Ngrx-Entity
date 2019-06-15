import {Component, OnInit} from '@angular/core';
import {Course} from '../model/course';
import {Observable} from 'rxjs';
import {filter, map, tap, withLatestFrom} from 'rxjs/operators';
import {CoursesService} from '../services/courses.service';
import {AppState} from '../../reducers';
import {select, Store} from '@ngrx/store';
import { AllCoursesRequested } from '../course.actions';
import {selectAdvancedCourses, selectAllCourses, selectBeginnerCourses, selectPromoTotal} from '../courses.selectors';
@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    promoTotal$: Observable<number>;

    beginnerCourses$: Observable<Course[]>;

    advancedCourses$: Observable<Course[]>;

    constructor(private coursesService: CoursesService, private store: Store<AppState>) {

    }

    ngOnInit() {

        // const courses$ = this.coursesService.findAllCourses();

        // this.beginnerCourses$ = courses$.pipe(
        //   map(courses => courses.filter(course => course.category === 'BEGINNER') )
        // );

        // this.advancedCourses$ = courses$.pipe(
        //     map(courses => courses.filter(course => course.category === 'ADVANCED') )
        // );

        // this.promoTotal$ = courses$.pipe(
        //     map(courses => courses.filter(course => course.promo).length)
        // );

        this.store.dispatch(new AllCoursesRequested());

        this.beginnerCourses$ = this.store.pipe(select(selectBeginnerCourses));

        this.advancedCourses$ = this.store.pipe(select(selectAdvancedCourses));

        this.promoTotal$ = this.store.pipe(select(selectPromoTotal));
    }

}
