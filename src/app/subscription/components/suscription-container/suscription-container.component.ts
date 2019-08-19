import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-suscription-container',
  templateUrl: './suscription-container.component.html',
  styleUrls: ['./suscription-container.component.scss']
})
export class SuscriptionContainerComponent implements OnInit {

  public rightToggle: boolean = false;
  public RightSlide() {
    this.rightToggle = !this.rightToggle;
  }
  
  constructor() { }

  ngOnInit() {
  }

}