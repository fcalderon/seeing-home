import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthFormMode, SignUpComponent } from './auth/sign-up/sign-up.component';

const routes: Routes = [
  { path: 'authenticate', component: SignUpComponent },
  { path: 'login',  component: SignUpComponent, data: { mode: AuthFormMode.LOGIN } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
