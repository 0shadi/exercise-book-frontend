import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../http.service';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormDemoServiceService {

  constructor(private http:HttpClient,
              private httpService : HttpService
  ) { }
  
  serviceCall(form_details: any){
    console.log("In the service");

    const requestUrl = environment.baseUrl + '/form-demo'; // http://localhost:8080/form-demo

    let headers = {};

    if (this.httpService.getAuthToken() !== null) {
      headers = {
        Authorization: 'Bearer ' + this.httpService.getAuthToken(),
      };
    }
    return this.http.post(requestUrl, form_details , {headers:headers});
  }

  getData(){
    const requestUrl = environment.baseUrl + '/form-demo'; // http://localhost:8080/form-demo

    let headers = {};

    if (this.httpService.getAuthToken() !== null) {
      headers = {
        Authorization: 'Bearer ' + this.httpService.getAuthToken(),
      };
    }

    return this.http.get(requestUrl,headers);
  }

  editData(id:number,form_details:any){
    console.log("In Edit data");

    //Specify the URL
    const requestUrl = environment.baseUrl + '/form-demo/' +id.toString(); // http://localhost:8080/form-demo

    //Set headers
    let headers = {};
    if (this.httpService.getAuthToken() !== null) {
      headers = {
        Authorization: 'Bearer ' + this.httpService.getAuthToken(),
      };
    }

    //Put request
    return this.http.put(requestUrl, form_details , {headers:headers});
  }

  deleteData(id:number){
    console.log("In Delete data");

    //Specify the URL
    const requestUrl = environment.baseUrl + '/form-demo/' +id.toString(); // http://localhost:8080/form-demo

    //Set headers
    let headers = {};
    if (this.httpService.getAuthToken() !== null) {
      headers = {
        Authorization: 'Bearer ' + this.httpService.getAuthToken(),
      };
    }

    //Delete request
    return this.http.delete(requestUrl, {headers:headers});
  }
  }
