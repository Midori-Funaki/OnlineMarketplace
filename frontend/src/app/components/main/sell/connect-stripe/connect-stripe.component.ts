import { Component, OnInit } from '@angular/core';
import config from './../../../../payment-config';

@Component({
  selector: 'app-connect-stripe',
  templateUrl: './connect-stripe.component.html',
  styleUrls: ['./connect-stripe.component.css']
})
export class ConnectStripeComponent implements OnInit {
  publish_key: string = config.publish_key;
  secret_key: string = config.secret_key;
  client_id: string = config.client_id;
  connectUrl = `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${this.client_id}&scope=read_write`;

  constructor() { }

  ngOnInit() {

  }

}
