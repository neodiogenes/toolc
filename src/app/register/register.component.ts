import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PasswordValidation } from '../_services/passwordvalidation.service';
import { AuthenticationService } from '../_services/authentication.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AppSettings } from '../_services/appsettings';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  tokenId: string;
  tokenValid: boolean = false;
  loading: boolean = false;
  loadingImage: string = AppSettings.LOADING_IMAGE;

  public registrationForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute, private authenticationService: AuthenticationService, private router: Router, public fb: FormBuilder) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
          this.tokenId = params['tokenid'];
          console.log(this.tokenId);
    });

    if (this.tokenId) {
      this.authenticationService.validateToken(this.tokenId)
        .map(response => response.json())
        .subscribe(
          response => {
            console.log(response);
            this.tokenValid = response.response;
            if (this.tokenValid) {
              window.alert("Your account is now active and you may log in");
              this.router.navigate(['/login']);
            }
          },
          error => {
            console.log(error);
            this.tokenValid = false;
          }
      );
    }

    this.registrationForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      newPassword: ["", [Validators.required, Validators.minLength(5)]],
      confirmPassword: ["", Validators.required, Validators.minLength[5]]
      }, {
        validator: PasswordValidation.MatchPassword // your validation method
      })
  }

  onClickSubmit(event) {
    this.loading = true;
    this.authenticationService.register(this.registrationForm.value.email, this.registrationForm.value.newPassword)
      .map(response => response.json())
      .subscribe(
        response => {
          this.loading = false;
          window.alert("Thank you for registering! A link to verify your account has been sent to your email address.");
          this.router.navigate(['/login']);
        },
        error => {
          console.log(error);

        }
      );
  }

}
