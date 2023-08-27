import {Component, OnInit} from '@angular/core';
import {Form, FormBuilder, FormGroup} from "@angular/forms";
import {ZerowasteFormService} from "../../service/zerowaste-form.service";
import {Country} from "../../common/country";
import {State} from "../../common/state";

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

  constructor(private formBuilder: FormBuilder,private zeroWasteService:ZerowasteFormService) {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      })
    });
  }

  ngOnInit():void {
    this.checkoutFormGroup=this.formBuilder.group({
      customer:this.formBuilder.group({
        firstName:[''],
        lastName:[''],
        email:['']
      }),
      shippingAddress:this.formBuilder.group({
        country:[''],
        street:[''],
        city:[''],
        state:[''],
        zipCode:[''],

      }),
      billingAddress:this.formBuilder.group({
        country:[''],
        street:[''],
        city:[''],
        state:[''],
        zipCode:[''],
      }),
      creditCard:this.formBuilder.group({
        cartType:[''],
        nameOnCard:[''],
        cardNumber:[''],
        securityCode:[''],
        expirationMonth:[''],
        expirationYear:[''],
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
  onSubmit(){
    console.log("Handling the submit button")
    console.log(this.checkoutFormGroup.get('customer')?.value);
    console.log("The email address is " + this.checkoutFormGroup.get('customer')?.value.email);
    console.log("The shipping address country is " + this.checkoutFormGroup.get('shippingAddress')?.value.country.name);
    console.log("The shipping address state  is " + this.checkoutFormGroup.get('shippingAddress')?.value.state.name);
  }

  copyShippingAddresToBillingAddres({event}: { event: any }) {
    if ((event.target as HTMLInputElement).checked) {
      const shippingAddressValue = this.checkoutFormGroup.controls['shippingAddress'].value;
      this.checkoutFormGroup.controls['billingAddress'].setValue(shippingAddressValue);
    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
    }

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


}
