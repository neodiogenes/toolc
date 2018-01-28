import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../_services/authentication.service';
import { UserService } from '../_services/user.service';

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    error = '';
    isUserInactive: boolean;
    forgotUsernameText: string = "";

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService) {
    
    	this.model.username="admin111@toolc.com";
        this.model.password="password";
        
        this.userService.isUserInactive.subscribe(value => this.isUserInactive = value);
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

    onClickForgotPassword(event){
        console.log(event);

        if (!this.model.username) {
            this.forgotUsernameText = "Your username is your email address.  Please enter it in the form above.";
        } else {
            this.forgotUsernameText = "A link to reset your password has been sent to your email address.";
        }

        //Stop the link from opening in a new page
        event.preventDefault();
    }
}
