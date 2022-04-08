import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user/user.class';




@Injectable({
  providedIn: 'root'
})
export class SystemService {

  baseUrl:string="http://localhost:41589/api/users";

  user: any = null;

  constructor(   
    private router:Router

    ) { }

    
    checkIfLoggedIn(): void{
      if(this.user==null){
        this.router.navigateByUrl('/login');
      }
    }
}



  
