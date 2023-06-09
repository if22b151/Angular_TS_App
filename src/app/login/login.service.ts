import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private authToken: string = '';
  private email: string = '';

  constructor() { }

  setAuthToken(token: string) {
    this.authToken = token;
  }

  getAuthToken() {
    return this.authToken;
  }

  setEmail(email: string) {
    this.email = email;
  }

  getEmail() {
    return this.email;
  }
}
