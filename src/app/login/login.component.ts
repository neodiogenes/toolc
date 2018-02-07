import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../_services/authentication.service';
import { UserService } from '../_services/user.service';
import { AppSettings } from '../_services/appsettings';

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    public loadingImage:string = AppSettings.LOADING_IMAGE;
        
    model: any = {};
    loading: boolean = false;
    resetPasswordLoading: boolean = false;
    resetPasswordSuccess: boolean = false;
    resetPasswordDivClass: string = "alert alert-danger";

    error = '';
    isUserInactive: boolean;
    forgotUsernameText: string = "";

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService) {
    
    	this.model.username="alteraa@yahoo.com";
        this.model.password="password";
        
        this.userService.isUserInactive.subscribe(value => this.isUserInactive = value);
    }

    ngOnInit() {
        // reset login status
        this.authenticationService.setLoggedInStatus(false);
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
        this.resetPasswordSuccess = false;
        this.resetPasswordLoading = true;

        if (!this.model.username) {
            this.forgotUsernameText = "Your username is your email address.  Please enter it in the form above.";

        } else {
            this.authenticationService.forgotPassword(this.model.username)    
                .subscribe(
                    response => {
                        this.resetPasswordLoading = false;
                        if (response) {
                            this.resetPasswordSuccess = true;
                            this.resetPasswordDivClass = "alert alert-success";
                            this.forgotUsernameText = "A link to reset your password has been sent to your email address.";
                        } else {
                            this.resetPasswordSuccess = true;
                            this.forgotUsernameText = "There was an error";
                        }
                    },
                    error => {
                        this.resetPasswordSuccess = true;
                        this.resetPasswordLoading = false;
                        this.forgotUsernameText = "There was an error";
                    }
            );
            
        }

        //Stop the link from opening in a new page
        event.preventDefault();
    }

    onClickRegister(event) {
        this.router.navigate(['/register']);
        event.preventDefault();
    }
}
