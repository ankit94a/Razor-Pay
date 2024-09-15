import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(userToken:string){
    localStorage.setItem('TOKEN',userToken);
  }

  setUserName(username:string){
    localStorage.setItem('USER_NAME',username)
  }

  getFromLocalStorage(type:string){
    return localStorage.getItem(type);
  }
}
