import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../_services/authentication.service';

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    error = '';

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService) {
    
    	this.model.username="admin111@toolc.com";
    	this.model.password="password";
    }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
        	.subscribe(
        		(result) => {
	                if (result === true) {
	                    this.router.navigate(['/']);
	                } else {
	                    this.error = 'Username or password is incorrect';
	                    this.loading = false;
	                }
	            },
	            (err) => {	            	
	            	this.error = 'Username or password is incorrect';
	                this.loading = false;
	            }
        	);
    }
}
