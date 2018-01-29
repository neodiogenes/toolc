	import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { UserValidationObject } from '../_models/uservalidationobject';

@Injectable()
export class AuthenticationService {
    public token: string;

    constructor(private http: Http) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    login(username: string, password: string): Observable<boolean> {
        return this.http.post('/api/login', JSON.stringify({ username: username, password: password }))
            .map((response: Response) => {
            	
                if(response.status < 200 || response.status >= 300) {
                	console.log(response.status);
                	
                	// return false to indicate failed login
                	return false;
                }
                
                let token = response.headers.get('authorization'); //response.json() &&  && response.json().token;
                if (token) {
                    // set token property
                    this.token = token;

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));

                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }

    forgotPassword(username: string): Observable<boolean> {
        return this.http.post('/api/users/reset', username)
            .map((response: Response) => {
            	
                if(response.status < 200 || response.status >= 300) {
                	console.log(response.status);
                	
                	// return false to indicate failed rest call
                	return false;
                } else {
                    return true;
                }
            });        
    }


    validateToken(tokenId: string) : Observable<any> {	  
    	let body = JSON.stringify(tokenId);
	    let headers = new Headers({'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers }); 
         
	    return this.http.post('/api/users/validate/token/', body, options)
            .map((response: Response) => {            	
                if(response.status < 200 || response.status >= 300) {
                	console.log(response.status);
                	return false;
                } else {
                    return response;
                }
            }); 
    }
 
    validateUser(validationObject: UserValidationObject) : Observable<any> {	  
    	let body = JSON.stringify(validationObject);
	    let headers = new Headers({'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers }); 
         
	    return this.http.post('/api/users/validate/user/', body, options)
            .map((response: Response) => {            	
                if(response.status < 200 || response.status >= 300) {
                	console.log(response.status);
                	return false;
                } else {
                    return response;
                }
            }); 
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }
}