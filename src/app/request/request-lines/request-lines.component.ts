import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestlineService } from 'src/app/requestline/requestline.service';
import { RequestService } from '../request.service';
import { Requestline } from '../../requestline/requestline.class';
import { SystemService } from 'src/app/core/system.service';
import { Request } from '../request.class';

@Component({
  selector: 'app-request-lines',
  templateUrl: './request-lines.component.html',
  styleUrls: ['./request-lines.component.css']
})
export class RequestLinesComponent implements OnInit {

  request!: Request;

  constructor(
    private reqsvc: RequestService,
    private route: ActivatedRoute,
    private router: Router,
    private reqlnsvc: RequestlineService,
    private syssvc: SystemService,
  ) { }

  review(): void {
    this.reqsvc.review(this.request).subscribe({
      next: (res) => {
        console.debug("Request reviewed");
        this.refresh();
      },
      error: (err) => console.error(err)
    });
  }
  edit(rl: Requestline): void {
    this.router.navigateByUrl(`/requestlines/edit/${rl.id}`)
  }
  remove(rl: Requestline): void {
    this.reqlnsvc.remove(rl.id).subscribe({
      next: (res) => {
        console.debug("Requestline removed");
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


