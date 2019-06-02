import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDashboardComponent } from './home/user-dashboard/user-dashboard.component';
import {SignUpComponent} from './auth/sign-up/sign-up.component';
import {TaskListComponent} from './task/task-list/task-list.component';

const routes: Routes = [
  { path: 'signUp', component: SignUpComponent },
  { path: 'tasks', component: TaskListComponent },
  { path: '', component: UserDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
