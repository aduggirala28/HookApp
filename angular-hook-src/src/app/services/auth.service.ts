import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';



@Injectable()
export class AuthService {
  //class properties
  authToken: any;
  user: any;
  isDev:boolean;

//Inject http in the constructor
  constructor(private http:Http) {
  }

  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/register', user,{headers:headers})
      .map(res => res.json());
  }
  
  registerEvent(event){
    this.loadToken();
    const newEvent={
      headerkey: event.headerkey,
      event: event.event,
      username: JSON.parse(this.user).username
    }
    console.log("The user is " + JSON.parse(this.user).username);
    console.log("the newEvent being sent"+JSON.stringify(newEvent));
    let headers = new Headers();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/eventlister', newEvent,{headers:headers})
      .map(res => res.json());
  }

  deleteEvent(id){
    this.loadToken();
    let headers = new Headers();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/users/eventlister?id='+id,{headers:headers})
            .map(res => res.json());
  }

  getAllEvents(){
    this.loadToken();
    const username = JSON.parse(this.user).username;
    let headers = new Headers();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/users/eventlister?username='+username,{headers:headers})
      .map(res => res.json());
  }


  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/authenticate',user,{headers: headers})
      .map(res => res.json());
  }


  getProfile(){
    let headers= new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/users/profile',{headers:headers})
    .map(res=>res.json());
  }



  storeUserData(token, user){
    //angular jwt automatically looks for the key 'id_token' for the auth token
    localStorage.setItem('id_token',token);
    //localStorage can only store strings 
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken=token;
    this.user=user
    
  }

  loadToken(){
  const token=localStorage.getItem('id_token');
  const user0=localStorage.getItem('user');
  this.user=user0;
  this.authToken=token;

  }


  loggedIn(){
    return tokenNotExpired('id_token');
  }
  
  logout(){
    this.authToken=null;
    this.user=null;
    localStorage.clear();

  }

  submitHeaders(allheaders){
    this.loadToken();
    const header_obj={
      username: JSON.parse(this.user).username, 
      allheaders: allheaders
    }
    let headers= new Headers();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/headers',header_obj,{headers:headers})
      .map(res => res.json());

  }

  getHeaders(){
    let headers= new Headers();
    this.loadToken();
    const username=JSON.parse(this.user).username;
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/users/headers?username='+username,{headers:headers})
    .map(res=>res.json());
  }

  deleteHeader(head){
    this.loadToken();
    const header_update = {
      username: JSON.parse(this.user).username,
      allheaders: head
    }
    let headers = new Headers();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    console.log(head);
    return this.http.post('http://localhost:3000/users/headers',header_update,{headers:headers})
            .map(res => res.json());

  }

  deleteHeaderAndEvents(header_delete){
    this.loadToken();
    let headers = new Headers();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/users/eventlister?headerkey='+header_delete,{headers:headers})
            .map(res => res.json());

  }
}
