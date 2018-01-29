import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-sell-list',
  templateUrl: './sell-list.component.html',
  styleUrls: ['./sell-list.component.css']
})
export class SellListComponent implements OnInit {
  products:Observable<string[]>;

  constructor(private productService:ProductsService) { }

  ngOnInit() {
    this.products = this.productService.getSellProducts();
  }

}
