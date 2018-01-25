import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
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
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

import { DataTablesModule } from 'angular-datatables';
import { SettingsComponent } from './settings/settings.component';
import { HistoryComponent } from './history/history.component';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  exports: [
    CdkTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
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
  ],
  declarations: [SettingsComponent, HistoryComponent, AdminComponent]
})
export class DemoMaterialModule {}

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
        SettingsComponent,
        AdminComponent,
        HistoryComponent
  ],
  providers: [
        AuthGuard,
        AuthenticationService,
        ScheduledReportService,
        BaseRequestOptions

        // providers used to create fake backend
        //fakeBackendProvider,
        //MockBackend,
        //BaseRequestOptions
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
