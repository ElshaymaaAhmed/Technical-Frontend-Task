import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { PickupPoint } from 'src/app/classes/pickupPoint';

@Component({
  selector: 'app-pickup-points',
  templateUrl: './pickup-points.component.html',
  styleUrls: ['./pickup-points.component.css']
})
export class PickupPointsComponent {

  CitiesList:string[] = [
    'ALEX' , 'ASWAN' , 'ASSIUT' , 'CAIRO' , 'SOHAG' , 'LUXOR'
  ]
  ComodationsList:string[] = [
    'PRODUCT' , 'PRODUCT' , 'PRODUCT' , 'PRODUCT' , 'PRODUCT'
  ]

  pickupPointObj:PickupPoint = {
    shipperName: '',
    shipperPhone: '',
    city: '',
    street: '',
    pickupDate: undefined,
    commodities: undefined
  };

  shipmentCreated:boolean = false;
  PickupPointForm: FormGroup;

  constructor(
    private fb:FormBuilder,
    public translate:TranslateService
    )
    {

    this.PickupPointForm = this.fb.group({

      shipperName:['',[Validators.required,Validators.minLength(3),Validators.maxLength(30)]],
      shipperPhone:['',[Validators.required]],
      pickupDate:['',[Validators.required]],
      commodities:['',[Validators.required]],
      pickupAddress:this.fb.group({
        street:['',[Validators.required,Validators.maxLength(50)]],
        city:['',[Validators.required]]
      })
    });

    this.PickupPointForm.get('shipperName')?.valueChanges.subscribe((data) => {
      this.pickupPointObj.shipperName = data;
    });   
    this.PickupPointForm.get('shipperPhone')?.valueChanges.subscribe((data) => {
      this.pickupPointObj.shipperPhone = data;
    });
    this.PickupPointForm.get('pickupDate')?.valueChanges.subscribe((data) => {
      this.pickupPointObj.pickupDate = data;
    });
    this.PickupPointForm.get('commodities')?.valueChanges.subscribe((data) => {
      this.pickupPointObj.commodities = data;
    });
    this.PickupPointForm.controls['pickupAddress'].get('street')?.valueChanges.subscribe((data) => {
      this.pickupPointObj.street = data;
    });
    this.PickupPointForm.controls['pickupAddress'].get('city')?.valueChanges.subscribe((data) => {
      this.pickupPointObj.city = data;
    });
  }

  get shipperName()
  {
    return this.PickupPointForm.get('shipperName');
  }
  get shipperPhone()
  {
    return this.PickupPointForm.get('shipperPhone');
  }
  get pickupDate()
  {
    return this.PickupPointForm.get('pickupDate');
  }
  get commodities()
  {
    return this.PickupPointForm.get('commodities');
  }
  get street()
  {
    return this.PickupPointForm.controls['pickupAddress'].get('street');
  }
  get city()
  {
    return this.PickupPointForm.controls['pickupAddress'].get('city');
  }

  OnSubmit(){
    this.shipmentCreated = !this.shipmentCreated;
    console.log(this.pickupPointObj);
    
  }
  Cancel() : void { 
    if(window.confirm('Are you sure, you want to cancel, you are about to lose the new data?'))
    {
      this.PickupPointForm.reset();
    }
  }
}
