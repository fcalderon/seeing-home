import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css']
})
export class SignUpFormComponent implements OnInit {
  @Output()
  formSubmitted = new EventEmitter<any>();

  signUpForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    this.formSubmitted.emit(this.signUpForm.value);
  }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      name: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

}
