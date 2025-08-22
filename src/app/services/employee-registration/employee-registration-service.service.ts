import { EnvironmentInjector, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../http.service';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeRegistrationServiceService {
  
  constructor(
    private http:HttpClient,
    private httpService : HttpService
  ) { }

  serviceCall(form_details:any){
    const requestUrl = environment.baseUrl + '/employee-registration';

    let headers = {};
    if (this.httpService.getAuthToken() !== null) {
      headers = {
        Authorization: 'Bearer ' + this.httpService.getAuthToken(),
      };
    }
    
    return this.http.post(requestUrl,form_details,{headers:headers});
    
  }
  getEmployee() {
    const requestUrl = environment.baseUrl + '/employee-registration';

    let headers = {};
    if (this.httpService.getAuthToken() !== null) {
      headers = {
        Authorization: 'Bearer ' + this.httpService.getAuthToken(),
      };
    }

    return this.http.get(requestUrl,{headers:headers});
  }

  editData(employeeNumber: number, value: any) {
    const requestUrl = environment.baseUrl + '/employee-registration/'+ employeeNumber.toString();

    let headers = {};
    if (this.httpService.getAuthToken() !== null) {
      headers = {
        Authorization: 'Bearer ' + this.httpService.getAuthToken(),
      };
    }

    return this.http.put(requestUrl,value,{headers:headers});
  }


  deleteData(employeeNumber: number) {
    const requestUrl = environment.baseUrl + '/employee-registration/'+ employeeNumber.toString();

    let headers = {};
    if (this.httpService.getAuthToken() !== null) {
      headers = {
        Authorization: 'Bearer ' + this.httpService.getAuthToken(),
      };
    }

    return this.http.delete(requestUrl,{headers:headers});
  }
  }
  
 



