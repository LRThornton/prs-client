import { Component, OnInit } from '@angular/core';
import { SystemService } from 'src/app/core/system.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})

export class UserLoginComponent implements OnInit {

  login: string = "";
  password: string = "";
  constructor(
    
    private syssvc: SystemService
  ) { }

  submit(): void{
  this.syssvc.login(this.login, this.password).subscribe({
    next: (res) => {
      console.log("Login successful");
    },
    error: (err) => {
      console.error("Login unsuccessful!");
    }
  });
}

  ngOnInit(): void {
  }

}

