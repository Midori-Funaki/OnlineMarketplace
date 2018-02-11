import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  filter: Object[] = [
    {'Sneakers': [ 'Air Force',
                'Air Max',
                'Asics',
                'Basketball',
                'Diadora',
                'Eight',
                'Eighteen',
                'Eleven',
                'Fifteen',
                'Five',
                'Foamposite',
                'Four',
                'Fourteen',
                'Iniki',
                'KD',
                'Kobe',
                'LeBron',
                'Li Ning',
                'Louis Vuitton',
                'NMD',
                'New Balance',
                'Nine',
                'Nineteen',
                'One',
                'Packs',
                'Puma',
                'Reebok',
                'SB',
                'Saucony',
                'Seven',
                'Seventeen',
                'Six',
                'Sixteen',
                'Spizike',
                'Ten',
                'Thirteen',
                'Thirty',
                'Thirty One',
                'Three',
                'Twelve',
                'Twenty',
                'Twenty Eight',
                'Twenty Nine',
                'Twenty One',
                'Twenty Three',
                'Twenty Two',
                'Two',
                'Ultra Boost',
                'Under Armour',
                'Yeezy',
                'Other', ]},
    {'Handbags': [ 'Alma',
                'Anjou',
                'Antigona',
                'Belvedere',
                'Birkin',
                'Boston',
                'Boy',
                'Camera',
                'Constance',
                'Disco',
                'Evelyne',
                'Flap',
                'Jackie',
                'Jewelry',
                'Jewelry',
                'Jewelry',
                'Jewelry',
                'Jewelry',
                'Keepall',
                'Kelly',
                'Neverfull',
                'Nightingale',
                'Noe',
                'Pandora',
                'Saigon',
                'Soho',
                'Speedy',
                'St. Louis',
                'Supreme',
                'WOC',
                'Other' ]},   
    {'Watches': [ 'A. Lange & Sohne',
                'Annual Calendar',
                'Aquanaut',
                'Ballon Bleu',
                'Bell & Ross',
                'Big Pilot',
                'Bremont',
                'Calatrava',
                'Cellini',
                'Chanel',
                'Chopard',
                'Constellation',
                'Datejust',
                'Day-Date',
                'Daytona',
                'Doxa',
                'Ernst Benz',
                'Explorer',
                'GMT-Master II',
                'Grande Reverso',
                'Luminor',
                'MB&F',
                'Master Calendar',
                'Nautilus',
                'Navitimer',
                'Nomos',
                'Oris',
                'Oyster-Perpetual',
                'Pasha',
                'Perpetual Calendar',
                'Pilot',
                'Portuguese',
                'Radiomir',
                'Reverso',
                'Richard Mille',
                'Roadster',
                'Royal Oak',
                'Royal Oak Offshore',
                'Santos',
                'Sea-Dweller',
                'Seamaster',
                'Sky-Dweller',
                'Speedmaster',
                'Submariner',
                'Tag Heuer',
                'Tank',
                'Tudor',
                'Twenty-4',
                'Urwerk',
                'Vacheron Constantin',
                'Yacht-Master',
                'Other' ]},
      {'Collectables': [ ]}
  ];
  object: Object;

  constructor(
              private router: Router,
  ) {
    this.object = Object;
  }

  ngOnInit() {
  }

  moveTo(e,series) {
    e.preventDefault();
    console.log(series);
    this.router.navigate([`/home/`, series.toLowerCase()]);
  }

}
