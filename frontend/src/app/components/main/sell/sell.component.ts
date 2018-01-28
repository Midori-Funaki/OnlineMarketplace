import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms/src/model';
import { SellService } from '../../../services/sell.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {
  // form: FormGroup;
  categories: Observable<string[]>;
  subscription: Subscription;
  brands: string[];

  constructor(private sellService:SellService) {
    // this.form = new FormGroup({})
  }

  ngOnInit() {
    this.categories = this.sellService.getCategories();
  }

  filterBrand(category){
    this.subscription = this.sellService.getBrandsByCategory(category).subscribe(brands=>{
      this.brands = brands;
    })
  }

  ngOnDestroy(){
    // this.subscription.unsubscribe();
  }
}
