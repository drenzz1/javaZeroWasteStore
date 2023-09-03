import { Component, Inject, OnInit } from '@angular/core';
import {UserserviceService} from "../../service/userservice.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model:any={};
  getData!:boolean;


  constructor(private Userservice :UserserviceService,private router:Router) { }

  ngOnInit(): void {

  }
  loginUser(){
    var user = this.model.username;
    var password = this.model.password;

    this.Userservice.getUserData(user,password).subscribe((res:boolean)=>{
      this.getData=res;

      if(this.getData == true){
        this.router.navigate(["/products"]);
      }else{
        alert("Invalid users");
      }
    })
  }
  logout(){
    this.getData;
    if (this.getData==false){
      this.router.navigate(["/login"]);
    }
  }
}
