import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TransactionService } from './../../../services/transaction.service';
import { Transaction } from '../../../models/Transaction';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/User';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  transactions: Transaction[];
  purchases: Transaction[];
  solds: Transaction[];
  user: User;

  constructor(
    private transactionService: TransactionService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.getUser().toPromise()
      .then(user => this.user = user)
      .then(_ => this.getAll())
  }

  getAll() {
    // console.log(this.user);
    this.transactionService.getAll().subscribe(transactions => {
      this.transactions = transactions;
      this.purchases = transactions.filter(transaction => {
        return transaction.buyerId == this.user.id;
      });
      // console.log(this.purchases);
      this.solds = transactions.filter(transaction => {
        return transaction.sellerId == this.user.id;
      });
      // console.log(this.solds);
    });
  }

}
