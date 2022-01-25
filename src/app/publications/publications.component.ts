import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { PublicationsService } from '../services/publications.service';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css']
})
export class PublicationsComponent implements OnInit {

  publications : any;
  term!: string;
  isAdmin = false;

  constructor(private cookieService: CookieService, private publicationService:PublicationsService) { }

  ngOnInit(): void {
    if (this.cookieService.check('admin')){
      this.isAdmin = true;
    }
    this.publicationService.getAllPublications().subscribe(
      result=>{
       this.publications = result._embedded.publications
      },
      error =>{
        console.log(error)
      })
  }

  deletePub(id:number){
    this.publicationService.detacherPub(String(id))
  }

  reformDate(date:String){
    return date.substring(0, 10)
  }

}
