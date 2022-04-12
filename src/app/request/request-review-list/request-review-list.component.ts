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
  searchCriteria: string = "";


  constructor(
    private syssvc: SystemService,
    private reqsvc: RequestService,
    
  ) { }  


  ngOnInit(): void {
    this.syssvc.chkLogin();
    let userId = this.syssvc.getLoggedInUser()!.id;
    this.reqsvc.reviews(userId).subscribe({
      next: (res) => {console.log (res);
        console.debug(res);
        this.requests = res;
      },
      error: (err) => console.error(err)
    });
  }
}

