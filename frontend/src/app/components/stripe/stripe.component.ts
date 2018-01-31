import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StripeService } from '../../services/stripe.service';


@Component({
  selector: 'app-stripe',
  templateUrl: './stripe.component.html',
  styleUrls: ['./stripe.component.css']
})
export class StripeComponent implements OnInit {
  params: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private stripeService: StripeService
  ) { }

  ngOnInit() {
  }

  responseHandler() {
    this.params = this.activatedRoute.snapshot.queryParams;
    // console.log(this.params);
    if (this.params.error_description) {
      alert("Authorization denied");
      this.router.navigate(['/home']);
    } else if (this.params.code) {
      this.stripeService.register(this.params.code);
    }
  }

}
