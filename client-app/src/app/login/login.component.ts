import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from 'src/shared-library/models/login.model';
import { AuthService } from 'src/shared-library/services/auth.service';
import { CoreAPIService } from 'src/shared-library/services/core-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginModel!:LoginModel;
  @ViewChild('hiddenBtn') hiddenBtn!: ElementRef<HTMLInputElement>;
   
  constructor(private authService:AuthService,private ApiService:CoreAPIService,private router:Router){
    this.loginModel = new LoginModel()
  }

  login(){
    if(this.loginModel.email != undefined || this.loginModel.email &&   this.loginModel.password != undefined || this.loginModel.password){
      this.ApiService.postStatic('login',this.loginModel).subscribe(res =>{
        if(res){
          debugger
          // this.authService.login(res);
          // this.router.navigateByUrl('home');
          console.log(res.message);
          this.authService.login(res.token);
          this.authService.setUserName(res.username);
          this.router.navigate([''])
          
        }
      })
    }
    else{
      console.log('Required Fields Missing')
    }
  }
  createAccount(){
    if((this.loginModel.email != undefined || this.loginModel.email != "") &&   (this.loginModel.password != undefined || this.loginModel.password != "") && (this.loginModel.userName != undefined || this.loginModel.userName != "")){
      this.ApiService.postStatic('signup',this.loginModel).subscribe(res =>{
        if(res){
          console.log('user registered sucessfully')
          this.hiddenBtn.nativeElement.checked = true;
        }
      })
    }
    else{
      console.log('Required Fields Missing')
    }
  }
}
