import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BookCustomizeService } from 'src/app/services/book-customize/book-customize.service';
import { MessageServiceService } from 'src/app/services/message-service/message-service.service';

@Component({
  selector: 'app-customized-order-list',
  standalone: false,
  templateUrl: './customized-order-list.component.html',
  styleUrl: './customized-order-list.component.scss'
})
export class CustomizedOrderListComponent implements OnInit {
  displayedColumns: string[] = ['orderId','date','cost','orderStatus','paymentMethod','details'];
  dataSource:MatTableDataSource<any>;

  items=[];

  orderStatusOptions: string[] = ['Pending', 'Processing', 'Delivered', 'Cancelled'];
  selectedOrder;
  selectedStatus;

  constructor(
    private bookCustomizeService  : BookCustomizeService,
    private messageService : MessageServiceService
  ){
    
  }

  ngOnInit(): void {
    this.populateData();
  }

  populateData(){
    try{
        this.bookCustomizeService.getCustomizedOrderDetails().subscribe({
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

    isOrderSelected = false;
    viewDetails(orderId){
      this.isOrderSelected = true;
      try {
      this.bookCustomizeService.getCustomizedBookDetails(orderId).subscribe({
        next: (datalist: any) => {
          if (!datalist) {
            return;
          }

          console.log('get data response: ',datalist);
          this.items = datalist;
          this.selectedOrder = this.dataSource.data.find(order => order.orderId === orderId);
          this.selectedStatus = this.selectedOrder?.orderStatus;

        },
        error: (error) => this.messageService.showError('Action failed with error' + error)
      });
    } catch (error) {
      this.messageService.showError('Action failed with error ' + error);
    }
      }

    updateOrderStatus(selectedOrder){
      console.log('Updating status to:', this.selectedStatus ,'Id: ',selectedOrder.orderId);

      this.bookCustomizeService.editStatus(selectedOrder.orderId, this.selectedStatus).subscribe({
      next: (datalist:any[]) => {
        if(datalist.length<=0){
          return;
        }
          
        let elementIndex = this.dataSource.data.findIndex((element) => element.orderId === selectedOrder?.orderId);
        this.dataSource.data[elementIndex] = datalist;          
        this.dataSource = new MatTableDataSource(this.dataSource.data);

        this.selectedOrder.orderStatus = this.selectedStatus;

        this.messageService.showSuccess('Status Updated Successfully');
      },
      error: (error) => this.messageService.showError('Action failed with error'+ error)
    });

    }
    }

