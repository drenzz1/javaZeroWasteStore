
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Users} from "../../common/users";
import {UserService} from "../../service/user-service.service";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit{

  user: Users = new Users();
  submitted = false;

  constructor(private Userservice :UserService,
              private router: Router) { }

  ngOnInit() {
  }

  newUser(): void {
    this.submitted = false;
    this.user = new Users();
  }

  save() {
    this.Userservice.createUser(this.user)
        .subscribe(data => console.log(data), error => console.log(error));
    this.user = new Users();
    this.gotoList();
  }

  onSubmit() {
    this.submitted = true;
    this.save();
    this.router.navigate(["/users"]);
  }

  gotoList() {
    this.router.navigate(['/users']);
  }
}
