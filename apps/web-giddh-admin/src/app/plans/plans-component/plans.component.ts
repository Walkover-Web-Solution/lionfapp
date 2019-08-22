import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit {


  // public rightToggle: boolean = false;
  public togglePanelBool: boolean;
  // RightSlide() {
  //   this.rightToggle = !this.rightToggle;
  // }
  
  plansData = [
    {planName: 'Plan1', creatOn: '05/05/2019', noOfCompany: 100, totalUser: 100, totalAmount: 10000, expiry: 0},
    {planName: 'Plan1', creatOn: '05/05/2019', noOfCompany: 100, totalUser: 100, totalAmount: 10000, expiry: 0},
    {planName: 'Plan1', creatOn: '05/05/2019', noOfCompany: 100, totalUser: 100, totalAmount: 10000, expiry: 0},
    {planName: 'Plan1', creatOn: '05/05/2019', noOfCompany: 100, totalUser: 100, totalAmount: 10000, expiry: 0},
    {planName: 'Plan1', creatOn: '05/05/2019', noOfCompany: 100, totalUser: 100, totalAmount: 10000, expiry: 0},
    {planName: 'Plan1', creatOn: '05/05/2019', noOfCompany: 100, totalUser: 100, totalAmount: 10000, expiry: 0},
    {planName: 'Plan1', creatOn: '05/05/2019', noOfCompany: 100, totalUser: 100, totalAmount: 10000, expiry: 0},
    {planName: 'Plan1', creatOn: '05/05/2019', noOfCompany: 100, totalUser: 100, totalAmount: 10000, expiry: 0},
  ]; 

  ngOnInit() {
  }
  
  public togglePanel () {
    if (this.togglePanelBool) {
      this.togglePanelBool = false;
    } else {
      this.togglePanelBool = true;
    }
  }
}