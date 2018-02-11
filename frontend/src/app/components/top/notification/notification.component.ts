import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../services/notification.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

interface Message {
  msgStatus: string;
  message?: string;
  title ?: string;
}

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  animations:[
    trigger('Notification', [
      state('successShow', style({
        // background: 'rgba(0, 128, 0, 0.500)',
        border:'2px solid rgb(137,212,26)',
        opacity: 1
      })),
      state('failShow', style({
        // background: 'rgba(255, 0, 0, 0.500)',
        border:'2px solid rgb(255,36,0)',
        opacity: 1
      })),
      state('hide', style({
        opacity: 0
      })),
      transition('hide => successShow', animate('200ms ease-in')),
      transition('hide => failShow', animate('200ms ease-in')),
      transition('successShow => hide', animate('600ms ease-out')),
      transition('failShow => hide', animate('600ms ease-out')),
    ]),
    trigger('failMessage', [
      state('show', style({
        opacity: 1
      })),
      state('hide', style({
        opacity: 0
      })),
      transition('hide => show', animate('600ms ease-in')),
      transition('show => hide', animate('600ms ease-out'))
    ]),
  ]
})

export class NotificationComponent implements OnInit {

  message: Message;

  constructor(private notificationService:NotificationService) {
    this.notificationService.getNotificationSubj().subscribe(msg=>{
      this.message = msg;
    });
  }

  ngOnInit() {
    this.notificationService.getInitMessage();
  }

  get CurrentNotification() {
    return this.message.msgStatus;
  }

}
