import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerLoginService {

  constructor(
    private http:HttpClient,
    private httpService : HttpService
  ) { }

  serviceCall(form_details:any){
    const requestUrl = environment.baseUrl+'/customer-login';

    let headers = {};
    if (this.httpService.getAuthToken() !== null) {
      headers = {
        Authorization: 'Bearer ' + this.httpService.getAuthToken(),
      };
    }

    return this.http.post(requestUrl,form_details,{headers:headers});
  }

  getCustomerLogin(){
    const requestUrl = environment.baseUrl + '/customer-login';

    let headers = {};
    if (this.httpService.getAuthToken() !== null) {
      headers = {
        Authorization: 'Bearer ' + this.httpService.getAuthToken(),
      };
    }

    return this.http.get(requestUrl,{headers:headers});
  }

  editData(id: number, value: any) {
    const requestUrl = environment.baseUrl + '/customer-login/'+ id.toString();

    let headers = {};
    if (this.httpService.getAuthToken() !== null) {
      headers = {
        Authorization: 'Bearer ' + this.httpService.getAuthToken(),
      };
    }

    return this.http.put(requestUrl,value,{headers:headers});
  }


  deleteData(id: number) {
    const requestUrl = environment.baseUrl + '/customer-login/'+ id.toString();

    let headers = {};
    if (this.httpService.getAuthToken() !== null) {
      headers = {
        Authorization: 'Bearer ' + this.httpService.getAuthToken(),
      };
    }

    return this.http.delete(requestUrl,{headers:headers});
  }
}
