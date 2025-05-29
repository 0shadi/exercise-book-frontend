import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class BookCustomizeService {

  constructor(
    private http:HttpClient,
    private httpService:HttpService
  ) { }

  saveOrderDetails(form_details:any){
    const requestUrl = environment.baseUrl + '/customization-orderDetails';

    let headers = {};
    if (this.httpService.getAuthToken() !== null) {
      headers = {
        Authorization: 'Bearer ' + this.httpService.getAuthToken(),
      };
    }

    return this.http.post(requestUrl,form_details,{headers:headers});
  }

  saveBookDetails(form_details:any){
    const requestUrl = environment.baseUrl + '/customization-bookDetails';

    let headers = {};
    if (this.httpService.getAuthToken() !== null) {
      headers = {
        Authorization: 'Bearer ' + this.httpService.getAuthToken(),
      };
    }

    return this.http.post(requestUrl,form_details,{headers:headers});
  }

  saveBillingDetails(form_details:any){
    const requestUrl = environment.baseUrl + '/customization-billingDetails';

    let headers = {};
    if (this.httpService.getAuthToken() !== null) {
      headers = {
        Authorization: 'Bearer ' + this.httpService.getAuthToken(),
      };
    }

    return this.http.post(requestUrl,form_details,{headers:headers});
  }

  getCustomizedOrderDetails(){
    const requestUrl = environment.baseUrl + '/get-customized-order-details';

    let headers = {};
    if (this.httpService.getAuthToken() !== null) {
      headers = {
        Authorization: 'Bearer ' + this.httpService.getAuthToken(),
      };
    }

    return this.http.get(requestUrl, {headers:headers});
  }

  getCustomizedBookDetails(orderId){
    const requestUrl = environment.baseUrl + '/get-customized-book-details/' + orderId;

    let headers = {};
    if (this.httpService.getAuthToken() !== null) {
      headers = {
        Authorization: 'Bearer ' + this.httpService.getAuthToken()
      };
    }

    return this.http.get(requestUrl, { headers: headers });
  }
}
