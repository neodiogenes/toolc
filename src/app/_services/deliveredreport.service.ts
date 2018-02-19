import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AuthenticationService } from './authentication.service';
import { DeliveredReport } from '../_models/deliveredReport';

@Injectable()
export class DeliveredReportService {
    constructor(
        private http: Http,
        private authenticationService: AuthenticationService) {
    }

    getDeliveredReports(): Observable<DeliveredReport[]> {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });

        // get scheduled reports from api
        return this.http.get('/api/history/all', options)
            .map((response: Response) => {
            	return <DeliveredReport[]> response.json();
            });
    }
}