import { DatePipe } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PublicationsService {

  constructor(private http:HttpClient, private datePipe: DatePipe) { }

  getAllPublications(){
    let data = this.http.get<any>("http://localhost:4200/api/PUBLICATION-SERVICE/publications");
    return data;
  }

  AddPub(titre:string, type:string){
    let myDate = new Date();
    let latest_date =this.datePipe.transform(myDate, 'yyyy-MM-dd');
    let data = this.http.post<any>("http://localhost:4200/api/PUBLICATION-SERVICE/publications",
    {
      "titre": titre,
      "type": type,
      "dateapparition": latest_date
    });
    return data;
  }

  deletePub(id:string){
    this.http.delete<any>("http://localhost:4200/api/PUBLICATION-SERVICE/publications/"+id).subscribe(() => console.log('Delete successful'));
    location.reload();
  }

  detacherPub(idpub:string){
    const params = new HttpParams().set('idpub', idpub);
    this.http.delete<any>("http://localhost:4200/api/MEMBRE-SERVICE/membres/desaffecter/publication", 
    {
      params: params
    }).subscribe(()=>this.deletePub(idpub))
  }

}
