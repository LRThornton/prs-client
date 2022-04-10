import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/user/user.class';
import { UserService } from 'src/app/user/user.service';
import { RequestService } from '../request.service';
import { Request } from '../request.class';
import { SystemService } from 'src/app/core/system.service';
import { Requestline } from 'src/app/requestline/requestline.class';

@Component({
  selector: 'app-request-review-item',
  templateUrl: './request-review-item.component.html',
  styleUrls: ['./request-review-item.component.css']
})
export class RequestReviewItemComponent implements OnInit {

  
  request!: Request;
  showVerifyButton: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private reqsvc:RequestService,
    private router: Router,
    private syssvc: SystemService,
  ) { }

  review(): void {
    this.reqsvc.review(this.request).subscribe({
      next: (res) => {
        console.debug("Review:");
        this.refresh();
      },
      error: (err) => console.error(err) 
    });
  }
  edit(reqline: Requestline): void {
    this.router.navigateByUrl(`/requestlines/edit/${reqline.id}`);
  }
  remove(reqline: Requestline): void {
    this.reqsvc.remove(reqline.id).subscribe({
      next: (res) => {
        console.debug("Requestline removed");
        this.refresh();
      },
      error: (err) => console.error(err)
    });
  }

  approve(): void {
    this.reqsvc.approve(this.request).subscribe({
      next: (res) => {
        console.debug("Request approved.");
        this.refresh();
      },
      error: (err) => console.error(err)
    });
  }
  reject(): void {
    this.showVerifyButton = !this.showVerifyButton;
  }
  verifyReject(): void {
    this.showVerifyButton = false;
    this.reqsvc.reject(this.request).subscribe({
      next: (res) => {
        console.debug("Request rejected.");
        this.refresh();
      },
      error: (err) => console.error(err)
    });
  }

  refresh(): void {
    let id = this.route.snapshot.params["id"];
    this.reqsvc.get(id).subscribe({
      next: (res) => {
        console.debug("Request:", res);
        this.request = res;
      },
      error: (err) => console.error(err)
    });
  }

  ngOnInit(): void {
    this.refresh();
  }

}