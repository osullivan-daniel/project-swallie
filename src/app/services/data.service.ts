import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  availableKeyChange: Subject<string> = new Subject<string>();
  availableJsonChange: Subject<JSON> = new Subject<JSON>();

  constructor() { }

  setCurrentKey(key): void {
    this.availableKeyChange.next(key);
  }

  // This will be replaced with api call later
  getAvailableOptions(): void {
    let tmp: any = {
      "All": "This will be created from everything returned",
      "IPA's": {
        1: "",
        2: ""
      },
      "Pale Ale's": {
        1: "",
        2: ""
      },
      "Stout's": [
         { "name": "15",
          "APV": 9.7,
          "img": "../../assets/img/15+can+shot+small.jpg",
          "desc": "this will be the description",
          "size": ["cans"]
        },
        { 
          "name": "SOTERIOLOGY",
          "APV": 11.7,
          "img": "../../assets/img/soteriology+can+shot+small.jpg",
          "desc": "this will be the description",
          "size": ["cans","1/3's"]
        },
        {
          "Name":"YOU'RE NOT GETTING ANY",
          "APV": 12,
          "img": "../../assets/img/youre+not+getting+any+can+shot+small.jpg",
          "desc": "this will be the description",
          "size": ["cans","1/2's"]
        }
      ],
      "Can's": {
        1: "",
        2: ""
      },
      "1/2's": {
        1: "",
        2: ""
      },
      "1/3's": {
        1: "",
        2: ""
      }
    };
    
    this.availableJsonChange.next(<JSON>tmp);
  }
}