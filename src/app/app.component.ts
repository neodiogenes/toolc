import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tool C Webapp';
  sidenavOpened: boolean = true;
  userIsAdmin: boolean = true;
  
  clickMenuArrow($event) {
  	this.sidenavOpened = !this.sidenavOpened;
  }
  
  
}
