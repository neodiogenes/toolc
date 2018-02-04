import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { PasswordValidation } from '../_services/passwordvalidation.service';
import { AuthenticationService } from '../_services/authentication.service';
import { UserValidationObject } from '../_models/uservalidationobject';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  model: any = {};
  loading = false;
  error = '';

  tokenId: any;
  tokenValid: boolean = false;

  public passwordResetForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute, private authenticationService: AuthenticationService, private router: Router, public fb: FormBuilder) { }

  ngOnInit() {
    // subscribe to router event
    this.activatedRoute.params.subscribe((params: Params) => {
          this.tokenId = params['tokenid'];
    });

    this.authenticationService.validateToken(this.tokenId)
      .map(response => response.json())
      .subscribe(
        response => {
          console.log(response);
          this.tokenValid = response.response;
        },
        error => {
          console.log(error);
          this.tokenValid = false;
        }
    );

    this.passwordResetForm = this.fb.group({
      newPassword: ["", [Validators.required, Validators.minLength(5)]],
      confirmPassword: ["", Validators.required, Validators.minLength[5]]
      }, {
        validator: PasswordValidation.MatchPassword // your validation method
      })
  }

  onClickSubmit(){
    if (this.tokenValid){

        let validationObject: UserValidationObject = {
          id: this.tokenId,
          username: '',
          password: this.passwordResetForm.value.newPassword
        }

        this.authenticationService.validateUser(validationObject)
          .map(response => response.json())
          .subscribe(
            response => {
              if (response.response){
                window.alert("Your password has been changed");
                this.router.navigate(['/login']);

              } else {
                this.tokenValid = false;
              }
            },
            error => {
              console.log(error);

            }
          );
    } else {
      this.tokenValid = false;
    }
  }
}
