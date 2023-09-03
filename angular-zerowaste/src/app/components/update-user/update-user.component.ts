import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Users} from "../../common/users";
import {UserService} from "../../service/user-service.service";

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit{



  id!: number;
  user!: Users;

  constructor(private route: ActivatedRoute,private router: Router,
              private userService: UserService) { }

  ngOnInit() {
    this.user = new Users();

    this.id = this.route.snapshot.params['id'];

    this.userService.getUser(this.id)
        .subscribe(data => {
          console.log(data)
          this.user = data;
        }, error => console.log(error));
  }

  updateEmployee() {
    this.userService.updateUser(this.id, this.user)
        .subscribe(data => console.log(data), error => console.log(error));
    this.user = new Users();
    this.gotoList();
  }

  onSubmit() {
    this.updateEmployee();
  }

  gotoList() {
    this.router.navigate(['/users']);
  }
}
