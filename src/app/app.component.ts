import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Login';
  outputarr = [];

  toOutput(event: any) {
    this.outputarr = event;
    
  }
}
