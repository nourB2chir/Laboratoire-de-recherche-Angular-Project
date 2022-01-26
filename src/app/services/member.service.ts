import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http:HttpClient) { }

  addStudent(firstName:String, lastName:string, cin:String, email:string, password:string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };
    let data = this.http.post<any>("http://localhost:4200/api/MEMBRE-SERVICE/membres/etudiant",
    {
      "cin": cin,
      "nom": firstName,
      "prenom": lastName,
      "email": email,
      "password": password  
    },
    httpOptions)
    return data;
    
  }

  addTeacher(firstName:String, lastName:string, cin:string, email:string, password:string){
    let data = this.http.post<any>("http://localhost:4200/api/MEMBRE-SERVICE/membres/enseignant",
    {
      "cin": cin,
      "nom": firstName,
      "prenom": lastName,
      "email": email,
      "password": password  
    });
    return data;
  }

  getAllStudents(){
    let data = this.http.get<any>("http://localhost:4200/api/MEMBRE-SERVICE/membres/etudiants  ");
    return data;
  }

  getAllProf(){
    let data = this.http.get<any>("http://localhost:4200/api/MEMBRE-SERVICE/membres/enseignants");
    return data;
  }

  getAllMembers(){
    let data = this.http.get<any>("http://localhost:4200/api/MEMBRE-SERVICE/membres");
    return data;
  }

  getMemberByEmail(email:string){
    let data = this.http.get<any>("http://localhost:4200/api/MEMBRE-SERVICE/membres/email/"+email);
    return data;
  }

  getFullMember(id:string){
    let data = this.http.get<any>("http://localhost:4200/api/MEMBRE-SERVICE/fullmember/"+id);
    return data;
  }

  DeletMember(id:string){
    this.http.delete<any>("http://localhost:4200/api/MEMBRE-SERVICE/membres/"+id).subscribe(() => console.log('Delete successful'));;
    location.reload();
  }

  UpdateStudent(id:string, firstName:String, lastName:string, cin:String, email:string, dateNaissance:string, cv:string, diplome:string, photo:string){
    return this.http.put<any>(
      "http://localhost:4200/api/MEMBRE-SERVICE/membres/etudiant/"+id ,
      {
        "cin": cin,
        "nom": firstName,
        "prenom": lastName,
        "email": email,
        "dateNaissance": dateNaissance,
        "cv":cv,
        "photo":photo,
        "diplome":diplome 
      })
  }

  UpdateTeacher(id:string, firstName:String, lastName:string, cin:String, email:string, dateNaissance:string, cv:string, grade:string, etablissement:string, photo:String){
    return this.http.put<any>(
      "http://localhost:4200/api/MEMBRE-SERVICE/membres/enseignant/"+id ,
      {
        "cin": cin,
        "nom": firstName,
        "prenom": lastName,
        "email": email,
        "dateNaissance": dateNaissance,
        "cv":cv,
        "grade":grade,
        "photo":photo,
        "etablissement":etablissement 
      })
  }

  affectEncadrantToStudent(idetd:string, idens:string){
    const params = new HttpParams()
            .set('idetd', idetd)
            .set('idens', idens);
    return this.http.put<any>("http://localhost:4200/api/MEMBRE-SERVICE/membres/etudiant" ,
      null,
      {
        params: params
      }).subscribe(()=>location.reload())
  }

  affectPublicationToMember(memberId:string, publicationId:string){
    const params = new HttpParams()
            .set('idetd', memberId)
            .set('idpub', publicationId);

    return this.http.put<any>(
      "http://localhost:4200/api/MEMBRE-SERVICE/membres/affecter/publication" ,
      null,
      {
        params: params
      })
  }

  affectEventToMember(memberId:string, eventId:string){
    const params = new HttpParams()
            .set('idMember', memberId)
            .set('idEvent', eventId);

    return this.http.put<any>(
      "http://localhost:4200/api/MEMBRE-SERVICE/membres/affecter/event" ,
      null,
      {
        params: params
      })
  }

  affectToolToMember(memberId:string, toolId:string){
    const params = new HttpParams()
            .set('idMember', memberId)
            .set('idOutil', toolId);

    return this.http.put<any>(
      "http://localhost:4200/api/MEMBRE-SERVICE/membres/affecter/tool" ,
      null,
      {
        params: params
      })
  }

  setPicture(memberId:string, photo:any){
    const params = new HttpParams().set('idMember', memberId);
    let fd = new FormData();
    fd.append("photo", photo)
    this.http.put<any>(
      "http://localhost:4200/api/MEMBRE-SERVICE/membres/Edit/Photo" ,
      fd,
      {
        params: params
      }).subscribe(()=>location.reload() )
  
  }

  


    

}
