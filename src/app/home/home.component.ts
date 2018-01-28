import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { User } from '../_models/user';
import { ScheduledReport } from '../_models/scheduledreport';
import { ScheduledReportService } from '../_services/scheduledreport.service';
import { UserService } from '../_services/user.service';
import { saveAs } from "file-saver";
import { Subject } from 'rxjs/Subject';
import {MatTableDataSource} from '@angular/material';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'dashboard',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})

export class HomeComponent implements OnInit {
    reports: ScheduledReport[] = [];
    
    //dataSource: MatTableDataSource<ScheduledReport>;
    
    currentReport: ScheduledReport = null;
	dtOptions: DataTables.Settings = {};
	dtTrigger: Subject<any> = new Subject();
	
    public formatOptions = [
	    { value: 'PDF', display: 'PDF' },
	    { value: 'CSV', display: 'CSV' },
	    { value: 'PNG', display: 'PNG' }	
	];
	
	public scheduleOptions = [
	    { value: 'Daily', display: 'Daily' },
	    { value: 'Weekly', display: 'Weekly' },
	    { value: 'Monthly', display: 'Monthly' }	
	];
	
	public deliveryOptions = [
	    { value: 'Email', display: 'Email' },
	    { value: 'Link', display: 'Link' },
	    { value: 'FTP', display: 'FTP' }	
	];
	
	public dayOfWeekOptions = 	['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
	public timeOfDayOptions = [];
	public dayOfMonthOptions = [];
	
	formDetailOpened: Boolean = false;
	showDayOfWeek: Boolean = false;
	showDayOfMonth: Boolean = false;
    isAddReportForm: Boolean = true;    
	
	public reportDetailForm: FormGroup; 
	
    constructor(private reportService: ScheduledReportService, public fb: FormBuilder, private router: Router, private userService: UserService) { }


    onClickTest() {
        this.userService.setInactiveStatus(true);
        this.router.navigate(['/login']);
    }

    ngOnInit() {
        this.initReportDetailForm();
        
    	this.dtOptions= {
    		searching: false, 
    		columnDefs: [{
    			targets: [4, 5, 6],
				orderable: false 
			}]
		};
        
        for (var i=1; i<=30; i++){
        	this.dayOfMonthOptions.push(i);
        }

        // get list of reports belonging to this user from the ToolC REST service
        // log the user out if the JWT is not valid
        this.reportService.getScheduledReports()
            .subscribe(
                reports => {
                    this.reports = reports;
                    this.dtTrigger.next();

                    //this.dataSource = new MatTableDataSource();
                    //this.dataSource.data = reports;
                },
                error => {
                    console.log(error.status);
                    this.router.navigate(['/login']);
                }
            );
            

    }
    
    doSubmit(event) {
    	this.updateCurrentReport();
    	console.log(this.currentReport);    	
    	
        if (this.isAddReportForm) {
            console.log(this.currentReport.name);
            this.currentReport.index=0;
            
            this.reportService
                .create('', this.currentReport)
                .subscribe(
                    result => {
                    	console.log(result);
                    	this.reports.unshift(result);
                    }
            );
            
        }
        else {            
            this.reportService
                .update('', this.currentReport)
                .subscribe(
                    result => {
                    	console.log(result);
                    	this.reports[this.currentReport.index] = result;
                    }
            );
        }
        
        this.initReportDetailForm();        
        this.formDetailOpened = false;
    }
    
    onClickCancel(event) {
        this.formDetailOpened = false;
    }
        
    onClickAddReport(event){
        this.currentReport = new ScheduledReport();
        
        /*this.currentReport.name = "Test Report 12345";
        this.currentReport.url = "http://someurl.com/myreport";
        this.currentReport.delivery = "Email";
        this.currentReport.format = "PDF";
        this.currentReport.scheduleType = "Daily"; */

        this.formDetailOpened = true;
        this.isAddReportForm = true;
        this.updateReportDetailForm(); 
    }
    
    onClickEdit(index) {
        this.formDetailOpened = true;
        this.isAddReportForm = false;
        
    	//var target = event.target || event.srcElement || event.currentTarget;
    	//var index = target.attributes.name.value;
    	this.currentReport = this.reports[index];
    	this.currentReport.index = index;
    	
        this.updateReportDetailForm();
    	
    	this.hideShowScheduleDetail(this.reportDetailForm.value.scheduleType);
    }
       
    onClickView(index) {
        console.log("Show preview for report: '" + this.reports[index].name + "'");
        
        window.open(this.reports[index].url, "_blank");

/*         this.reportService.viewFile('', this.reports[index])                
			.subscribe(
			      (data) => {
                        var filename = this.reports[index].id + "_" + (new Date()).getTime();
                        //use file-saver methods to download report
				        saveAs(data, filename);
			      }); */
    }

    onClickRemove(index){
        console.log("Remove report: '" + this.reports[index].name + "'  (not yet implemented)");
/*         this.reportService
            .delete('', this.reports[index])                
            .subscribe(
                result => {
                    console.log(result);
                    if (result)
                        this.reports.splice(index, 1);
                }
        ); */
    }
    
    onScheduleChange(event) {
    	if (event && event.target && event.target.value) {
    		this.hideShowScheduleDetail(event.target.value);
    	} else {
    		this.hideShowScheduleDetail(this.reportDetailForm.value.scheduleType);
    	}
    }
    
    hideShowScheduleDetail(scheduleType){
    	if (scheduleType == "Weekly") {
    		this.showDayOfWeek = true;
    		this.showDayOfMonth = false;
    	} else if (scheduleType == "Monthly") {
    		this.showDayOfWeek = false;
    		this.showDayOfMonth = true;
    	} else {
    		this.showDayOfWeek = false;
    		this.showDayOfMonth = false;
    	}
    }
    
    initReportDetailForm() {
        this.reportDetailForm = this.fb.group({
            id: [""],
            name: ["", [Validators.required, Validators.minLength(5)]],
            url: ["", Validators.required],
            format: ["PDF", Validators.required],
            delivery: ["Email", Validators.required],
            scheduleType: ["Daily", Validators.required],
            dayOfWeek: ["Monday"],
    		timeOfDay: ["0900"],
    		dayOfMonth: [1],
            owner: this.fb.group({
                id: [""]
            })
        });
    }
    
    updateReportDetailForm(){
    	this.reportDetailForm.patchValue({
           id: this.currentReport.id,
           name: this.currentReport.name,
           url: this.currentReport.url,
           format: this.currentReport.format,
           delivery: this.currentReport.delivery,
           scheduleType: this.currentReport.scheduleType,
           dayOfWeek: this.currentReport.dayOfWeek,
           dayOfMonth: this.currentReport.dayOfMonth,
           owner: {
               id: this.currentReport.owner.id
           }
       });
    }

    updateCurrentReport(){
    	this.currentReport.id = this.reportDetailForm.value.id;
    	this.currentReport.name = this.reportDetailForm.value.name;
    	this.currentReport.url = this.reportDetailForm.value.url;
    	this.currentReport.format = this.reportDetailForm.value.format;
    	this.currentReport.delivery = this.reportDetailForm.value.delivery;
    	this.currentReport.scheduleType = this.reportDetailForm.value.scheduleType;
    	this.currentReport.dayOfWeek = this.reportDetailForm.value.dayOfWeek;
    	this.currentReport.dayOfMonth = this.reportDetailForm.value.dayOfMonth;
    	
		if (this.reportDetailForm.value.owner && this.currentReport.owner) {    	
    		this.currentReport.owner.id = this.reportDetailForm.value.owner.id;
    	}
    }
}