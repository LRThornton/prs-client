import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestlineService } from '../requestline.service';
import { Requestline } from '../requestline.class';
import { SystemService } from 'src/app/core/system.service';
import { ProductService } from 'src/app/product/product.service';
import { Product } from 'src/app/product/product.class';

@Component({
  selector: 'app-requestline-create',
  templateUrl: './requestline-create.component.html',
  styleUrls: ['./requestline-create.component.css']
})

export class RequestlineCreateComponent implements OnInit {
 
  requestline: Requestline = new Requestline();
  products!: Product[];
  pageTitle: string = "Create Requestline";

  constructor(

  private reqlnsvc: RequestlineService,
  private router: Router,
  private sys: SystemService,
  private prodsvc: ProductService,
  private route: ActivatedRoute
  ) { }

  save(): void {
    this.reqlnsvc.create(this.requestline).subscribe({
      next: (res) => {
        console.debug("Requestline added.");
        this.router.navigateByUrl("/requests/lines/${this.requestline.requestId}");
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  ngOnInit(): void {
    this.requestline.requestId = +this.route.snapshot.params["rid"];
    this.prodsvc.list().subscribe({
      next: (res) => {
        console.debug("Products:", res);
        this.products = res;
      },
      error: (err) => console.error(err)
    });
  }
}  