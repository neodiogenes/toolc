import { Component } from '@angular/core';
import { AuthenticationService } from './_services/authentication.service';
import { AppSettings } from './_services/appsettings';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = AppSettings.TITLE;
  sidenavOpened: boolean = true;
  isUserAdmin: boolean = true;
  isUserLoggedIn: boolean = false;
  
  constructor(private authenticationService: AuthenticationService){
    this.authenticationService.isUserLoggedIn.subscribe(value => this.isUserLoggedIn = value);
  }

  clickMenuArrow($event) {
  	this.sidenavOpened = !this.sidenavOpened;
  }
}
