import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  @Output() loginEvent = new EventEmitter<object>();
  //email validation
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  hide2 = true;

  constructor() { }

  ngOnInit(): void {

  }

  onSubmit(email: string, password: string, confirmPassword: string) {
    const inputarr = [email, password, confirmPassword];
    this.loginEvent.emit(inputarr);
  }

  getErrorMessage() {
    //if nothing is entered
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    //if email is invalid
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}
