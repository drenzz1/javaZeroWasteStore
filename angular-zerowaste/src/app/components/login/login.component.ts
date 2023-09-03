import { Component, Inject, OnInit } from '@angular/core';

import {Router} from "@angular/router";
import {UserService} from "../../service/user-service.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model:any={};
  getData!:boolean;


  constructor(private Userservice :UserService,private router:Router) { }

  ngOnInit(): void {

  }
  loginUser(){
    var user = this.model.username;
    var password = this.model.password;

    this.Userservice.getUserData(user,password).subscribe((res:any)=>{
      this.getData=res;

      if(this.getData == true){
        this.router.navigate(["/users"]);
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
