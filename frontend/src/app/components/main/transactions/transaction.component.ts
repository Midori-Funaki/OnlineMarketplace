import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TransactionService } from './../../../services/transaction.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  transactions: Observable<any[]>;
  
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
