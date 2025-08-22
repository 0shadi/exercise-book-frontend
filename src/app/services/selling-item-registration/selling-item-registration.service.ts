import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SellingItemRegistrationService {
  
  constructor(
    private http:HttpClient,
    private httpService:HttpService
  ) { }

  serviceCall(form_details:any){
    const requestUrl = environment.baseUrl + '/selling-item-registration';
    
    let headers = {};
    if (this.httpService.getAuthToken() !== null) {
      headers = {
        Authorization: 'Bearer ' + this.httpService.getAuthToken(),
      };
    }

    return this.http.post(requestUrl,form_details,{headers:headers});
      
  }

  getItem() {
    const requestUrl = environment.baseUrl + '/selling-item-registration';
    
    let headers = {};
    if (this.httpService.getAuthToken() !== null) {
      headers = {
        Authorization: 'Bearer ' + this.httpService.getAuthToken(),
      };
    }

    return this.http.get(requestUrl, {headers:headers});
  }

  editItem(itemId:any, value:any){
    const requestUrl = environment.baseUrl + '/selling-item-registration/'+ itemId.toString();
    
    let headers = {};
    if (this.httpService.getAuthToken() !== null) {
      headers = {
        Authorization: 'Bearer ' + this.httpService.getAuthToken(),
      };
    }

    return this.http.put(requestUrl,value,{headers:headers});
  }

  deleteItem(id:any){
    const requestUrl = environment.baseUrl + '/selling-item-registration/'+ id.toString();
    
    let headers = {};
    if (this.httpService.getAuthToken() !== null) {
      headers = {
        Authorization: 'Bearer ' + this.httpService.getAuthToken(),
      };
    }

    return this.http.delete(requestUrl,{headers:headers});
  }

  getItemTypes() {
    const requestUrl = environment.baseUrl + '/selling-item-types';
    
    let headers = {};
    if (this.httpService.getAuthToken() !== null) {
      headers = {
        Authorization: 'Bearer ' + this.httpService.getAuthToken(),
      };
    }

    return this.http.get(requestUrl, {headers:headers});
  }

}
