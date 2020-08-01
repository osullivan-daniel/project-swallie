import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './product'

@Injectable({
    providedIn: 'root'
  })

  export class MenuService
  {
    availableCatagories = new BehaviorSubject(null);
    selectedSubMenu = new BehaviorSubject(null);
    availableMenu = new BehaviorSubject(null);
    selectedKey = new BehaviorSubject(null);

    constructor(){}

    load(prodList)
    {
      prodList.subscribe(value => {
        console.log('Menu load')
        this.availableMenu.next(this.genMenuFromProducts(value));
      });
    }

    getAvaliableMenuAll()
    {
      return this.availableMenu.value['All']
    }

    setNewSubMenu(key)
    {
      this.selectedKey.next(key);
      this.selectedSubMenu.next(this.availableMenu.value[key]);
    }

    sortMenu(completeMenu): any 
    {
      const menuOrder = ["All", "IPA's", "DIPA's", "TIPA's", "Stout's", "Can's", "1/2's", "1/3's"] 

      const orderedMenu = {};
      menuOrder.forEach(function(key) 
      {
        if (Object.keys(completeMenu).includes(key))
        {
          orderedMenu[key] = completeMenu[key];
        }
      });
  
      this.availableCatagories.next(Object.keys(orderedMenu));

      return orderedMenu
    }

    genMenuFromProducts(prodList: Array<Product>): any
    {
      let createMenu = {}
      let availableProdList: Array<Product> = []

      prodList.forEach(function(each) 
      {
        if(!(each.cans === false && each.halves === false && each.thirds === false))
        {
          availableProdList.push(each)
        }
      });

      availableProdList.forEach(function(each) 
      {
        if (!(each.style in createMenu))
        {
          createMenu[each.style] = []
        }

        let sizePrice = []

        let sizes = ['cans', 'halves', 'thirds']
        
        sizes.forEach(function(size) 
        {
          if (each.getSizeEnabled(size))
          {
            sizePrice.push({"size":size,
                            "qty": 0,
                            "addToOrder":false,
                            "price":each.getPrice(size)})
          }
        })

        createMenu[each.style].push({ 
          "name": each.name,
          "APV": each.abv,
          "img": each.imgUrl,
          "desc": "this will be the description",
          "orderDetails": sizePrice
        })
      });

      let standardOptions = this.getStandardOptions(createMenu)

      const keys = Object.keys(createMenu)
      keys.forEach(function(key)
      {
        createMenu[key+"'s"] = createMenu[key];
        delete createMenu[key]; 
      })

      let completeMenu = Object.assign({}, createMenu, standardOptions);
      completeMenu = this.sortMenu(completeMenu)

      return completeMenu
    }

    getStandardOptions(inputData: any) 
    {
      let allKey = [];
      let cans = [];
      let halves = [];
      let thirds = [];

      const keys = Object.keys(inputData)

      for (const key of keys) 
      {
        allKey = allKey.concat(inputData[key])

        inputData[key].forEach( item => 
        {
          item['orderDetails'].forEach( innerItem => 
          {
            if (innerItem['size'].includes('cans'))
            {
              cans = cans.concat(item)
            }
            if (innerItem['size'].includes("halves"))
            {
              halves = halves.concat(item)
            }
            if (innerItem['size'].includes("thirds"))
            {
              thirds = thirds.concat(item)
            }
          });
        });
      }

      return {
        "All": allKey,
        "Can's": cans,
        "1/2's": halves,
        "1/3's": thirds
      };
    }

    resetProducts(listOfItemsToReset)
    {    
      let prodList = [] 
      for (const [key, value] of Object.entries(this.availableMenu.value['All'])) 
      {
        if (listOfItemsToReset.includes(value['name']))
        {
          value['orderDetails'].forEach( item => 
          {
            item['qty'] = 0
            item['addToOrder'] = false
          });
        }
      } 
    }

  }