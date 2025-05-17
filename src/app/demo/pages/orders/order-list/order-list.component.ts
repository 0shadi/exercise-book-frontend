import { Component, OnInit, ViewChild } from '@angular/core';
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

  isOrderSelected = false;
  selectedOrder;
  selectedStatus: string = '';  
  selectedData;

  orderItemDisplayedColumns: any[] = ['orderId', 'itemId', 'itemName', 'ordQty','itemPrice','subTotal'];
  orderItemDataSource: MatTableDataSource<any>;

  orderStatusOptions: string[] = ['Pending', 'Processing', 'Delivered', 'Cancelled'];

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
    this.isOrderSelected = true;
    try {
      this.checkoutService.getOrderItemDetails(orderId).subscribe({
        next: (data: any) => {
          if (!data) {
            return;
          }

          this.selectedOrder = this.dataSource.data.find(order => order.orderId === orderId);
          this.selectedStatus = this.selectedOrder?.orderStatus;
          const orderItemDetails = data.map(item => {
          return {
            orderId:item.orderId,
            itemId:item.itemId,
            itemName: item.itemName,
            ordQty: item.ordQty,
            itemPrice:item.itemPrice,
            subTotal:item.subTotal
        
          };
        });

        this.orderItemDataSource = new MatTableDataSource(orderItemDetails); 
        },
        error: (error) => this.messageService.showError('Action failed with error' + error)
      });
    } catch (error) {
      this.messageService.showError('Action failed with error ' + error);
    }
  }

  updateOrderStatus(order){
    
    console.log('Updating status to:', order.orderStatus ,'Id: ',order.orderId);

    this.checkoutService.editStatus(order.orderId, this.selectedStatus).subscribe({
      next: (datalist:any[]) => {
        if(datalist.length<=0){
          return;
        }
          
        let elementIndex = this.dataSource.data.findIndex((element) => element.orderId === order?.orderId);
        this.dataSource.data[elementIndex] = datalist;          
        this.dataSource = new MatTableDataSource(this.dataSource.data);

        this.selectedOrder.orderStatus = this.selectedStatus;

        this.messageService.showSuccess('Status Updated Successfully');
      },
      error: (error) => this.messageService.showError('Action failed with error'+ error)
    });
  }

  getTotalCost(): number {
    return this.selectedOrder?.totalCost || 0;
}

}
