import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(
    private http:HttpClient,
    private httpService:HttpService
  ) { }

  saveBillingDetails(form_details:any){
      const requestUrl = environment.baseUrl + '/checkout-billingDetails';
  
      let headers = {};
      if (this.httpService.getAuthToken() !== null) {
        headers = {
          Authorization: 'Bearer ' + this.httpService.getAuthToken(),
        };
      }
  
      return this.http.post(requestUrl,form_details,{headers:headers});
    }

  saveOrderDetails(form_details:any){
      const requestUrl = environment.baseUrl + '/checkout-orderDetails';
  
      let headers = {};
      if (this.httpService.getAuthToken() !== null) {
        headers = {
          Authorization: 'Bearer ' + this.httpService.getAuthToken(),
        };
      }
  
      return this.http.post(requestUrl,form_details,{headers:headers});
    }

    saveOrderItemDetails(form_details:any){
      const requestUrl = environment.baseUrl + '/checkout-orderItemDetails';
  
      let headers = {};
      if (this.httpService.getAuthToken() !== null) {
        headers = {
          Authorization: 'Bearer ' + this.httpService.getAuthToken(),
        };
      }
  
      return this.http.post(requestUrl,form_details,{headers:headers});
    }

    getOrderDetails(){
    const requestUrl = environment.baseUrl + '/order-list';

    let headers = {};
    if (this.httpService.getAuthToken() !== null) {
      headers = {
        Authorization: 'Bearer ' + this.httpService.getAuthToken(),
      };
    }

    return this.http.get(requestUrl, {headers:headers});
  }

  getOrderItemDetails(orderId){
    const requestUrl = environment.baseUrl + '/get-order-items/' + orderId;

    let headers = {};
    if (this.httpService.getAuthToken() !== null) {
      headers = {
        Authorization: 'Bearer ' + this.httpService.getAuthToken()
      };
    }

    return this.http.get(requestUrl, { headers: headers });
  }

  editStatus(orderId:number,newStatus:any){
    const requestUrl = environment.baseUrl+'/update-status/'+orderId.toString();

    let headers = {};
    if (this.httpService.getAuthToken() !== null) {
      headers = {
        Authorization: 'Bearer ' + this.httpService.getAuthToken(),
      };
    }

    return this.http.put(requestUrl,{ orderStatus: newStatus },{headers:headers});
  }

}


