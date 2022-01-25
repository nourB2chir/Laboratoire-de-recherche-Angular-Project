import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { MemberService } from '../services/member.service';
import { PublicationsService } from '../services/publications.service';
import { EventsService } from '../services/events.service';
import { ToolsService } from '../services/tools.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {

  thisId:string | undefined;
  currentUser : any;
  connectedUserId: any;
  modalRef!: BsModalRef;
  isStudent = true;
  hasNotEncadrant = true;
  teachers = [];
  imagePath:any;

  addPubForm: FormGroup = new FormGroup({
    titre : new FormControl(''),
    type : new FormControl(''),
  });

  addEventForm: FormGroup = new FormGroup({
    titre : new FormControl(''),
    lieu : new FormControl(''),
  });

  addToolForm: FormGroup = new FormGroup({
    source : new FormControl(''),
  });

  addEncadrantForm: FormGroup = new FormGroup({
    encadrant : new FormControl('')
  })

  constructor(private _sanitizer: DomSanitizer, private modalService: BsModalService, private cookieService: CookieService,private route: ActivatedRoute, private router:Router, private memberService:MemberService, private pubService:PublicationsService, private eventService:EventsService, private toolService:ToolsService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        this.thisId = params.id; 
      });

      if (this.cookieService.check('user')){
        this.memberService.getMemberByEmail(this.cookieService.get('user')).subscribe(
          result=>{
            this.connectedUserId = result.id;
          },error =>{
            console.log(error)
          })
      }

      if(this.thisId != null){
        this.memberService.getFullMember(this.thisId).subscribe(
          result=>{
            if(result.photo === null){
              this.imagePath = this._sanitizer.bypassSecurityTrustUrl("./assets/images/Avatar-11.png")
            }else{
              this.imagePath = this._sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + result.photo)
            }
            this.currentUser = result
            if(result.encadrant === null){
              this.hasNotEncadrant = false
              this.memberService.getAllProf().subscribe(
                result=>{
                  this.teachers = result
                },
                error =>{
                })
            }
            if(result.diplome !== undefined){
              this.isStudent = true;
              console.log(result)
            }else{
              this.isStudent = false;
            }
          },
          error =>{
            this.router.navigate([''], { relativeTo: this.route });
          })
      }else{
        this.router.navigate([''], { relativeTo: this.route });
      } 
  }

  openModal(modalTemplate: TemplateRef<any>) {
    this.modalRef = this.modalService.show(modalTemplate,
      {
        class: 'modal-dialogue-centered modal-md',
        backdrop: 'static',
        keyboard: true
      }
    );
  }
 
  addPub(){
    this.pubService.AddPub(this.addPubForm.value.titre, this.addPubForm.value.type).subscribe( 
      result=>{
        this.memberService.affectPublicationToMember(this.connectedUserId ,result.id).subscribe(
          result=>{
            window.location.reload();
          },
          error =>{
            console.log(error)
        })
    },
      error =>{
        console.log(error)
    });
  }

  get theaddPubForm(){
    return this.addPubForm.controls;
  } 

  addEvent(){
    this.eventService.addEvent(this.addEventForm.value.titre, this.addEventForm.value.lieu).subscribe( 
      result=>{
        this.memberService.affectEventToMember(this.connectedUserId ,result.id).subscribe(
          result=>{
            window.location.reload();
          },
          error =>{
            console.log(error)
        })
    },
      error =>{
        console.log(error)
    });
  }

  get theaddEventForm(){
    return this.addEventForm.controls;
  } 


  addTool(){
    console.log(this.addToolForm.value.lieu)
    this.toolService.addTool(this.addToolForm.value.source).subscribe( 
      result=>{
        this.memberService.affectToolToMember(this.connectedUserId ,result.id).subscribe(
          result=>{
            window.location.reload();
          },
          error =>{
            console.log(error)
        })
    },
      error =>{
        console.log(error)
    });
  }

  get theaddToolForm(){
    return this.addToolForm.controls;
  } 
  
  addEncadrantToStudent(){
    console.log(this.addEncadrantForm.value.encadrant)
    this.memberService.affectEncadrantToStudent(this.connectedUserId ,this.addEncadrantForm.value.encadrant).subscribe( 
      result=>{},
      error =>{
        console.log(error)
    });

  }

  get theAddEncadrantForm(){
    return this.addToolForm.controls;
  } 


}
