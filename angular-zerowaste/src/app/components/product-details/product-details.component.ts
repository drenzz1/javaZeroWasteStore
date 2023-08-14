import {Component, OnInit} from '@angular/core';
import {Product} from "../../common/product";
import {ProductService} from "../../service/product.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{
  product!:Product;
  constructor(private productService:ProductService,
              private route : ActivatedRoute) {
  }
  ngOnInit() {
    this.route.paramMap.subscribe(()=>{
      this.handleProductDetails();
    })
  }

  private handleProductDetails() {
    const theProductId: number=+this.route.snapshot.paramMap.get('id')!;
    this.productService.getProduct(theProductId).subscribe(
      data=>{
        this.product = data;
      }
    )
  }
}
