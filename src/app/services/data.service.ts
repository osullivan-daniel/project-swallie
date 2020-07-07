import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  availableMenu = new BehaviorSubject(this.setAvailableOptions());
  availableCatagories = new BehaviorSubject(Object.keys(this.availableMenu.value));

  selectedKey: Subject<string> = new Subject<string>();
  // Do we default to all or wait for users first select...
  //selectedKey = new BehaviorSubject('All');
  availableSelectedSubMenu: Subject<JSON> = new Subject<JSON>();
  
  setSelectedOptions(key): void {
    console.log('set key', key)
    console.log(this.availableMenu.value[key])
    this.selectedKey.next(key);
    this.availableSelectedSubMenu.next(
      this.availableMenu.value[key]
    )
  }

  // This will be replaced with api call later
  setAvailableOptions(): any {
    console.log('setAvailableOptions')
    let unorderedMenu = {
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
    
    // console.log(typeof(unorderedMenu))
    // let obj = JSON.parse(unorderedMenu)
    // obj.forEach(function(item){
    //   console.log('ID: ' + item.id);
    //   console.log('MSG: ' + item.msg);
    //   console.log('TID: ' + item.tid);
    //   console.log('FROMWHO: ' + item.fromWho);
    // });

    let allKey = [];
    let cans = [];
    let halves = [];
    let thirds = [];

    const keys = Object.keys(unorderedMenu)
    for (const key of keys) {
      allKey = allKey.concat(unorderedMenu[key])
        for (const item of unorderedMenu[key]) {
          console.log(item.size)
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

    unorderedMenu["All"] = allKey;
    unorderedMenu["Can's"] = cans;
    unorderedMenu["1/2's"] = halves;
    unorderedMenu["1/3's"] = thirds;

    // Get this from Somewhere!
    const menuOrder = ["All", "IPA's", "DIPA's", "TIPA's", "Stout's", "Can's", "1/2's", "1/3's"]

    const orderedMenu = {};
    menuOrder.forEach(function(key) {
      if (Object.keys(unorderedMenu).includes(key)){
        orderedMenu[key] = unorderedMenu[key];
    }});

    return orderedMenu



  }
}