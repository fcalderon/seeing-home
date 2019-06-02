import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from '../task/task-list/task-list.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserNavigationComponent } from './user-navigation/user-navigation.component';

const routes: Routes = [
  { path: '', component: UserNavigationComponent,
    children: [
      { path: '', component: UserDashboardComponent },
      { path: 'tasks', component: TaskListComponent },
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
