import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../product.class';
import { ProductService } from '../product.service';
import { VendorService } from 'src/app/vendor/vendor.service';
import { Vendor } from 'src/app/vendor/vendor.class';
import { SystemService } from 'src/app/core/system.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  product: Product = new Product();
  vendors!: Vendor[];

  constructor(
    private sys: SystemService,
    private prodsvc: ProductService,
    private vndsvc: VendorService,
    private router: Router, 
  ) { }

  save(): void {
    this.prodsvc.create(this.product).subscribe({
      next: (res) => {
        console.debug("Product added");
        this.router.navigateByUrl("/product/list");
      },
      error: (err) => console.error(err)
      });
  }

  ngOnInit(): void {
    this.vndsvc.list().subscribe({
      next: (res) => { 
        console.debug("Vendors:", res);
        this.vendors = res;
      },
      error: (err) => console.error(err)
    });
  }
}