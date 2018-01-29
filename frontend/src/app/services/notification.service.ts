import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class NotificationService {
    notification_subj: Subject<Object>;
    type: string;
    
    constructor(){
        this.notification_subj = new Subject<Object>();
    }

    getNotificationSubj(){
        return this.notification_subj.asObservable();
    }

    resetMessage(){
        this.notification_subj.next({type:'', message: ''});
    }

    getInitMessage(){
        this.notification_subj.next({type:'', message: ''});
    }

    sendSuccessMessage(message){
        this.notification_subj.next({type:'success', message: message});
        setTimeout(()=>{
            this.resetMessage();
        }, 3000);
    }

    sendErrorMessage(message){
        this.notification_subj.next({type:'fail', message: message});
        setTimeout(()=>{
            this.resetMessage();
        }, 3000);
    }
}