import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms/src/model';
import { SellService } from '../../../services/sell.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {
  // form: FormGroup;
  categories: string[] = [];
  brands: string[] = [];

  constructor(private sellService:SellService) {
    // this.form = new FormGroup({})
    this.sellService.getcategorySub().subscribe(category=>{
      this.categories = category;
    });
    this.sellService.getbrandSub().subscribe(brands=>{
      this.brands = brands;
    });
  }

  ngOnInit() {
    this.sellService.getCategories();
  }

  filterBrand(category){
    this.sellService.getBrandsByCategory(category);
  }
}
