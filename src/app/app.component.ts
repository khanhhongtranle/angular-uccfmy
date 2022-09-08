import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface UserDto {
  username: string;
  email: string;
  type: 'user' | 'admin';
  password: string;
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public userForm: FormGroup;
  public userTypes = ['user', 'admin'];
  public submitting = false;
  public result = '';

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(24),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      type: ['', [Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{5,24}$/
          ),
        ],
      ],
    });
  }

  // CODE HERE
  //
  // I want to be able to create a new user for the application. Implement a reactive form that I can submit
  //
  // Form:
  // - username (required, min 3, max 24 characters)
  // - email (required, valid email address)
  // - type (required, select dropdown with either 'user' or 'admin')
  // - password (required, min 5, max 24 characters, upper and lower case, at least one special character)
  //
  // Requirements:
  // The form should submit a valid UserDto object (call createUser() function)
  // The submit button should be disabled if the form is invalid
  // The submit button should be disabled while the submit request is pending
  // If the request fails the button must become submittable again (error message must not be displayed)
  // Errors should be displayed under each input if not valid
  //
  // Futher Notes:
  // Styling is not important, use default HTML elements (no angular material or bootstrap)

  ngOnInit() {}

  private async createUser(user: UserDto) {
    console.log(user);
    this.submitting = true;
    await new Promise((res) => setTimeout(res, 2500));

    console.log('test');

    if (Math.random() < 0.5) {
      this.userForm.markAsPristine();
      this.userForm.markAsUntouched();
      this.submitting = false;
      this.result = 'Something was wrong. Please try again!';
      return Promise.reject('Request Failed');
    }
    // Backend call happening here.
    this.submitting = false;
    this.result = 'Create user successful';
    return { username: user.username, email: user.email, type: user.type };
  }
}
