// angular import
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CacheService } from 'src/app/services/CacheService';
import { HttpService } from 'src/app/services/http.service';
import { OnlineOrderingService } from 'src/app/services/online-ordering/online-ordering.service';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss']
})
export class NavRightComponent implements OnInit {
  numberOfItems = 0;
  orderItems: any;

  constructor(
    private httpService: HttpService,
    private router: Router,
    private cacheService: CacheService,
    private onlineOrderingService: OnlineOrderingService
  ) {}

  ngOnInit(): void {
    this.onlineOrderingService.cartItems.subscribe((items) => {
      this.numberOfItems = items.length;
      this.orderItems = items;
    });
  }

  public logOutUser(): void {
    this.cacheService.clear(this.httpService.getUserId()!);
    this.httpService.removeToken();
    this.router.navigate(['/auth/signin']);
  }

  public removeItemFromCart(itemToRemove: any) {
    this.onlineOrderingService.removeItem(itemToRemove);
  }
}
