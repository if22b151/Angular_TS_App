import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  title = 'Signup';
  //email validation
  email = new FormControl('', [Validators.required, Validators.email]);
  //password validation
  password = new FormControl('', [Validators.required, Validators.minLength(8)]);
  passwordconfirm = new FormControl('', [Validators.required, Validators.minLength(8)]);
  //postal code validation
  postal = new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern('[0-9]*')]);

  hide = true;
  hide2 = true;
  message = '';
  error = '';

  constructor(private http: HttpClient, private LoginService: LoginService) { }
  
  onSubmit(email: string, password: string, confirmPassword: string, company: string, address: string, postalcode: string) {
      if(password !== confirmPassword) {
        this.error = "Passwords do not match";
      } else {
        const userData = {
          email: email,
          password: password
        }

        this.http.post<any>('http://localhost:3000/users', userData).subscribe(
          (response) => {

            this.message = response.message;
            this.LoginService.setAuthToken(response.token);
            
          },
          (error) => {
            
            this.message = error.error.message;
            
          }
        );
      }
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
    //if password is invalid
    return this.password.hasError('minlength') ? 'Password must be atleast 8 characters long' : '';
  }

  getPostalErrorMessage() {
    //if postal is invalid
    return this.postal.hasError('minlength') ? 'Postal code must be 4 digits long' :
           this.postal.hasError('maxlength') ? 'Postal code must be 4 digits long' :
           this.postal.hasError('pattern') ? 'Postal code must only contain numbers' : '';
  }

}
