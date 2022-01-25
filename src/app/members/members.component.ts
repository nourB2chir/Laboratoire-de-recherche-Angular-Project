import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MemberService } from '../services/member.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  noStudent = true
  noProf = true
  students : any
  profs : any
  term!: string;
  admin!: string;
  isAdmin!: boolean;

  constructor(private _sanitizer: DomSanitizer, private cookieService: CookieService, private memberService:MemberService, public router:Router) { }

  ngOnInit(): void {
    if(this.cookieService.check('admin')){
      this.admin = "Admin";
      this.isAdmin = true;
    }
    this.memberService.getAllStudents().subscribe(
      result=>{
       this.students = result
      },
      error =>{
        this.noStudent = false
      })
    this.memberService.getAllProf().subscribe(
      result=>{
        this.profs = result
      },
      error =>{
        this.noProf = false
      })
  }

  deleteMember(id:number){
    this.memberService.DeletMember(String(id))
  }

  public getSantizeUrl(url : string) {
    return this._sanitizer.bypassSecurityTrustUrl(url);
}

}
