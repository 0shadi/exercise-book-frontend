import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { HttpService } from '../http.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OnlineOrderingService {
  placeHolder = [];
  cartItems = new BehaviorSubject([]);

  constructor(
    private http: HttpClient,
    private httpService: HttpService
  ) {
    const ls = JSON.parse(localStorage.getItem('cart'));

    if (ls) this.cartItems.next(ls);
  }

  getSellingItems() {
    const requestUrl = environment.baseUrl + '/selling-item-registration';

    let headers = {};
    if (this.httpService.getAuthToken() !== null) {
      headers = {
        Authorization: 'Bearer ' + this.httpService.getAuthToken()
      };
    }

    return this.http.get(requestUrl, { headers: headers });
  }

  getItem(itemId: number) {
    const requestUrl = environment.baseUrl + '/get-selling-item/' + itemId;

    let headers = {};
    if (this.httpService.getAuthToken() !== null) {
      headers = {
        Authorization: 'Bearer ' + this.httpService.getAuthToken()
      };
    }

    return this.http.get(requestUrl, { headers: headers });
  }

  addItem(itemDetail: any) {
    const ls = JSON.parse(localStorage.getItem('cart'));

    let exist: any;

    if (ls)
      exist = ls.find((item) => {
        return item.itemId === itemDetail.itemId;
      });

    if (exist) {
      exist.ordQty = itemDetail.ordQty;
      localStorage.setItem('cart', JSON.stringify(ls));
    } else {
      if (ls) {
        const newData = [...ls, itemDetail];
        localStorage.setItem('cart', JSON.stringify(newData));
        this.cartItems.next(JSON.parse(localStorage.getItem('cart')));
      } else {
        this.placeHolder.push(itemDetail);
        localStorage.setItem('cart', JSON.stringify(this.placeHolder));
        this.cartItems.next(this.placeHolder);
      }
    }
  }
}
