import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';


//import {FlashMessageService} from 'angular2-flash-message';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
name: String;
username:String;
email:String;
password:String;

//any service needs to be injected into the constructor
//validateService object of the type ValidateService

//constructor(private validateService: ValidateService, private flashmessageservice: FlashMessageService ) { }

  constructor(private validateService: ValidateService,
  private authService:AuthService,
  private router : Router
  ) { }

  ngOnInit() {
  }

onRegisterSubmit(){
  const user={
    name: this.name,
    email:this.email,
    username:this.username,
    password: this.password
  }

//flashmessageservice.show("please..",{cssClass:'alert-danger', timeout:3000});

if(!this.validateService.validateRegister(user)){
  console.log('Please fill in the form');
  return false;
}

if(!this.validateService.validateEmail(user.email)){
  console.log('invalid email');
  return false;
}

//Register User -- need to subscribe because its an observable
//flashmessageservice.show("now !!",{cssClass:'alert-success', timeout:3000});
this.authService.registerUser(user).subscribe(data => {
  if(data.success){
    console.log("You are now registered");
    this.router.navigate(['/login']);
  }
  else{
    console.log("Something went wrong");
    this.router.navigate(['/register']);
  }


});

}
}
