import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/User';
import { CheckoutService } from '../../../services/checkout.service';
import { Product } from '../../../models/Product';
import { TransactionService } from '../../../services/transaction.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-detail',
  templateUrl: './checkout-detail.component.html',
  styleUrls: ['./checkout-detail.component.css']
})
export class CheckoutDetailComponent implements OnInit {
  user: User
  items: any[]; //cart object with Product sub object
  grandTotal: number;
  checkoutForm: FormGroup;
  // sellersTransfer: any[];

  constructor(
    private userService: UserService,
    private checkoutService: CheckoutService,
    private transactionService: TransactionService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getItems()
      .then(_ => this.getTotal());
    this.getUser()
      .then(_ => {
        this.checkoutForm = new FormGroup({
          billInfo: new FormGroup({
            firstName: new FormControl(this.user.firstName, Validators.required),
            lastName: new FormControl(this.user.lastName, Validators.required),
            address: new FormControl(this.user.billingAddress, Validators.required),
            address2: new FormControl(null),
            contact: new FormControl(null, Validators.required)
          }),
          shipInfo: new FormGroup({
            firstName: new FormControl(this.user.firstName, Validators.required),
            lastName: new FormControl(this.user.lastName, Validators.required),
            address: new FormControl(this.user.shippingAddress, Validators.required),
            address2: new FormControl(null),
            contact: new FormControl(null, Validators.required)
          })
        });
      })
    this.checkoutService.paymentComplete$.subscribe(charge => {
      if (charge) {
        console.log(charge);
        this.emptyCart();
        this.createTransactions(charge, this.items, this.checkoutForm.value);
        this.router.navigate(['complete']);
      }
    })
  }

  getItems() {
    return this.checkoutService.getCartItems().toPromise().then(items => {
      // console.log(items);
      this.items = items;
    });
  }

  getUser() {
    return this.userService.getUser().toPromise().then(
      user => {
        this.user = user;
      }
    )
  }

  getTotal(): void {
    this.grandTotal = 0;
    for (let item of this.items) {
      this.grandTotal += item.Product.currentAskPrice * item.quantity;
    }
  }

  createTransactions(charge, items, form) {
    // console.log(form);
    for (let item of this.items) {
      let transaction = {
        status: 1,
        price: item.Product.currentAskPrice,
        quantity: item.quantity,
        buyerFirstName: form.shipInfo.firstName,
        buyerLastName: form.shipInfo.lastName,
        buyerContact: form.shipInfo.contact,
        buyerShipAddress: form.shipInfo.address,
        buyerShipAddress2: form.shipInfo.address2,
        buyerBillAddress: form.billInfo.address,
        buyerBillAddress2: form.billInfo.address2,
        sellerId: item.Product.sellerId,
        productId: item.Product.id,
        chargeId: charge.id
      };
      this.transactionService.create(transaction).subscribe(transaction => console.log(transaction));
    }
  }

  onSubmit() {
    if (this.checkoutForm.invalid) {
      // Forbid the form from submitting if it is invalid.
      return;
    }
    // console.log("Items: ", this.items);
    // console.log(this.checkoutForm.value)
    // console.log("total", this.grandTotal);
    // console.log(this.createTransfer(this.items));
    this.openCheckOut(this.grandTotal * 100)
  }

  openCheckOut(grandTotal) {
    // this.sellersTransfer = this.createTransfer(this.items);
    return this.checkoutService.openCheckout(grandTotal);
  }

  // // private methods:
  // private createTransfer(items) {
  //   let transfers = []
  //   for (let item of items) {
  //     let inArray = false;
  //     for (let i = 0; i < transfers.length; i++) {
  //       if (transfers[i].id == item.Product.User.id) {
  //         transfers[i].amount += item.Product.currentAskPrice * item.quantity;
  //         inArray = true;
  //       }
  //     }
  //     if (inArray == false) {
  //       transfers.push({
  //         id: item.Product.User.id,
  //         stripeId: item.Product.User.stripeId,
  //         amount: item.Product.currentAskPrice * item.quantity
  //       })
  //     }
  //   }
  //   return transfers;
  // }

  private emptyCart() {
    this.checkoutService.emptyCart().subscribe(res => {
      console.log("cart emptied");
    }
    );
  }
}
