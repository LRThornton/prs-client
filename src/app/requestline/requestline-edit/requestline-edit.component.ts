import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestlineService } from '../requestline.service';
import { Requestline } from '../requestline.class';
import { Product } from 'src/app/product/product.class';
import { SystemService } from 'src/app/core/system.service';
import { ProductService } from 'src/app/product/product.service';

@Component({
  selector: 'app-requestline-edit',
  templateUrl: './requestline-edit.component.html',
  styleUrls: ['./requestline-edit.component.css']
})
export class RequestlineEditComponent implements OnInit {

  requestline!: Requestline;
  products!: Product[];
  
  

  constructor(

    private syssvc: SystemService,
    private reqlnsvc: RequestlineService,
    private route: ActivatedRoute,
    private router: Router,
    private prodsvc: ProductService
  ) { }

  save(): void {
    this.requestline.productId = +this.requestline.productId;
    this.reqlnsvc.change(this.requestline).subscribe({
      next: (res) => {
        console.debug("Requestline added");
        this.router.navigateByUrl(`/request/lines/${this.requestline.requestId}`);
      },
      error: (err) => console.error(err)
    });
  }

  ngOnInit(): void {
    this.prodsvc.list().subscribe({
      next: (res) => {
       console.debug("Products:", res);
        this.products = res;
      },
      error: (err) => console.error(err)
    });
    let id = +this.route.snapshot.params["id"];
    this.reqlnsvc.get(id).subscribe({
      next: (res) => {
        console.debug("Requestline:", res);
        this.requestline = res;
      },
      error: (err) => console.error(err)
    });
  }

}