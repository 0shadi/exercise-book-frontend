import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class StockServiceService {

  constructor(
    private http:HttpClient,
    private httpService: HttpService
  ) { }

  getStock() {
    const requestUrl = environment.baseUrl + '/stock-update';

    let headers = {};
    if (this.httpService.getAuthToken() !== null) {
      headers = {
        Authorization: 'Bearer ' + this.httpService.getAuthToken(),
      };
    }

    return this.http.get(requestUrl, {headers:headers});
  }

  editStock(id: any, value: any) {
    const requestUrl = environment.baseUrl + '/stock-update/'+id.toString();

    let headers = {};
    if (this.httpService.getAuthToken() !== null) {
      headers = {
        Authorization: 'Bearer ' + this.httpService.getAuthToken(),
      };
    }

    return this.http.put(requestUrl,value,{headers:headers});
  }

  // deleteStock(id:any){
  //   const requestUrl = environment.baseUrl + '/stock-update/'+id.toString();

  //   let headers = {};
  //   if (this.httpService.getAuthToken() !== null) {
  //     headers = {
  //       Authorization: 'Bearer ' + this.httpService.getAuthToken(),
  //     };
  //   }

  //   return this.http.delete(requestUrl,{headers:headers});
  // }
}
