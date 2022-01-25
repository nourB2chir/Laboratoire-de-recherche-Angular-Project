import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ToolsService } from '../services/tools.service';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})
export class ToolsComponent implements OnInit {

  Tools : any 
  term!: string;
  isAdmin = false;

  constructor(private cookieService: CookieService, private toolService:ToolsService) { }

  ngOnInit(): void {
    if (this.cookieService.check('admin')){
      this.isAdmin = true;
    }
    this.toolService.getAllTools().subscribe(
      result=>{
       this.Tools = result._embedded.outils
       console.log(typeof result._embedded.outils[0].date)

      },
      error =>{
        console.log(error)
      })
  }

  reformDate(date:String){
    return date.substring(0, 10)
  }

  deleteTool(id:number){
    this.toolService.detacherTool(String(id))
    //this.router.navigate(['']);
  }

}
