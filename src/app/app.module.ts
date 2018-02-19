import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule }    from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
} from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';

// used to create fake backend
import { fakeBackendProvider } from './_helpers/fake-backend';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

import { AppComponent } from './app.component';
import { routing }        from './app.routing';

import { AuthGuard } from './_guards/auth.guard';
import { AuthenticationService }  from './_services/authentication.service';
import { ScheduledReportService } from './_services/scheduledreport.service';
import { DeliveredReportService } from './_services/deliveredreport.service';
import { UserService } from './_services/user.service';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

import { DataTablesModule } from 'angular-datatables';
import { UsersettingsComponent } from './usersettings/usersettings.component';
import { HistoryComponent } from './history/history.component';
import { AdminComponent } from './admin/admin.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        routing,
        DataTablesModule,
        MatMenuModule,
   		MatButtonModule,
    	MatCardModule,
    	MatIconModule,
    	MatInputModule,
    	MatFormFieldModule,
    	MatListModule,
    	MatSelectModule,
    	MatToolbarModule,
    	MatTableModule,
    	MatSidenavModule
  ],
  declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent,
        UsersettingsComponent,
        AdminComponent,
        HistoryComponent,
        ResetpasswordComponent,
        RegisterComponent
  ],
  providers: [
        AuthGuard,
        AuthenticationService,
        ScheduledReportService,
        DeliveredReportService,
        UserService,
        BaseRequestOptions

        // providers used to create fake backend
        //fakeBackendProvider,
        //MockBackend,
        //BaseRequestOptions
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
