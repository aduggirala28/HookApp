import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
//import {FlashMessageService} from angular2-flash-messages';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;


//all dependencies should be injected into the constructor 
  constructor(
    private authService:AuthService,
    private router:Router
    //private flashMessage:FlashMessagesService
  ) { }

  ngOnInit() {
  }

onLoginSubmit(){
 const user={
   username:this.username,
   password:this.password
 }
//Take this user object and send it to backend authenticate route
this.authService.authenticateUser(user).subscribe(data =>{
if(data.success){
 this.authService.storeUserData(data.token,data.user);
console.log('alert success');
this.router.navigate(['dashboard']);
} else{
 // this.flashMessage.show(data.msg, {cssClass: 'alert-danger',timeout:5000});
      console.log('alert danger');
      this.router.navigate(['login']);
}
});



}
}