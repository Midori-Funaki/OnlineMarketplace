import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})

export class NotificationComponent implements OnInit {

  message: Object;

  constructor(private notificationService:NotificationService) {
    this.notificationService.getNotificationSubj().subscribe(msg=>{
      this.message = msg;
    });
  }

  ngOnInit() {
    this.notificationService.getInitMessage();
  }

}
