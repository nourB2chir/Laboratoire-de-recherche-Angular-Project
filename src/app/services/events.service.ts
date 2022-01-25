import { DatePipe } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http:HttpClient, private datePipe: DatePipe) { }

  getAllEvents(){
    let data = this.http.get<any>("http://localhost:4200/api/EVENEMENT-SERVICE/evenements");
    return data;
  }

  addEvent(titre:string, lieu:string){
      let myDate = new Date();
      let latest_date =this.datePipe.transform(myDate, 'yyyy-MM-dd');
      let data = this.http.post<any>("http://localhost:4200/api/EVENEMENT-SERVICE/evenements",
      {
        "titre": titre,
        "date": latest_date,
        "lieu": lieu
    });
      return data;
  }

  deleteEvent(id:string){
    this.http.delete<any>("http://localhost:4200/api/EVENEMENT-SERVICE/evenements/"+id).subscribe(() => console.log("done"));
    location.reload();
  }

  detacherEvent(idevent:string){
    const params = new HttpParams().set('idevent', idevent);
    this.http.delete<any>("http://localhost:4200/api/MEMBRE-SERVICE/membres/desaffecter/event", 
    {
      params: params
    }).subscribe(()=>this.deleteEvent(idevent))
  }
}
