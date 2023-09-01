import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ZerowasteFormService} from "../../service/zerowaste-form.service";
import {Country} from "../../common/country";
import {State} from "../../common/state";
import {ZeroWasteValidators} from "../../validators/zero-waste-validators";
import {CartService} from "../../service/cart.service";
import {CheckoutService} from "../../service/checkout.service";
import {Router} from "@angular/router";
import {Order} from "../../common/order";
import {OrderItem} from "../../common/order-item";
import {Purchase} from "../../common/purchase";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{

  checkoutFormGroup:FormGroup;

  totalPrice:number=0;
  totalQuantity:number=0;

  creditCardYears:number[]=[];
  creditCardMonths:number[]=[];

  countries:Country[]=[];

  shippingAddressStates:State[]=[];
  billingAddressStates:State[]=[];



  // qita posht chat gpt se kshtu se di pse me bo qashtu

  constructor(private formBuilder: FormBuilder,private zeroWasteService:ZerowasteFormService,private cartService:CartService,private checkoutService:CheckoutService,private router:Router) {
    this.checkoutFormGroup = this.formBuilder.group({
      customer:this.formBuilder.group({
        firstName:new FormControl('',[Validators.required,Validators.minLength(2),ZeroWasteValidators.notOnlyWhitespace]),
        lastName:new FormControl('',[Validators.required,Validators.minLength(2),ZeroWasteValidators.notOnlyWhitespace]),
        email:new FormControl('',[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),ZeroWasteValidators.notOnlyWhitespace])
      }),
      shippingAddress:this.formBuilder.group({
        country:new FormControl('',[Validators.required]),
        street:new FormControl('',[Validators.required,Validators.minLength(2),ZeroWasteValidators.notOnlyWhitespace]),
        city:new FormControl('',[Validators.required,Validators.minLength(2),ZeroWasteValidators.notOnlyWhitespace]),
        state:new FormControl('',[Validators.required]),
        zipCode:new FormControl('',[Validators.required,Validators.minLength(2),ZeroWasteValidators.notOnlyWhitespace])

      }),
      billingAddress:this.formBuilder.group({
        country:new FormControl('',[Validators.required]),
        street:new FormControl('',[Validators.required,Validators.minLength(2),ZeroWasteValidators.notOnlyWhitespace]),
        city:new FormControl('',[Validators.required,Validators.minLength(2),ZeroWasteValidators.notOnlyWhitespace]),
        state:new FormControl('',[Validators.required]),
        zipCode:new FormControl('',[Validators.required,Validators.minLength(2),ZeroWasteValidators.notOnlyWhitespace])

      }),
      creditCard:this.formBuilder.group({
        cartType: new FormControl('',[Validators.required]),
        cardNumber: new FormControl('',[Validators.required,Validators.pattern('[0-9]{16}')]),
        securityCode: new FormControl('',[Validators.required,Validators.pattern('[0-9]{3}')]),
        expirationMonth:[''],
        expirationYear:['']
      })
    });
  }

  ngOnInit():void {

    this.reviewCartDetails();

    this.checkoutFormGroup=this.formBuilder.group({
      customer:this.formBuilder.group({
        firstName:new FormControl('',[Validators.required,Validators.minLength(2),ZeroWasteValidators.notOnlyWhitespace]),
        lastName:new FormControl('',[Validators.required,Validators.minLength(2),ZeroWasteValidators.notOnlyWhitespace]),
        email:new FormControl('',[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),ZeroWasteValidators.notOnlyWhitespace])
      }),
      shippingAddress:this.formBuilder.group({
        country:new FormControl('',[Validators.required]),
        street:new FormControl('',[Validators.required,Validators.minLength(2),ZeroWasteValidators.notOnlyWhitespace]),
        city:new FormControl('',[Validators.required,Validators.minLength(2),ZeroWasteValidators.notOnlyWhitespace]),
        state:new FormControl('',[Validators.required]),
        zipCode:new FormControl('',[Validators.required,Validators.minLength(2),ZeroWasteValidators.notOnlyWhitespace])

      }),
      billingAddress:this.formBuilder.group({
        country:new FormControl('',[Validators.required]),
        street:new FormControl('',[Validators.required,Validators.minLength(2),ZeroWasteValidators.notOnlyWhitespace]),
        city:new FormControl('',[Validators.required,Validators.minLength(2),ZeroWasteValidators.notOnlyWhitespace]),
        state:new FormControl('',[Validators.required]),
        zipCode:new FormControl('',[Validators.required,Validators.minLength(2),ZeroWasteValidators.notOnlyWhitespace])

      }),
      creditCard:this.formBuilder.group({
        cartType: new FormControl('',[Validators.required]),
        cardNumber: new FormControl('',[Validators.required,Validators.pattern('[0-9]{16}')]),
        securityCode: new FormControl('',[Validators.required,Validators.pattern('[0-9]{3}')]),
        expirationMonth:[''],
        expirationYear:['']
      })
    });

    const startMonth:number = new Date().getMonth()+1;
    console.log("StartMonth: " + startMonth);

    this.zeroWasteService.getCreditCardMonths(startMonth).subscribe(
      data=>{
        console.log("Retrieved credit card month" + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    );

    this.zeroWasteService.getCreditCardYears().subscribe(
      data=>{
        console.log("Retrived credit card years: "+ JSON.stringify(data));
        this.creditCardYears=data;
      }
    );

    this.zeroWasteService.getCountries().subscribe(
      data=>{
        console.log("Retrieved countries: "+JSON.stringify(data));
        this.countries=data;
      }
    )
  }
  onSubmit() {
    console.log("Handling the submit button");



    if (!this.checkoutFormGroup.valid) {
     this.checkoutFormGroup.markAllAsTouched();
      return;
    }


    // set up order
    let order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;

    // get cart items
    const cartItems = this.cartService.cartItems;

    // create orderItems from cartItems
    // - long way
    /*
    let orderItems: OrderItem[] = [];
    for (let i=0; i < cartItems.length; i++) {
      orderItems[i] = new OrderItem(cartItems[i]);
    }
    */

    // - short way of doing the same thingy
    let orderItems: OrderItem[] = cartItems.map(tempCartItem => new OrderItem(tempCartItem));

    // set up purchase
    let purchase = new Purchase();

    // populate purchase - customer
    purchase.customer = this.checkoutFormGroup.controls['customer'].value;

    // populate purchase - shipping address
    purchase.shippingAddress = this.checkoutFormGroup.controls['shippingAddress'].value;
    const shippingState: State = JSON.parse(JSON.stringify(purchase.shippingAddress.state));
    const shippingCountry: Country = JSON.parse(JSON.stringify(purchase.shippingAddress.country));
    purchase.shippingAddress.state = shippingState.name;
    purchase.shippingAddress.country = shippingCountry.name;

    // populate purchase - billing address
    purchase.billingAddress = this.checkoutFormGroup.controls['billingAddress'].value;
    const billingState: State = JSON.parse(JSON.stringify(purchase.billingAddress.state));
    const billingCountry: Country = JSON.parse(JSON.stringify(purchase.billingAddress.country));
    purchase.billingAddress.state = billingState.name;
    purchase.billingAddress.country = billingCountry.name;

    // populate purchase - order and orderItems
    purchase.order = order;
    purchase.orderItems = orderItems;

    // call REST API via the CheckoutService
    this.checkoutService.placeOrder(purchase).subscribe({
        next: response => {
          alert(`Your order has been received.\nOrder tracking number: ${response.orderTrackingNumber}`);

          // reset cart
          this.resetCart();

        },
        error: err => {
          alert(`There was an error: ${err.message}`);
        }
      }
    );

  }

  copyShippingAddresToBillingAddres({event}: { event: any }) {
    if ((event.target as HTMLInputElement).checked) {
      const shippingAddressValue = this.checkoutFormGroup.controls['shippingAddress'].value;
      this.checkoutFormGroup.controls['billingAddress'].setValue(shippingAddressValue);
    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
    }


  }
  get firstName(){
    return this.checkoutFormGroup.get('customer.firstName');
  }
  get lastName(){
    return this.checkoutFormGroup.get('customer.lastName');
  }
  get email(){
    return this.checkoutFormGroup.get('customer.email');
  }

  get shippingAddressStreet(){
    return this.checkoutFormGroup.get('shippingAddress.street');
  }
  get shippingAddressCity(){
    return this.checkoutFormGroup.get('shippingAddress.city');
  }
  get shippingAddressState(){
    return this.checkoutFormGroup.get('shippingAddress.state');
  }
  get shippingAddressZipCode(){
    return this.checkoutFormGroup.get('shippingAddress.zipCode');
  }
  get shippingAddressCountry(){
    return this.checkoutFormGroup.get('shippingAddress.country');
  }
  get billingAddressStreet(){
    return this.checkoutFormGroup.get('billingAddress.street');
  }
  get billingAddressCity(){
    return this.checkoutFormGroup.get('billingAddress.city');
  }
  get billingAddressState(){
    return this.checkoutFormGroup.get('billingAddress.state');
  }
  get billingAddressZipCode(){
    return this.checkoutFormGroup.get('billingAddress.zipCode');
  }
  get billingAddressCountry(){
    return this.checkoutFormGroup.get('billingAddress.country');
  }
  get creditCardType(){
    return this.checkoutFormGroup.get('creditCard.cardType');
  }
  get creditCardNumber(){
    return this.checkoutFormGroup.get('creditCard.cardNumber');
  }
  get creditCardSecurityCode(){
    return this.checkoutFormGroup.get('creditCard.securityCode');
  }
  get creditCardExpirationMonth(){
    return this.checkoutFormGroup.get('creditCard.expirationMonth')
  }
  get creditCardExpirationYear(){
    return this.checkoutFormGroup.get('creditCard.expirationYear')
  }


  handleMonthsAndYears(){
    const creditCardFormGroup=this.checkoutFormGroup.get('creditCard');

    const currentYear :number=new Date().getFullYear();
    const selectedYear:number=Number(creditCardFormGroup?.value.expirationYear);

    let startMonth:number;
    if(currentYear===selectedYear){
      startMonth=new Date().getMonth()+1;
    }else{
      startMonth=1;
    }
    this.zeroWasteService.getCreditCardMonths(startMonth).subscribe(
      data=>{
        console.log("Retrived credit card months : "+JSON.stringify(data));
        this.creditCardMonths=data;
      }
    );
    this.zeroWasteService.getCreditCardYears().subscribe(
      data=>{
        console.log("Retrived credit card years: "+ JSON.stringify(data));
        this.creditCardYears=data;
      }
    );
    this.zeroWasteService.getCountries().subscribe(
      data=>{
        console.log("Retrieved countries: "+JSON.stringify(data));
        this.countries=data;
      }
    )
  }
  getStates(formGroupName: string) {
    const formGroup = this.checkoutFormGroup.get(formGroupName);

    if (!formGroup) {
      console.error(`Form group "${formGroupName}" not found.`);
      return;
    }

    const countryCode = formGroup.value.country.code;
    const countryName = formGroup.value.country.name;

    console.log(`${formGroupName} country code: ${countryCode}`);
    console.log(`${formGroupName} country name: ${countryName}`);

    this.zeroWasteService.getStates(countryCode).subscribe(
      data =>{
        if (formGroupName ==='shippingAddress'){
            this.shippingAddressStates=data;
        }
        else {
          this.billingAddressStates=data;
        }
        formGroup.get('state')?.setValue(data);
      }
    );
  }


   reviewCartDetails() {
    this.cartService.totalQuantity.subscribe(
      totalQuantity=>this.totalQuantity = totalQuantity
    );
    this.cartService.totalPrice.subscribe(
      totalPrice=>this.totalPrice=totalPrice
    );
  }

  resetCart() {
    this.cartService.cartItems=[];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);

    this.checkoutFormGroup.reset();

    this.router.navigateByUrl("/products")
  }
}
