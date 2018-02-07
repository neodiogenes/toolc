import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormArray, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { ScheduledReport } from '../_models/scheduledreport';
import { ReportFilter } from '../_models/reportfilter';
import { ScheduledReportService } from '../_services/scheduledreport.service';
import { UserService } from '../_services/user.service';
import { saveAs } from "file-saver";
import { clearFormArray } from '../_services/utils';

@Component({
    moduleId: module.id,
    selector: 'dashboard',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})

export class HomeComponent implements OnInit {
    reports: ScheduledReport[] = []; 
        
    currentReport: ScheduledReport = null;
	dtOptions: DataTables.Settings = {};
	dtTrigger: Subject<any> = new Subject();
	
    public formatOptions = [
	    { value: 'PDF', display: 'PDF' },
	    { value: 'CSV', display: 'CSV' },
        { value: 'PNG', display: 'PNG' },
        { value: 'TXT', display: 'TXT'}	
	];
	
	public scheduleOptions = [
	    { value: 'Daily', display: 'Daily' },
	    { value: 'Weekly', display: 'Weekly' },
	    { value: 'Monthly', display: 'Monthly' }	
	];
	
	public deliveryOptions = [
	    { value: 'Email', display: 'Email' },
	    { value: 'Link', display: 'Link' },
	    { value: 'FTP', display: 'FTP' },
	    { value: 'SFTP', display: 'SFTP' },
	    { value: 'API', display: 'API' }	
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

    ngOnInit() {
        this.initReportDetailForm();
        
    	this.dtOptions= {
    		searching: false, 
    		columnDefs: [{
    			targets: [4, 5],
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
                    this.reports = this.parseReports(reports);
                },
                error => {
                    if (error.status == 403) {
                        this.userService.setInactiveStatus(true);
                    }
                    this.router.navigate(['/login']);
                }
            );
            

    }

    parseReports(reports: ScheduledReport[]) {
        reports.forEach( (report) => {
            this.parseReport(report);
        });

        return reports;
    }
    
    parseReport(report: ScheduledReport) {
        if (report.filters){
            report.parsedFilters = JSON.parse(report.filters);
        } else {
            report.parsedFilters = [];
        }

        return report;
    }

    doSubmit(event) {
    	this.updateCurrentReport(); 	
    	
        if (this.isAddReportForm) {
            console.log(this.currentReport.name);
            this.currentReport.index=0;
            
            this.reportService
                .create('', this.currentReport)
                .subscribe(
                    result => {
                    	this.reports.unshift(this.parseReport(result));
                    }
            );
            
        }
        else {            
            this.reportService
                .update('', this.currentReport)
                .subscribe(
                    result => {
                    	this.reports[this.currentReport.index] = this.parseReport(result);
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
        this.formDetailOpened = true;
        this.isAddReportForm = true;
        this.updateReportDetailForm(); 
    }
    
    onClickEdit(index) {
        this.formDetailOpened = true;
        this.isAddReportForm = false;
    	this.currentReport = this.reports[index];
        this.currentReport.index = index;

        console.log(JSON.parse(this.currentReport.emails));
    	
        this.updateReportDetailForm();
    	
    	this.hideShowScheduleDetail(this.reportDetailForm.value.scheduleType);
    }
       
    onClickView(index) {
        console.log("Show preview for report: '" + this.reports[index].name + "'");
        
        window.open(this.reports[index].url, "_blank");
    }

    onClickRemove(index){
        if(window.confirm('Are sure you want to delete this item?')){
            //console.log("Remove report: '" + this.reports[index].name + "'  (not yet implemented)");
            this.reportService
                .delete('', this.reports[index])                
                .subscribe(
                    result => {
                        console.log("Removed report: '" + this.reports[index].name + "'");
                        if (result)
                            this.reports.splice(index, 1);
                    }
            ); 
        }
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
            url: ["", [Validators.required, Validators.minLength(5)]],
            format: ["PDF", Validators.required],
            delivery: ["Email", Validators.required],
            scheduleType: ["Daily", Validators.required],
            dayOfWeek: ["Monday"],
    		timeOfDay: ["0900"],
    		dayOfMonth: [1],
            owner: this.fb.group({
                id: [""]
            }),
            emails: [""],
            filters: this.fb.array([this.initFilter('', '')])
        });
    }
    
    initFilter(name, value): FormGroup {
        return this.fb.group ({
            name: name,
            value: value
        });
    }

    initEmails(email): FormGroup {
        return this.fb.group({
            email: email
        });
    }

    onClickAddFilter(){
        var filters = this.reportDetailForm.get('filters') as FormArray;
        filters.push(this.initFilter('', ''));
    }

    onClickRemoveFilter(index){
        var filters = this.reportDetailForm.get('filters') as FormArray;
        filters.removeAt(index);
    }

    updateReportDetailForm(){
        
        //Convert the JSONArray to a comma-delimited string
        let emailList: string = "";
        if (this.currentReport.emails){
            emailList = JSON.parse(this.currentReport.emails)
                .map(email => email)
                .join(', ');
        }

    	this.reportDetailForm.patchValue({
           id: this.currentReport.id,
           name: this.currentReport.name,
           url: this.currentReport.url,
           format: this.currentReport.format,
           delivery: this.currentReport.delivery,
           scheduleType: this.currentReport.scheduleType,
           dayOfWeek: this.currentReport.dayOfWeek,
           dayOfMonth: this.currentReport.dayOfMonth,
           
           emails: emailList, 
           
           owner: {
               id: this.currentReport.owner.id
           }
        });

        //Convert the JSONArray to a FormArray
        var filters = this.reportDetailForm.get('filters') as FormArray;
        filters = clearFormArray(filters);
        if (this.currentReport.parsedFilters) {
            this.currentReport.parsedFilters.forEach( (element) => {
                filters.push(this.initFilter(element.name, element.value))
            });
        }
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
        
        //Convert the comma-delimited string back to a JSONArray
        this.currentReport.emails = JSON.stringify(
            this.reportDetailForm.value.emails
            .replace( /,$/, "" )
            .replace( " ", "")
            .split(","));
        
        //Convert the FormArray to a JSONArray of ScheduledReportFilter objects
        this.currentReport.parsedFilters = [];
        var filters = this.reportDetailForm.get('filters') as FormArray;
        filters.controls
            .forEach(element => 
                this.currentReport.parsedFilters.push(new ReportFilter(element.value.name, element.value.value))
            );
        this.currentReport.filters = JSON.stringify(this.currentReport.parsedFilters);

        console.log(this.currentReport);
    }
}