import { Component, OnInit } from '@angular/core';
import { MessageServiceService } from 'src/app/services/message-service/message-service.service';
import { OnlineOrderingComponent } from '../online-ordering/online-ordering.component';
import { OnlineOrderingService } from 'src/app/services/online-ordering/online-ordering.service';

@Component({
  selector: 'app-item-details',
  standalone: false,
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.scss'
})
export class ItemDetailsComponent implements OnInit  {
  itemDetails: any[] = [];

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
}
