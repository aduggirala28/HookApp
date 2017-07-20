import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
//import {FlashMessageService} from angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authService:AuthService,
    private router:Router
    //private flashMessage:FlashMessagesService
  ) { }

  ngOnInit() {
  }


//not an observable so its not returning anything
onLogoutClick(){
this.authService.logout();
//this.flashMessage.show('you are logges out', {cssClass:'alert-success'});
console.log('you are logged out!!');
this.router.navigate(['/login']);
return false;
}
}
