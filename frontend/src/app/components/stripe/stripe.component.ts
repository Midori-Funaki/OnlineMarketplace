import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StripeService } from '../../services/stripe.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import config from './../../payment-config';

@Component({
  selector: 'app-stripe',
  templateUrl: './stripe.component.html',
  styleUrls: ['./stripe.component.css']
})
export class StripeComponent implements OnInit {
  publish_key: string = config.publish_key;
  secret_key: string = config.secret_key;
  client_id: string = config.client_id;

  params: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private stripeService: StripeService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.responseHandler();
  }

  responseHandler() {
    this.params = this.activatedRoute.snapshot.queryParams;
    // console.log(this.params);
    if (this.params.error_description) {
      alert("Authorization denied");
      this.router.navigate(['/home']);
    } else if (this.params.code) {
      this.stripeService.register(this.params.code).subscribe(res => {
        console.log(res);
      })
    }
  }

}
