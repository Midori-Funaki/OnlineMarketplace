import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

interface Message {
    msgStatus: string;
    message?: string;
    title ?: string;
}

@Injectable()
export class NotificationService {
    notification_subj: Subject<Message>;
    
    constructor(){
        this.notification_subj = new Subject<Message>();
    }

    getNotificationSubj(){
        return this.notification_subj.asObservable();
    }

    resetMessage(){
        this.notification_subj.next({msgStatus: 'hide'});
    }

    getInitMessage(){
        this.notification_subj.next({msgStatus: 'hide', message: '', title: ''});
    }

    sendSuccessMessage(title, message){
        this.notification_subj.next({msgStatus: 'successShow', message: message, title: title});
        setTimeout(()=>{
            this.resetMessage();
        }, 3000);
    }

    sendErrorMessage(title, message){
        this.notification_subj.next({msgStatus: 'failShow', message: message, title: title});
        setTimeout(()=>{
            this.resetMessage();
        }, 3000);
    }
}