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

  requests!: Request[];
  sortColumn: string = "status";
  sortOrderAsc: boolean = true;

  constructor(
    private syssvc: SystemService,
    private reqsvc: RequestService,
    
  ) { }  


  ngOnInit(): void {
    this.syssvc.chkLogin();
    this.reqsvc.reviews(this.syssvc.user.id).subscribe({
      next: (res) => {console.log (res) 
      this.requests = res},
      error: (err) => {console.error (err)}
    })
  }
}


