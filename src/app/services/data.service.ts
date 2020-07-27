// import { Injectable } from '@angular/core';
// import { Subject, BehaviorSubject } from 'rxjs';

// import { OrderService } from './order.service';
// import { Product } from './product';
// import { v4 as uuid } from 'uuid';


// @Injectable({
//   providedIn: 'root'
// })

// export class DataService 
// {
//   availableCatagories = new BehaviorSubject(null);
//   selectedSubMenu = new BehaviorSubject(null);
//   availableMenu = new BehaviorSubject(null);
//   productList = new BehaviorSubject(null);
//   selectedKey = new BehaviorSubject(null);


//   constructor(private _orderService: OrderService)
//   {
//     console.log('data service constructor')
//     this.productList.next(this.getProductsFromServer());
//     this.availableMenu.next(this.genMenuFromProducts(this.productList.value));
//     this.availableCatagories.next(Object.keys(this.availableMenu.value));
//   }


//   // getSubMenu(key): void 
//   // {
//   //   this.selectedKey.next(key);
//   //   this.selectedSubMenu.next(this.availableMenu.value[key]);
//   // }


//   getStandardOptions(inputData: any) 
//   {
//     let allKey = [];
//     let cans = [];
//     let halves = [];
//     let thirds = [];

//     const keys = Object.keys(inputData)

//     for (const key of keys) 
//     {
//       allKey = allKey.concat(inputData[key])
//       //console.log('inputData[key]::',inputData[key])

//       inputData[key].forEach( item => {
//         //console.log('new orderDetails::',item['orderDetails'])

//         item['orderDetails'].forEach( innerItem => {
//           //console.log('new innerItem::',innerItem['size'])
  
//           if (innerItem['size'].includes('cans'))
//           {
//             cans = cans.concat(item)
//           }
//           if (innerItem['size'].includes("halves"))
//           {
//             halves = halves.concat(item)
//           }
//           if (innerItem['size'].includes("thirds"))
//           {
//             thirds = thirds.concat(item)
//           }
//         });
//       });
//     }

//     return {
//       "All": allKey,
//       "Can's": cans,
//       "1/2's": halves,
//       "1/3's": thirds
//     };
//   }


//   getProductsFromServer(): Array<Product> 
//   {
//     let prodList = []
    
//     prodList.push(new Product(uuid(), "BLACK IS THE COLOUR", "IPA", 7.7,
//                              "../../assets/img/cans/ipas/black+is+the+colour+can+shot+small.jpg",
//                              true,false,false,2.50))

//     prodList.push(new Product(uuid(), "RIGHT HAND MAN BACK", "IPA", 7.2,
//                              "../../assets/img/cans/ipas/right+hand+man+back+can+shot+small.jpg",
//                              true,false,false,3))
                             
//     prodList.push(new Product(uuid(), "SCREWBALL", "IPA", 5.1,
//                               "../../assets/img/cans/ipas/screwball-can-shot.jpg",
//                               false,true,false, null,3))

//     prodList.push(new Product(uuid(), "FOREVER AGO", "IPA", 6,
//                               "../../assets/img/cans/ipas/forever+ago+can+shot+small.jpg",
//                               false,true,false, null,3))

//     prodList.push(new Product(uuid(), "HR", "TIPA", 10,
//                               "../../assets/img/cans/tipas/HR-can-shot-small_180x.webp",
//                               false,false,true, null, null,4))

//     prodList.push(new Product(uuid(), "15", "Stout", 9.7,
//                               "../../assets/img/cans/stouts/15+can+shot+small.jpg",
//                               true,false,false, 4))
                              
//     prodList.push(new Product(uuid(), "SOTERIOLOGY", "Stout", 11.7,
//                               "../../assets/img/cans/stouts/soteriology+can+shot+small.jpg",
//                               true,false,true, 3.5, null,3))

//     prodList.push(new Product(uuid(), "YOU'RE NOT GETTING ANY", "Stout", 12,
//                               "../../assets/img/cans/stouts/youre+not+getting+any+can+shot+small.jpg",
//                               true,true,false, 3.5, 4))

//     return prodList
//   }

//   addProduct(newProduct: Product): void
//   {
//     console.log('before copy::', this.productList.value)
//     // let prodList = JSON.parse(JSON.stringify(this.productList.value))
//     let prodList = [] //Object.assign({}, this.productList.value)


//     this.productList.value.forEach( item => {
//       //console.log(item)

//       const clone = Object.assign( {}, item );
//       prodList.push(Object.setPrototypeOf( clone, Product.prototype ));


//       //prodList.push(new Product(Object.assign({},item)))
//     });

//     console.log('prodList::', prodList)

//         //this.data.orderDetails = JSON.parse(JSON.stringify(this.localOrder)) 

//     prodList.push(newProduct)
//     this.productList.next(prodList);
//     this.availableMenu.next(this.genMenuFromProducts(this.productList.value));
//     this.availableCatagories.next(Object.keys(this.availableMenu.value));

//     // console.log(this.productList.value)
//     // console.log(this.availableMenu.value)
//     console.log('data service avaialble catagories:',this.availableCatagories.value)
//   }

//   // genMenuFromProducts(prodList: Array<Product>): any
//   // {
//   //   let createMenu = {}

//   //   prodList.forEach(function(each) 
//   //   {
//   //     console.log('each::', each)
//   //     if (!(each.style in createMenu))
//   //     {
//   //       createMenu[each.style ] = []
//   //     }

//   //     let sizePrice = []

//   //     let sizes = ['cans', 'halves', 'thirds']
      
//   //     sizes.forEach(function(size) 
//   //     {
//   //       console.log('size::', size)
//   //       if (each.getSizeEnabled(size))
//   //       {
//   //         // sizePrice.push({[size]:each.getPrice(size)})
//   //         sizePrice.push({"size":size,
//   //                         "qty": 0,
//   //                         "addToOrder":false,
//   //                         "price":each.getPrice(size)})
//   //       }
//   //     })

//   //     createMenu[each.style].push({ 
//   //       "name": each.name,
//   //       "APV": each.abv,
//   //       "img": each.imgUrl,
//   //       "desc": "this will be the description",
//   //       "orderDetails": sizePrice
//   //     })
//   //   });

//   //   let standardOptions = this.getStandardOptions(createMenu)

//   //   const keys = Object.keys(createMenu)
//   //   keys.forEach(function(key){
//   //     createMenu[key+"'s"] = createMenu[key];
//   //     delete createMenu[key]; 
//   //   })

//   //   let completeMenu = Object.assign({}, createMenu, standardOptions);
//   //   completeMenu = this.sortMenu(completeMenu)

//   //   //console.log('completeMenu',completeMenu)
//   //   return completeMenu
//   // }

//   // sortMenu(completeMenu): any 
//   // {
//   //   const menuOrder = ["All", "IPA's", "DIPA's", "TIPA's", "Stout's", "Can's", "1/2's", "1/3's"]

//   //   const orderedMenu = {};
//   //   menuOrder.forEach(function(key) {
//   //     if (Object.keys(completeMenu).includes(key)){
//   //       orderedMenu[key] = completeMenu[key];
//   //   }});

//   //   return orderedMenu
//   // }
// }