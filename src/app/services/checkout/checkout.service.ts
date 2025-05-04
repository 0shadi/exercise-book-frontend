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
}
