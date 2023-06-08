import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private authToken: string = '';

  constructor() { }

  setAuthToken(token: string) {
    this.authToken = token;
  }

  getAuthToken() {
    return this.authToken;
  }
}
