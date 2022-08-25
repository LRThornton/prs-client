import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SystemService } from 'src/app/core/system.service';
import { UserService } from 'src/app/user/user.service';
import { RequestService } from '../request.service';
import { Request } from '../request.class';
import { VendorService } from 'src/app/vendor/vendor.service';


@Component({
  selector: 'app-request-create',
  templateUrl: './request-create.component.html',
  styleUrls: ['./request-create.component.css']
})
export class RequestCreateComponent implements OnInit {

  request: Request = new Request();
 
  constructor(
    private reqsvc: RequestService,
    private router: Router,
    private sys: SystemService,
    private vndsvc: VendorService
  ) { }

 

save(): void {
  this.request.userId = this.sys.getLoggedInUser()!.id;
  this.reqsvc.create(this.request).subscribe({
    next: (res) => {
      console.debug("Request added");
      this.router.navigateByUrl("/requests/list");
    },
    error: (err) => console.error(err)
  });
}

ngOnInit(): void {
  this.sys.chkLogin();
}

}