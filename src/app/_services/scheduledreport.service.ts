import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AuthenticationService } from './authentication.service';
import { ScheduledReport } from '../_models/scheduledReport';

@Injectable()
export class ScheduledReportService {
    constructor(
        private http: Http,
        private authenticationService: AuthenticationService) {
    }
    
    getScheduledReports(): Observable<ScheduledReport[]> {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });

        // get scheduled reports from api
        return this.http.get('/api/reports/all', options)
            .map((response: Response) => {
            	return <ScheduledReport[]> response.json();
            });
    }
    
    update(url: string, param: any) : Observable<any> {
    	let body = JSON.stringify(param);
	    let headers = new Headers({ 'Authorization': this.authenticationService.token, 'Content-Type': 'application/json' });
	    let options = new RequestOptions({ headers: headers });
	    
	    return this.http
	        .put('/api/reports/' + param.id, body, options)
	        .map(this.extractData)
	        .catch(this.handleError);
	}
    
    create(url: string, param: any) : Observable<any> {
    	let body = JSON.stringify(param);
	    let headers = new Headers({ 'Authorization': this.authenticationService.token, 'Content-Type': 'application/json' });
	    let options = new RequestOptions({ headers: headers });
	    
	    return this.http
	        .post('/api/reports/', body, options)
	        .map(this.extractData)
	        .catch(this.handleError);
    }
    
    delete(url: string, param: any) : Observable<any> {
	    let headers = new Headers({ 'Authorization': this.authenticationService.token, 'Content-Type': 'application/json' });
	    let options = new RequestOptions({ headers: headers });
	    
	    return this.http
	        .delete('/api/reports/' + param.id, options)
	        .map(this.extractData)
	        .catch(this.handleError);
    }
	
	viewFile(id: string, param: any) : Observable<any> {
    	let body = JSON.stringify(param);
	    let headers = new Headers({ 'Authorization': this.authenticationService.token, 'Content-Type': 'application/json' });
	    let options = new RequestOptions({ headers: headers });
	    
	    return this.http
	    	.get('/api/reports/file/' + param.id, { responseType: ResponseContentType.Blob })
	    	.map(res => res.blob())
	    	.catch(this.handleError);
	}
	
    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }    
}