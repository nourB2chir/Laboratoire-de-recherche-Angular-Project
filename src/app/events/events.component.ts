import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { EventsService } from '../services/events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events : any;
  term!: string;
  isAdmin = false;

  constructor(private cookieService: CookieService, private eventService:EventsService) { }

  ngOnInit(): void {
    if (this.cookieService.check('admin')){
      this.isAdmin = true;
    }
    this.eventService.getAllEvents().subscribe(
      result=>{
       this.events = result._embedded.evenements
      },
      error =>{
        console.log(error)
      })
  }

  deleteEvent(id:number){
    this.eventService.detacherEvent(String(id))
  }

  reformDate(date:String){
    return date.substring(0, 10)
  }

}
