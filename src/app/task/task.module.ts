import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './task-list/task-list.component';
import {AuthModule} from "../auth/auth.module";
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [TaskListComponent],
  exports: [TaskListComponent],
  imports: [
    CommonModule,
    AuthModule,
    AngularFireDatabaseModule,
    FormsModule
  ]
})
export class TaskModule { }
