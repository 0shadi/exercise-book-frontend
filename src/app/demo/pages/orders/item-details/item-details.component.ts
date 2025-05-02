import { Component, OnInit } from '@angular/core';
import { MessageServiceService } from 'src/app/services/message-service/message-service.service';
import { OnlineOrderingService } from 'src/app/services/online-ordering/online-ordering.service';

@Component({
  selector: 'app-item-details',
  standalone: false,
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.scss'
})
export class ItemDetailsComponent implements OnInit  {
  itemDetails: any[] = [];
  quantity = 1;

  constructor(
    private onlineOrderingService:  OnlineOrderingService,
    private messageService : MessageServiceService
  ){

  }

  ngOnInit(): void {
      this.populateData();
  }

  populateData(){
    try{
      this.onlineOrderingService.getSellingItems().subscribe({
        next: (datalist:any[]) => {
          if(datalist.length<=0){
            return;
          }
      
          this.itemDetails = datalist;
        },
        error: (error) => this.messageService.showError('Action failed with error'+ error)
     });
    }
    catch(error){
      this.messageService.showError('Action failed with error ' + error);
    }
  }

  increase() {
    this.quantity++;
  }
  decrease() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
}
