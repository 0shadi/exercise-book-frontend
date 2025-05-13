import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CheckoutService } from 'src/app/services/checkout/checkout.service';
import { MessageServiceService } from 'src/app/services/message-service/message-service.service';

@Component({
  selector: 'app-order-list',
  standalone: false,
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss'
})
export class OrderListComponent implements OnInit{
  displayedColumns: string[] = ['orderId','date','totalCost','orderStatus','details'];
  dataSource:MatTableDataSource<any>;

  orderItemDetails: any;

  constructor(
    private checkoutService  : CheckoutService,
    private messageService : MessageServiceService
  ){
  }

  ngOnInit(): void {
    this.populateData();
  }

  populateData(){
      try{
        this.checkoutService.getOrderDetails().subscribe({
          next: (datalist:any[]) => {
            if(datalist.length<=0){
              return;
            }
    
            console.log('get data response: ',datalist);
            this.dataSource = new MatTableDataSource(datalist);
  
          },        
          error: (error) => this.messageService.showError('Action failed with error ' + error)
        });
      }catch(error){
        this.messageService.showError('Action failed with error ' + error);
      }
    }

  viewDetails(orderId){
    try {
      this.checkoutService.getOrderItemDetails(orderId).subscribe({
        next: (data: any) => {
          if (!data) {
            return;
          }

          this.orderItemDetails = [];

          this.orderItemDetails = data.map(item => {
          return {
            orderId:item.orderId,
            itemId:item.itemId,
            itemName: item.itemName,
            ordQty: item.ordQty,
            itemPrice:item.itemPrice,
            subTotal:item.subTotal
        
          };
        });
        },
        error: (error) => this.messageService.showError('Action failed with error' + error)
      });
    } catch (error) {
      this.messageService.showError('Action failed with error ' + error);
    }
  }
}
