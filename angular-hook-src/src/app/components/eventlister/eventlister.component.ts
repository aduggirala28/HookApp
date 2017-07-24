import { Component, OnInit } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {AuthService} from '../../services/auth.service';


interface header{
  headerkey: String[]
}

@Component({
  selector: 'app-eventlister',
  templateUrl: './eventlister.component.html',
  styleUrls: ['./eventlister.component.css']
})


export class EventlisterComponent implements OnInit {

  allheaders : header;
  head: String;
  head0:String[];
  eventList:any[];
  event:String;
  headerkey:String;

  constructor(private http:Http,
    private authService:AuthService,
  ){ 

    this.head0=[];
    //Array of the headers, when the add header functionality is used .these show up in the select option.
    this.authService.getHeaders().subscribe(res=>{
      if(res!={}){
        console.log("These are the header list for the user "+res);
        this.head0=res.allheaders;
      }
      else{
        this.head0=[];
      }
  });

    this.loadEvents();
  }

loadEvents(){
    this.authService.getAllEvents().subscribe(res=>{
      console.log(res);
      const list=res;
      this.eventList=list.list;
    });
  }
  ngOnInit() {
    //get all the headers to load here from the backend when the component is initialized
    //console.log(JSON.stringify(this.authService.getAllEvents()));
  }

  

  onEventSubmit(){
    const Event ={
    headerkey: this.headerkey,
    event: this.event
    }
    this.eventList.push(Event);
    this.authService.registerEvent(Event).subscribe(data => {
      if(data.success){
        this.loadEvents();
        console.log("The event has been added");
      }
      else{
        console.log("Something went wrong, event not added ");
      }
    });

    
  }

  deleteEvent(i,id){
      //var tmpEvent = this.eventList[i];
      this.authService.deleteEvent(id).subscribe(data => {
        if(data.success){
          console.log("Delete Event");
          this.eventList.splice(i,1);
        } else{
           console.log("Something went wrong, event not deleted ");
        }  
        //console.log(this.eventList);
      });

  }

  addHeader(){
    console.log("add headers:"+this.head0);
    const holder = this.head;
    console.log(holder);
    this.head0.push(holder);
    console.log(this.head0);
    this.authService.submitHeaders(this.head0).subscribe(data => {
      if(data.success){
        console.log("The header list has been updated");
      }
      else{
        console.log("Something went wrong, headers were not added");
      }
    });
  }

  /** delete header with events associated */
  deleteHeader(i){
    var header_delete = this.head0[i];
    this.head0.splice(i,1);
    this.authService.deleteHeader(this.head0).subscribe(data =>{
      if(data.success){
        console.log('Header removed.');
      } else {
        console.log("Failed to delete header.");
      }
    })

    // related events 
    this.authService.deleteHeaderAndEvents(header_delete).subscribe(data =>{
      if(data.success) {
        console.log('Header and Events removed.');
        this.loadEvents();
      }
      else console.log("Failed to remove events related.");
    })

  }

  addAnother(){
    console.log("another");
  }

}
