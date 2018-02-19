import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DeliveredReportService } from '../_services/deliveredreport.service';
import { DeliveredReport } from '../_models/deliveredreport';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  reports: DeliveredReport[];
  dtOptions: DataTables.Settings = {};
	dtTrigger: Subject<any> = new Subject();
  
  constructor(private reportService: DeliveredReportService) { }

  ngOnInit() {
    this.dtOptions= {
      searching: false
    };

    this.reportService.getDeliveredReports()
            .subscribe(
                reports => {
                    this.reports = reports;
                    this.dtTrigger.next();
                },
                error => {
                  console.log(error);
                }
            );
  }

}
