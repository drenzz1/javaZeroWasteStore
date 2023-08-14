import {Component, OnInit} from '@angular/core';
import {Product} from "../../common/product";
import {ProductService} from "../../service/product.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{
  products:Product[]=[];
  currentCategoryId:number=1;
  searchMode:boolean=false;

  constructor(private productService:ProductService,
              private route:ActivatedRoute) {
  }
  ngOnInit() {
    this.route.paramMap.subscribe(
      () => {this.listProducts();
      } );
  }
  listProducts(){
    this.searchMode=this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode){
      this.handleSearchProducts();
    }else{
      this.handlelistProducts();
    }
  }
  handleSearchProducts(){
    const theKeyword : string = this.route.snapshot.paramMap.get('keyword')!;

    this.productService.searchProducts(theKeyword).subscribe(
      data=>{
        this.products=data;
      }
    )
  }
  handlelistProducts(){
    "me kqyr nese id ja osht e lire "
    const hasCategoryId : boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId){
      this.currentCategoryId= +this.route.snapshot.paramMap.get('id')!;
    } else {
      this.currentCategoryId=1;
    }
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data=>{
        this.products=data;
      }
    )

  }
}
