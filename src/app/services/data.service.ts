import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

import { OrderService } from './order.service';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  availableMenuFromServer: Subject<any> = new Subject<any>();
  standardOptions = new BehaviorSubject(null);
  availableMenu = new BehaviorSubject(null);
  availableCatagories = new BehaviorSubject(null);
  selectedKey = new BehaviorSubject(null);
  selectedSubMenu = new BehaviorSubject(null);

  constructor(private _orderService: OrderService)
  {
    this.availableMenuFromServer = this.getMenuFromServer();
    this.standardOptions.next(this.getStandardOptions(this.availableMenuFromServer));
    this.availableMenu.next(this.createAvailableMenu(this.availableMenuFromServer, this.standardOptions.value));
    this.availableCatagories.next(Object.keys(this.availableMenu.value));
    this._orderService.createOrderObjectForAll(this.availableMenu.value['All']) 
  }


  getSubMenu(key): void {
    this.selectedKey.next(key);
    this.selectedSubMenu.next(this.availableMenu.value[key]);
  }


  getStandardOptions(inputData: any) {
    let allKey = [];
    let cans = [];
    let halves = [];
    let thirds = [];

    const keys = Object.keys(inputData)
    for (const key of keys) {
      allKey = allKey.concat(inputData[key])
        for (const item of inputData[key]) {

          if (item.size.includes('cans')){
            cans = cans.concat(item)
          }
          if (item.size.includes("1/2's")){
            halves = halves.concat(item)
          }
          if (item.size.includes("1/3's")){
            thirds = thirds.concat(item)
          }
        }
    }

    return {
      all: allKey,
      can: cans,
      half: halves,
      third: thirds
    };
  }

  createAvailableMenu(unorderedMenu, standardOptions): any 
  {
    unorderedMenu["All"] = standardOptions['all'];
    unorderedMenu["Can's"] = standardOptions['can'];
    unorderedMenu["1/2's"] = standardOptions['half']
    unorderedMenu["1/3's"] = standardOptions['third'];

    const menuOrder = ["All", "IPA's", "DIPA's", "TIPA's", "Stout's", "Can's", "1/2's", "1/3's"]

    const orderedMenu = {};
    menuOrder.forEach(function(key) {
      if (Object.keys(unorderedMenu).includes(key)){
        orderedMenu[key] = unorderedMenu[key];
    }});

    return orderedMenu
  }


  // This will be replaced with api call later
  getMenuFromServer(): any {

    return {
      "IPA's": [        
        { 
          "name": "BLACK IS THE COLOUR",
          "APV": 7.7,
          "img": "../../assets/img/cans/ipas/black+is+the+colour+can+shot+small.jpg",
          "desc": "this will be the description",
          "size": ["cans"]
        },        
        { 
          "name": "RIGHT HAND MAN BACK",
          "APV": 7.2,
          "img": "../../assets/img/cans/ipas/right+hand+man+back+can+shot+small.jpg",
          "desc": "this will be the description",
          "size": ["cans"]
        },        
        { 
          "name": "SCREWBALL",
          "APV": 5.1,
          "img": "../../assets/img/cans/ipas/screwball-can-shot.jpg",
          "desc": "this will be the description",
          "size": ["1/2"]
        },        
        { 
          "name": "FOREVER AGO",
          "APV": 6,
          "img": "../../assets/img/cans/ipas/forever+ago+can+shot+small.jpg",
          "desc": "this will be the description",
          "size": ["1/2's"]
        }
      ],
      "TIPA's": [
        { 
        "name": "HR",
        "APV": 10,
        "img": "../../assets/img/cans/tipas/HR-can-shot-small_180x.webp",
        "desc": "this will be the description",
        "size": ["1/3's"]
        }
      ],
      "Stout's": [
        { "name": "15",
         "APV": 9.7,
         "img": "../../assets/img/cans/stouts/15+can+shot+small.jpg",
         "desc": "this will be the description",
         "size": ["cans"]
       },
       { 
         "name": "SOTERIOLOGY",
         "APV": 11.7,
         "img": "../../assets/img/cans/stouts/soteriology+can+shot+small.jpg",
         "desc": "this will be the description",
         "size": ["cans","1/3's"]
       },
       {
         "name":"YOU'RE NOT GETTING ANY",
         "APV": 12,
         "img": "../../assets/img/cans/stouts/youre+not+getting+any+can+shot+small.jpg",
         "desc": "this will be the description",
         "size": ["cans","1/2's"]
       }
      ]
    }; 
  }
}