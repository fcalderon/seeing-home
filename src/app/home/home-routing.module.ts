import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from '../auth/sign-up/sign-up.component';
import { TaskListComponent } from '../task/task-list/task-list.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

const routes: Routes = [
  { path: 'signUp', component: SignUpComponent },
  { path: 'tasks', component: TaskListComponent },
  { path: '', component: UserDashboardComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
