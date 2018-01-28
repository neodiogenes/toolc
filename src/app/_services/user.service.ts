import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class UserService {
    public isUserInactive:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false); 


    setInactiveStatus(isUserInactive){
        this.isUserInactive.next(isUserInactive);
    }
}