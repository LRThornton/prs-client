import { Component, OnInit } from '@angular/core';
import { SystemService } from 'src/app/core/system.service';
import { RequestService } from '../request.service';
import { Request } from '../request.class';


@Component({
  selector: 'app-request-review-list',
  templateUrl: './request-review-list.component.html',
  styleUrls: ['./request-review-list.component.css']
})
export class RequestReviewListComponent implements OnInit {

  requests: Request[] = [];
  request: Request = new Request();


  constructor(
    private syssvc: SystemService,
    private reqsvc: RequestService,
    
  ) { }  


  ngOnInit(): void {
    this.request.userId = +this.syssvc.checkIfLoggedIn
    this.reqsvc.reviews(this.request.userId).subscribe(
      res => {
        console.log(res);
        this.requests = res as Request[];
      },
      err => {
        console.error(err);
      }
    );
  }
}


