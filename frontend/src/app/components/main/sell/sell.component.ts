import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SellService } from '../../../services/sell.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {
  sellForm: FormGroup;
  categories: string[] = [];
  brands: string[] = [];

  constructor(private sellService:SellService) {
    this.sellForm = new FormGroup({
      category: new FormControl(""),
      brand: new FormControl(""),
      size: new FormControl(""),
      color: new FormControl(""),
      askPrice: new FormControl(""),
      condition: new FormControl(""),
      photo: new FormControl("")
    })
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
