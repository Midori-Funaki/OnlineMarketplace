import { Component, OnInit } from '@angular/core';
import * as filter from './config';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  filter: Object[];
  object: Object;

  constructor() {
    this.filter = filter;
    this.object = Object;
  }

  ngOnInit() {
  }

}
