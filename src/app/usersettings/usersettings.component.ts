import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './usersettings.component.html',
  styleUrls: ['./usersettings.component.css']
})
export class UsersettingsComponent implements OnInit {

  public userDetailForm: FormGroup;

  constructor(public fb: FormBuilder, public userService: UserService) { }

  ngOnInit() {
    this.userDetailForm = this.fb.group({
      ftpPort: ["21"],
      ftpUrl: [""],
      ftpLogin: [""],
      ftpPassword: [""],
      sftpPort: ["22"],
      sftpUrl: [""],
      sftpLogin: [""],
      sftpPassword: [""],
      apiUrl: [""],
      apiLogin: [""],
      apiPassword: [""],
      additionalEmails: [""]
    });

    this.loadDetails();
  }

  doSubmit(event){
    this.userService.updateDetails(this.userDetailForm.value)
          .map(response => response.json())
          .subscribe(
            response => {
              if (response.response == "1"){
                window.alert("Your user settings haves been changed");

              } else {
                window.alert("There was an error updating your settings");
              }
            },
            error => {
              console.log(error);

            }
          );
  }

  loadDetails(){
    this.userService.getDetails()
          .map(response => response.json())
          .subscribe(
            response => {
              this.userDetailForm.patchValue ({
                ftpPort: response.ftpPort,
                ftpLogin: response.ftpLogin,
                ftpPassword: response.ftpPassword,
                sftpPort: response.sftpPort,
                sftpLogin: response.sftpLogin,
                sftpPassword: response.sftpPassword,
                additionalEmails: response.additionalEmails
              });
            },
            error => {
              console.log(error);

            }
          );
  }

}
