import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TransactionService } from './../../../services/transaction.service';
import { Transaction } from '../../../models/Transaction';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  transactions: Observable<Transaction[]>;
  
  constructor(
    private transactionService: TransactionService
  ) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.transactions = this.transactionService.getAll();
  }

}
