import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-licence-key',
  templateUrl: './licence-key.component.html',
  styleUrls: ['./licence-key.component.scss']
})
export class licenceKeyComponent implements OnInit {


  items = [
    {SubOn: '19/08/2019', SubID: 123, UserName: 'Sheba Khan', Plan: 'Plan2', NoOfCompany: 10/100, Balance: 1000, TranactionLimit:10000, LicenceKey: 'XYZ123ABC', Status: 'Active/Expired,', Expiry: '19/19/2019',  TotalAmount: 4000 },
    {SubOn: '19/08/2019', SubID: 123, UserName: 'Sheba Khan', Plan: 'Plan2', NoOfCompany: 10/100, Balance: 1000, TranactionLimit:10000, LicenceKey: 'XYZ123ABC', Status: 'Active/Expired,', Expiry: '19/19/2019',  TotalAmount: 4000 },
    {SubOn: '19/08/2019', SubID: 123, UserName: 'Sheba Khan', Plan: 'Plan2', NoOfCompany: 10/100, Balance: 1000, TranactionLimit:10000, LicenceKey: 'XYZ123ABC', Status: 'Active/Expired,', Expiry: '19/19/2019',  TotalAmount: 4000 },
    {SubOn: '19/08/2019', SubID: 123, UserName: 'Sheba Khan', Plan: 'Plan2', NoOfCompany: 10/100, Balance: 1000, TranactionLimit:10000, LicenceKey: 'XYZ123ABC', Status: 'Active/Expired,', Expiry: '19/19/2019',  TotalAmount: 4000 },
    {SubOn: '19/08/2019', SubID: 123, UserName: 'Sheba Khan', Plan: 'Plan2', NoOfCompany: 10/100, Balance: 1000, TranactionLimit:10000, LicenceKey: 'XYZ123ABC', Status: 'Active/Expired,', Expiry: '19/19/2019',  TotalAmount: 4000 },
  ]
  
  constructor() { }

  ngOnInit() {
  }

}