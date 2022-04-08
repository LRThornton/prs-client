import { Component, OnInit } from '@angular/core';
import { SystemService } from 'src/app/core/system.service';
import { UserService } from '../user.service';
import { User } from '../user.class';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})

export class UserLoginComponent implements OnInit {

  username: string = "";
  password: string = "";
  message: string = "";
 
  constructor(
    private syssvc: SystemService,
    private usersvc: UserService,
    private router: Router
  ) { }

  submit(): void {
    this.usersvc.login(this.username, this.password).subscribe({
      next: (res) => {
        console.log("Login successful!");
        this.syssvc.user=res;
        this.router.navigateByUrl("/request/list");
      },
      error: (err) => {
        if(err.status == 404){
          this.message="Username/Password NOT found!"
        }
        else{
          console.error("Login unsuccessful!"); 
        }
        
      }
    });
  }

  ngOnInit(): void {
  }

}

