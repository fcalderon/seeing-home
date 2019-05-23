import {Component, EventEmitter, Output} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css']
})
export class SignUpFormComponent {
  @Output()
  onSubmitted = new EventEmitter<any>();

  signUpForm = this.fb.group({
    email: [null, Validators.required],
    password: [null, Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    console.log('Form submitted', this.signUpForm.value);
    this.onSubmitted.emit(this.signUpForm.value);
  }
}
