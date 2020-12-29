import { Injectable } from '@angular/core';
import { ConstantModule} from './constants';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Http, Response, RequestOptions, Headers, Request, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { retry, catchError } from 'rxjs/operators';

import * as Rx from 'rxjs/Rx';
import 'rxjs/add/observable/of';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { throwError } from 'rxjs';
import { Route, Router } from "@angular/router";

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin':'*',
    'Authorization':'authkey',
    'userid':'1'
  })
};


@Injectable({
  providedIn: 'root'
})

export class ApiIntegrationService {

 constructor(private http: HttpClient,private constant:ConstantModule) { }
  public baseURL = this.constant.basePath;
 
  signup(data){    
      return this.http.post(this.baseURL+'college/signup',data).pipe(
        retry(3)
      );
  }


  login(data){    
    return this.http.post(this.baseURL+'college/login',data, {
        headers: new HttpHeaders()
            .set('Content-Type', 'application/json'),
        observe: 'response'
    })
    .map(res => {    
      return res;        
    }).pipe(
      retry(3) 
      //, catchError(this.handleError)    
    );
  }  

   getdatadashbord(){    
    return this.http.get(this.baseURL+'department/getdatadashbord').pipe(
      retry(3)
    );
}

    shareEmail(data){
       return this.http.post(this.baseURL+'department/shareEmail',data).pipe(
            retry(3)
          );
    }

    uploadStudent(data){
       return this.http.post(this.baseURL+'department/dashboarddata',data).pipe(
            retry(3)
          );
    }

// get student data for share and preview
    getStudentInfo(data){
      debugger
       return this.http.post(this.baseURL+'department/studentdetails',data).pipe(
            retry(3)
          );
    }

 }
