import { Observable } from 'rxjs';

	
export function extractData(res: Response) {
    let body = res.json();
    return body || {};
}

export function handleError(error: any) {
    let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
} 