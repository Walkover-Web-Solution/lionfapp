import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-create-plans',
  templateUrl: './create-plans.component.html',
  styleUrls: ['./create-plans.component.css']
})
export class CreatePlansComponent implements OnInit {
  @Input() public rightToggle: boolean = false;
  // RightSlide() {
  //   this.rightToggle = !this.rightToggle;
  // }
  constructor() { }

  ngOnInit() {
  }
}