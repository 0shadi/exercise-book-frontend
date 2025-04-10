import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { HttpService } from '../http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OnlineOrderingService {

  constructor(
    private http:HttpClient,
    private httpService:HttpService
  ) { }

  getSellingItems()  {
    const requestUrl = environment.baseUrl + '/selling-item-registration';
    
        let headers = {};
        if (this.httpService.getAuthToken() !== null) {
          headers = {
            Authorization: 'Bearer ' + this.httpService.getAuthToken(),
          };
        }
    
        return this.http.get(requestUrl, {headers:headers});
  }
}
