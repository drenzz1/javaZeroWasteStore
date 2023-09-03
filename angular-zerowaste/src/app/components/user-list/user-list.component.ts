
import { Observable } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import {Users} from "../../common/users";
import {UserService} from "../../service/user-service.service";
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit{


  users!: Observable<Users[]>;

  constructor(private Userservice: UserService,
              private router: Router) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.users = this.Userservice.getUserList();
  }

  deleteUser(id: number) {
    this.Userservice.deleteUser(id)
        .subscribe(
            data => {
              console.log(data);
              this.reloadData();
            },
            error => console.log(error));
  }

  userDetails(id: number){
    this.router.navigate(['details', id]);
  }

  updateUser(id: number){
    this.router.navigate(['update', id]);
  }


}
