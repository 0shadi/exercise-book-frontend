import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../http.service';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupplierRegistrationService {
  
  constructor(
    private http:HttpClient,
    private httpService: HttpService
  ) { }

  serviceCall(form_details:any){
    const requestUrl = environment.baseUrl + '/supplier-registration';

    let headers = {};
    if (this.httpService.getAuthToken() !== null) {
      headers = {
        Authorization: 'Bearer ' + this.httpService.getAuthToken(),
      };
    }

    return this.http.post(requestUrl,form_details,{headers:headers});
  }

  getItem() {
    const requestUrl = environment.baseUrl + '/supplier-registration';

    let headers = {};
    if (this.httpService.getAuthToken() !== null) {
      headers = {
        Authorization: 'Bearer ' + this.httpService.getAuthToken(),
      };
    }

    return this.http.get(requestUrl, {headers:headers});
  }

  editItem(supplierId: any, value: any) {
    const requestUrl = environment.baseUrl + '/supplier-registration/'+supplierId.toString();

    let headers = {};
    if (this.httpService.getAuthToken() !== null) {
      headers = {
        Authorization: 'Bearer ' + this.httpService.getAuthToken(),
      };
    }

    return this.http.put(requestUrl,value,{headers:headers});
  }
 

  
}
