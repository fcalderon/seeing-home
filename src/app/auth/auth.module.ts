import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import {
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatRadioModule,
  MatCardModule,
  MatCheckboxModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import {AngularFireAuthModule} from "@angular/fire/auth";

@NgModule({
  declarations: [SignUpComponent, SignUpFormComponent],
  exports: [SignUpComponent, SignUpFormComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    MatCheckboxModule
  ]
})
export class AuthModule { }
