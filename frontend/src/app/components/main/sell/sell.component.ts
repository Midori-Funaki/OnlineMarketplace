import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormsModule } from '@angular/forms';
import { SellService } from '../../../services/sell.service';
import { Observable } from 'rxjs/Observable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {
  sellForm: FormGroup;
  categories: string[] = [];
  brands: string[] = [];

  constructor(private sellService:SellService, private formBuilder: FormBuilder) {
    this.sellService.getcategorySub().subscribe(category=>{
      this.categories = category;
      // this.categories.unshift("");
    });
    this.sellService.getbrandSub().subscribe(brands=>{
      this.brands = brands;
      // this.brands.unshift("");
    });
  }

  ngOnInit() {
    this.sellService.getCategories();
    this.sellForm = new FormGroup({
      category: new FormControl(""),
      brand: new FormControl(""),
      size: new FormControl(""),
      color: new FormControl(""),
      askPrice: new FormControl(""),
      condition: new FormControl(""),
      photo: new FormControl("")
    })
  }

  filterBrand(category){
    this.sellService.getBrandsByCategory(category);
  }

  createNewSell(){}
}
