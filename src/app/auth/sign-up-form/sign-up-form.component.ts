import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css']
})
export class SignUpFormComponent {
  @Input() loggingIn = false;

  @Output()
  formSubmitted = new EventEmitter<any>();

  signUpForm = this.fb.group({
    email: [null, Validators.required],
    password: [null, Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    this.formSubmitted.emit(this.signUpForm.value);
  }
}
