import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { MatTableDataSource } from '@angular/material/table'


@Component({
  selector: 'app-admin-live-orders',
  templateUrl: 'admin-live-orders.component.html',
  styles: [
    `#menuIcon {
      cursor: pointer; 
    }`,
    `#tableTest {
      width: 100%;
     }`,

    `#cardItemList {
      height: auto;
    }`,

    `
    .mat-footer-row,
    .mat-header-row,
    .mat-row {
        display: inline-flex;
        min-width: 90%;
    }
    `,


    `.mat-column-name {
      flex: 0 0 50% !important;
      width: 50% !important;
    }`,

    `.mat-column-size {
      flex: 0 0 25% !important;
      width: 25% !important;
    }`,

    `.mat-column-qty {
      flex: 0 0 25% !important;
      width: 25% !important;
    }`,

    `::ng-deep .mat-list-item-content {
      display: block !important;
    }`
  ]
})
export class AdminLiveOrdersComponent implements OnInit {

  localQueue: any = []
  localProgress: any = []
  localDisplayListOfObjects: any = []
  // displayMenuIcon = true

  //displayedColumns = ['Order Number', 'Name', 'Size', 'Qty', 'Status']
  displayedColumns = ['name', 'size', 'qty']


  constructor(private _adminService: AdminService) { 

    this._adminService.ordersInQueue.subscribe(value => {
      this.localQueue=value;
    });

    this._adminService.ordersInProgress.subscribe(value => {
      this.localProgress=value;
    });
  }

  // sideMenuVisable = true;
  // closeMenu() {
  //   this.sideMenuVisable = false
  // }

  parceOrder(data) 
  {
    for (const [key, value] of Object.entries(data)) 
    {
      // console.log(key)
      // console.log(value['order'])
      // if (value['addToOrder'] === true && value['qty'] > 0)
      // {
      //   this.orderObject.push(value)
      // }
      this.localDisplayListOfObjects.push(new MatTableDataSource(value['order']))
    }


    console.log('end of parceOrder', this.localDisplayListOfObjects)
  }
  
  ngOnInit(): void {
    // console.log('localQueue::', this.localQueue)
    this.parceOrder(this.localQueue)
  }

}





// <mat-table #table [dataSource]="ordersInProgress">

//     <!-- Name Column -->
//     <ng-container matColumnDef="name">
//         <th mat-header-cell *matHeaderCellDef> Name </th>
//         <td mat-cell *matCellDef="let element"> {{element.name}} </td>
//     </ng-container>

//     <!-- Size Column -->
//     <ng-container matColumnDef="size">
//         <th mat-header-cell *matHeaderCellDef> Size </th>
//         <td mat-cell *matCellDef="let element"> {{element.size}} </td>
//     </ng-container>

//     <!-- Qty Column -->
//     <ng-container matColumnDef="qty">
//         <th mat-header-cell *matHeaderCellDef> Qty </th>
//         <td mat-cell *matCellDef="let element"> {{element.qty}} </td>
//     </ng-container>

//     <!-- Replace with out of stock -->
//     <!-- <ng-container matColumnDef="remove">
//         <th mat-header-cell *matHeaderCellDef> Remove </th>
//         <td mat-cell *matCellDef="let element"> 
//             <a type="button">
//                 <mat-icon id='deleteIcon' class="icon" (click)='removeItem(element)'>delete</mat-icon>
//             </a> 
//         </td>
//       </ng-container> -->

//     <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
//     <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>

// </mat-table>