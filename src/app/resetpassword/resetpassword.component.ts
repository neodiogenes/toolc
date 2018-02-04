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

  constructor(private activatedRoute: ActivatedRoute, private authenticationService: AuthenticationService, private router: Router, public fb: FormBuilder,) { }

  ngOnInit() {
    // subscribe to router event
    this.activatedRoute.params.subscribe((params: Params) => {
          this.tokenId = params['tokenid'];
          console.log(this.tokenId);
    });

    this.authenticationService.validateToken(this.tokenId)
      .map(response => response.json())
      .subscribe(
        response => {
          console.log(response);
          this.tokenValid = response.response;
        },
        error => {
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
    ;
    if (this.tokenValid){
        console.log(this.passwordResetForm.value.newPassword);

        let validationObject: UserValidationObject = {
          id: this.tokenId,
          username: '',
          password: this.passwordResetForm.value.newPassword
        }

        this.authenticationService.validateUser(validationObject)
          .subscribe(
            response => {
              console.log(response);
              if (response.response){
                this.router.navigate(['/login']);
              }
            },
            error => {
              console.log(error);
            }
          );
    }
  }
}
