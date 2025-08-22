import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageServiceService } from 'src/app/services/message-service/message-service.service';
import { OnlineOrderingService } from 'src/app/services/online-ordering/online-ordering.service';

@Component({
  selector: 'app-item-details',
  standalone: false,
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.scss'
})
export class ItemDetailsComponent implements OnInit {
  itemDetail: any;
  quantity = 1;
  itemId: number;

  constructor(
    private onlineOrderingService: OnlineOrderingService,
    private messageService: MessageServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.setData();
  }

  setData() {
    this.route.params.subscribe((params) => {
      this.itemId = params['id'];
    });
    this.populateData();
  }

  populateData() {
    try {
      this.onlineOrderingService.getItem(this.itemId).subscribe({
        next: (data: any) => {
          if (!data) {
            return;
          }

          this.itemDetail = data;
        },
        error: (error) => this.messageService.showError('Action failed with error' + error)
      });
    } catch (error) {
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

  addToCart() {
    try {
      let orderItem = {
        ...this.itemDetail,
        ordQty: this.quantity
      };
      this.onlineOrderingService.addItem(orderItem);
    } catch (error) {
      this.messageService.showError('Action failed with error ' + error);
    }
  }
}
