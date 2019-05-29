import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {AngularFireDatabase} from "@angular/fire/database";
import {map, tap} from "rxjs/operators";
import {Observable} from "rxjs";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.sass']
})
export class TaskListComponent implements OnInit {
  private _tasks$: Observable<any>;
  private completedTasks$: Observable<any>;
  myTaskName = '';

  constructor(private authService: AuthService, private db: AngularFireDatabase) { }

  ngOnInit() {
    this.getUser$().subscribe(user => {
      this._tasks$ = this.db.list(`/${user.uid}/task`, ref => ref.orderByChild('completed').equalTo(false)).snapshotChanges()
        .pipe(map(items => items.map(item => ({key: item.key, ...item.payload.val() }))));

      this.completedTasks$ = this.db.list(`/${user.uid}/task`, ref => ref.orderByChild('completed').equalTo(true)).snapshotChanges()
                                 .pipe(map(items => items.map(item => ({key: item.key, ...item.payload.val() }))));
    });

    // this.getUser$().subscribe(user => {
    //   this._tasks$ = this.db.list(`/${user.uid}/task`).valueChanges()
    //     .pipe(tap(value => console.log('My tasks', value)));
    // });

    this.getUser$().subscribe(user => {
      this.db.list(`/${user.uid}/task`).snapshotChanges()
        .pipe(map(items => items.map(item => ({key: item.key, ...item.payload.val() }))),
          tap(value => console.log('My tasks', value))).subscribe(whatever => console.log('>>>', whatever ));
    });
  }

  getUser$() {
    return this.authService.getUser$();
  }

  getTasks$() {
    return this._tasks$;
  }

  getCompletedTasks$() {
    return this.completedTasks$;
  }

  get disableButton() {
    return !this.myTaskName || this.myTaskName.length === 0;
  }

  saveTask(userId) {
    this.db.list(`/${userId}/task`).push({ name: this.myTaskName, completed: false })
      .then(() => {
        this.myTaskName = '';
      });
  }

  toggleTaskCompleted(uid, taskKey, completed) {
    this.db.object(`/${uid}/task/${taskKey}/completed`).set(!completed);
  }
}
