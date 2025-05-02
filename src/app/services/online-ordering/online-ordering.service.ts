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
    const ls = this.getCartData();

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
    const ls = this.getCartData();

    let exist: any;

    if (ls)
      exist = ls.find((item) => {
        return item.itemId === itemDetail.itemId;
      });

    if (exist) {
      exist.ordQty = itemDetail.ordQty;
      this.setCartData(ls);
    } else {
      if (ls) {
        const newData = [...ls, itemDetail];
        this.setCartData(newData);
        this.cartItems.next(this.getCartData());
      }
      this.placeHolder.push(itemDetail);
      this.setCartData(this.placeHolder);
      this.cartItems.next(this.getCartData());
    }
  }

  removeItem(itemToRemove: any) {
    const ls = this.getCartData();

    let exist: any;

    if (ls)
      exist = ls.find((item) => {
        return item.itemId === itemToRemove.itemId;
      });

    if (exist) {
      this.removeCartData(exist);
    }
  }

  setCartData(data: any) {
    localStorage.setItem('cart', JSON.stringify(data));
  }

  getCartData() {
    return JSON.parse(localStorage.getItem('cart'));
  }

  removeCartData(itemToRemove: any) {
    const ls = this.getCartData();
    const cartArray = ls;
    const index: number = cartArray.findIndex((item: any) => item.itemId === itemToRemove.itemId);

    if (index !== -1) {
      cartArray.splice(index, 1);
      this.setCartData(cartArray);
      this.cartItems.next(this.getCartData());
    }
  }
}
