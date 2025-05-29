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
  displayedColumns: string[] = ['orderId','date','cost','orderStatus','details'];
  dataSource:MatTableDataSource<any>;

  bookDetailsDisplayedColumns: any[] = ['orderId', 'material', 'paperColor', 'size','pagesCount','paperType','paperQuality','quantity'];
  bookDetailsDataSource: MatTableDataSource<any>;

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
          this.bookDetailsDataSource = new MatTableDataSource(datalist);

        this.bookDetailsDataSource = new MatTableDataSource(datalist); 
        },
        error: (error) => this.messageService.showError('Action failed with error' + error)
      });
    } catch (error) {
      this.messageService.showError('Action failed with error ' + error);
    }
      }
    }

