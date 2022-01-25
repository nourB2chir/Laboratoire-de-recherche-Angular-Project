import { DatePipe } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  constructor(private http:HttpClient, private datePipe: DatePipe) { }

  getAllTools(){
    let data = this.http.get<any>("http://localhost:4200/api/OUTIL-SERVICE/outils");
    return data;
  }

  addTool(source:string){
    let myDate = new Date();
    let latest_date =this.datePipe.transform(myDate, 'yyyy-MM-dd');
    let data = this.http.post<any>("http://localhost:4200/api/OUTIL-SERVICE/outils",
    {
      "date": latest_date,
      "source": source
  });
    return data;
}

  deleteTool(id:string){
    this.http.delete<any>("http://localhost:4200/api/OUTIL-SERVICE/outils/"+id).subscribe(() => console.log('Delete successful'));
    location.reload();
  }

  detacherTool(idtool:string){
    const params = new HttpParams().set('idtool', idtool);
    this.http.delete<any>("http://localhost:4200/api/MEMBRE-SERVICE/membres/desaffecter/tool", 
    {
      params: params
    }).subscribe(()=>this.deleteTool(idtool))
  }
}
