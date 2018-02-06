import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { getParseErrors } from '@angular/compiler/src/util';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router, Params } from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  searchKey: string;
  
  constructor(private route: ActivatedRoute,private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params:Params)=>{
      this.searchKey = params['searchkey'];
    });
  }

}
