import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent { 
  message = '';
  constructor(private http: HttpClient, private router: Router, private loginService: LoginService) { }

  addHighscore() {
    const highscore = Math.floor(Math.random() * 1000) + 1;
    const email = this.loginService.getEmail();
    console.log("🚀 ~ file: landing-page.component.ts:18 ~ LandingPageComponent ~ addHighscore ~ email:", email)

    const highscoreData = {
      email: email,
      highscore: highscore
    };

    this.http.post<any>('http://localhost:3000/highscores', highscoreData).subscribe(
      (response) => {
        this.message = response.message;
      },
      (error) => {
        this.message = error.error.message;
      }
    );
  }

  getHighscore() {
    this.http.get<any>('http://localhost:3000/highscores').subscribe(
      (response) => {
        this.message = JSON.stringify(response.highscores);

      },
      (error) => {
        this.message = error.error.message;
      }
    );
  }

  Logout() {

    this.http.delete<any>('http://localhost:3000/sessions').subscribe(
      (response) => {
          this.message = response.message;
          this.router.navigate(['/login']);
      },
      (error) => {
          this.message = error.error.message;

      }
    );
    
  }
}
