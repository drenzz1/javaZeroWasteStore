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
  previousCategoryId:number=0;
  searchMode:boolean=false;
  //pagination
  thePageNumber:number=1;
  thePageSize:number=5;
  theTotalElements:number=0;


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

    if (this.previousCategoryId!=this.currentCategoryId){
      this.thePageNumber=1;
    }
    this.previousCategoryId=this.currentCategoryId;

    console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`)


    this.productService.getProductListPaginate(
      this.thePageNumber-1,
      this.thePageSize,
      this.currentCategoryId).subscribe(
                  data=>{
                    this.products=data._embedded.products;
                    this.thePageNumber=data.page.number+1;
                    this.thePageSize=data.page.size;
                    this.theTotalElements=data.page.totalElements;
                  }
    );

  }
}
