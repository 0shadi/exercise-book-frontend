import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../http.service';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemRegistrationService {

  constructor(
    private http:HttpClient,
    private httpService:HttpService
  ) { }

  serviceCall(form_details:any){
    const requestUrl = environment.baseUrl + '/item-registration';

    let headers = {};
    if (this.httpService.getAuthToken() !== null) {
      headers = {
        Authorization: 'Bearer ' + this.httpService.getAuthToken(),
      };
    }

    return this.http.post(requestUrl,form_details,{headers:headers});
  }

  getItem(){
    const requestUrl = environment.baseUrl + '/item-registration';

    let headers = {};
    if (this.httpService.getAuthToken() !== null) {
      headers = {
        Authorization: 'Bearer ' + this.httpService.getAuthToken(),
      };
    }

    return this.http.get(requestUrl, {headers:headers});
  }

  editItem(itemId:number, value:any){
    const requestUrl = environment.baseUrl + '/item-registration/'+itemId.toString();

    let headers = {};
    if (this.httpService.getAuthToken() !== null) {
      headers = {
        Authorization: 'Bearer ' + this.httpService.getAuthToken(),
      };
    }

    return this.http.put(requestUrl,value,{headers:headers});
  }

  deleteItem(id:any){
    const requestUrl = environment.baseUrl + '/item-registration/'+ id.toString();

    let headers = {};
    if (this.httpService.getAuthToken() !== null) {
      headers = {
        Authorization: 'Bearer ' + this.httpService.getAuthToken(),
      };
    }

    return this.http.delete(requestUrl,{headers:headers});
  }
}
