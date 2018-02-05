import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ProductsService } from '../../../services/products.service';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/User';

@Component({
  selector: 'app-sell-list',
  templateUrl: './sell-list.component.html',
  styleUrls: ['./sell-list.component.css']
})
export class SellListComponent implements OnInit {
  products:Observable<string[]>;
  user: User
  isConnectedAccount: boolean = false;

  constructor(
    private productService:ProductsService,
    private userService:UserService
  ) { }

  ngOnInit() {
    this.products = this.productService.getSellProducts();
    this.userService.getUser().subscribe(user => {
      this.user = user;
      if (this.user.stripeId) {
        this.isConnectedAccount = true;
      }
    })
  }

}
