import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignUpComponent} from "./auth/sign-up/sign-up.component";
import {TaskListComponent} from "./task/task-list/task-list.component";

const routes: Routes = [
  { path: 'signUp', component: SignUpComponent },
  { path: 'tasks', component: TaskListComponent   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
