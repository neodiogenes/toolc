import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http, Headers, RequestOptions, Response, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class UserService {
    public isUserInactive:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false); 

    constructor(
        private http: Http,
        private authenticationService: AuthenticationService) {}
   
    setInactiveStatus(isUserInactive){
        this.isUserInactive.next(isUserInactive);
    }

    updateDetails(param: any) : Observable<any> {
    	let body = JSON.stringify(param);
	    let headers = new Headers({ 'Authorization': this.authenticationService.token, 'Content-Type': 'application/json' });
	    let options = new RequestOptions({ headers: headers });
	    
	    return this.http
	        .put('/api/users/details', body, options)
            .map((response: Response) => {
            	
                if(response.status < 200 || response.status >= 300) {
                	console.log(response.status);
                }
                return response;
            });
    }
    
    getDetails() : Observable<any> {
	    let headers = new Headers({ 'Authorization': this.authenticationService.token, 'Content-Type': 'application/json' });
	    let options = new RequestOptions({ headers: headers });
	    
	    return this.http
	        .get('/api/users/details', options)
            .map((response: Response) => {
            	
                if(response.status < 200 || response.status >= 300) {
                	console.log(response.status);
                }
                return response;
            });
	}
}