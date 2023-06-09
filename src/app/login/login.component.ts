import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  title = 'Login';
  //email validation
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(8)]);
  hide = true;
  message = '';
  constructor(private http: HttpClient, private LoginService: LoginService, private router: Router) { }

  onSubmit(email: string, password: string) {

      const authToken = this.LoginService.getAuthToken();

      console.log("🚀 ~ file: login.component.ts:27 ~ LoginComponent ~ onSubmit ~ email:", email)
      this.LoginService.setEmail(email);

      console.log(authToken);

      const userData = {
        email: email,
        password: password,
        authToken: authToken
      };

      this.http.post<any>('http://localhost:3000/login', userData).subscribe(
        (response) => {
            this.message = response.message;
            this.router.navigate(['/landing-page']);
        },
        (error) => {
            this.message = error.error.message;
        }
      );
  }

  getEmailErrorMessage() {
    //if nothing is entered
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    //if email is invalid
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  getPasswordErrorMessage() {
    //if nothing is entered
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }
    //if password is too short
    return this.password.hasError('minlength') ? 'Password must be at least 8 characters' : '';
  }

}
