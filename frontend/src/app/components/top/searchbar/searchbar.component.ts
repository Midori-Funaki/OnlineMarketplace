import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {

  productSearch: FormGroup;

  constructor(private formBuilder: FormBuilder, 
              private router: Router
             ) {}

  ngOnInit() {
    this.productSearch = this.formBuilder.group({
      searchkey: [""]
    });
  }

  onSubmit(e:any){
    // console.log(this.localLogin.value);
    if (this.productSearch.dirty){
      // console.log(this.productSearch.value);
      this.router.navigate([`/home/`, this.productSearch.value.searchkey]);
      this.productSearch.reset();
    }
  }

}
