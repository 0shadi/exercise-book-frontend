import { Component, OnInit } from '@angular/core';
import { MessageServiceService } from 'src/app/services/message-service/message-service.service';
import { OnlineOrderingService } from 'src/app/services/online-ordering/online-ordering.service';

@Component({
  selector: 'app-online-ordering',
  standalone: false,
  templateUrl: './online-ordering.component.html',
  styleUrl: './online-ordering.component.scss'
})
export class OnlineOrderingComponent implements OnInit {
  items: any[] = [];

  constructor(
    private onlineOrderingService: OnlineOrderingService,
    private messageService: MessageServiceService
  ) {}

  ngOnInit(): void {
    this.populateData();
  }

  populateData() {
    try {
      this.onlineOrderingService.getSellingItems().subscribe({
        next: (datalist: any[]) => {
          if (datalist.length <= 0) {
            return;
          }

          this.items = datalist;

          // datalist.forEach((data) => {
          //   console.log(data);
          // });
        },
        error: (error) => this.messageService.showError('Action failed with error' + error)
      });
    } catch (error) {
      this.messageService.showError('Action failed with error ' + error);
    }
  }
}
