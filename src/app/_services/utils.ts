import { Observable } from 'rxjs';
import { FormArray } from '@angular/forms';
	
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

export function clearFormArray (formArray: FormArray)  {
    while (formArray.length !== 0) {
        formArray.removeAt(0)
    }

    return formArray;
}