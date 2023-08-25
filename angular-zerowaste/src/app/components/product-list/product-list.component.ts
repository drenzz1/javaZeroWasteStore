import {Component, OnInit} from '@angular/core';
import {Product} from "../../common/product";
import {ProductService} from "../../service/product.service";
import {ActivatedRoute} from "@angular/router";
import {CartItem} from "../../common/cart-item";
import {CartService} from "../../service/cart.service";

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

  previousKeyword: string= "";


  constructor(private productService:ProductService,
              private cartService:CartService,
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

    if(this.previousKeyword != theKeyword){
      this.thePageNumber=1;
    }

    this.previousKeyword=theKeyword;
    console.log(`keyword=${theKeyword} , thePageNumber=${this.thePageNumber}`);
    this.productService.searchProductsPaginate(
      this.thePageNumber-1,
      this.thePageSize,
      theKeyword).subscribe(this.processResult());
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
                this.processResult()
    );

  }
  updatePageSize(pageSize:string){
    this.thePageSize=+pageSize;
    this.thePageNumber=1;
    this.listProducts();
  }
  processResult(){
    return(data:any)=>{
      this.products= data._embedded.products;
      this.thePageNumber=data.page.number+1;
      this.thePageSize=data.page.size;
      this.theTotalElements=data.page.totalElements;
    };
  }
  addToCart(theProduct:Product){
    console.log(`Adding to cart : ${theProduct.name}, ${theProduct.unitPrice}`);
    const theCartItem = new CartItem(theProduct);
    this.cartService.addToCart(theCartItem);
  }

}
