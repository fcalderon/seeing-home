import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  @Output()
  formSubmitted = new EventEmitter<any>();

  signUpForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    this.formSubmitted.emit(this.signUpForm.value);
  }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

}
