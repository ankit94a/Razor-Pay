import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoreAPIService {
  BaseUrl:string = "http://localhost:3200/api/"
  constructor(private httpClient:HttpClient) { }

  protected getHeaders(){
    let httpOption = {
      headers : new HttpHeaders({
        'Accept': 'application/json',
      })
    }
    return httpOption;
  }
  protected getHeadersWithToken(){
    var authToke = localStorage.getItem('USER_TOKEN');
    let httpOpthions = {
      headers : new HttpHeaders({
        'Authorization': 'Bearer ' + authToke,
        'Accept' : 'application/json'
      })
    }
    return httpOpthions;
  }

  getWithHeader(url:string):any{
    return this.httpClient.get(`${this.BaseUrl}${url}`,this.getHeadersWithToken()).pipe(map(
      (res:any) =>{
      if(res){
        return res;
      }
    }),catchError((err)=>{
      return err;
    }));
  }

  postWithHeader(url:string,data:any):Observable<any>{
    return this.httpClient.post(`${this.BaseUrl}${url}`,data,this.getHeadersWithToken()).pipe(map((res:any)=>{
      if(res){
        return res;
      }
    })
    ,catchError((err)=>{
      return err;
    }))
  }

  postStatic(url:string,data:any):Observable<any>{
    debugger
    return this.httpClient.post(`${this.BaseUrl}${url}`,data,this.getHeaders()).pipe(map((res:any)=>{
      if(res){
        return res;
      }
    })
    ,catchError((err)=>{
      return err;
    }))
  }
}
