import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  filter: Object[] = [
    {
      'Sneakers': ["adidas",
        "Nike",
        "Air Jordan",
        "Other Brands"]
    },
    {
      'Handbags': ["Goyard",
        "Chanel",
        "Givenchy",
        "Louis Vuitton",
        "Gucci",
        "Hermes"]
    },
    {
      'Watches': ["Audemars Piguet",
        "Omega",
        "Patek Philippe",
        "Rolex",
        "Panerai",
        "Jaeger-Lecoultre",
        "Breitling",
        "IWC",
        "Cartier",
        "Other Brands"]
    },
    { 'Collectables': [] }
  ];
  object: Object;

  constructor(
    private router: Router,
    private productsService: ProductsService
  ) {
    this.object = Object;
  }

  ngOnInit() {
  }

  moveTo(e, series) {
    e.preventDefault();
    console.log(series);
    this.router.navigate([`/home/`, series.toLowerCase()]);
  }

  onSorting(e) {
    // console.log(e.target.text)
    this.productsService.onSort$.next(e.target.attributes.attr.value);
  }

}
