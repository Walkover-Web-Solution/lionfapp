import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-generate-key',
  templateUrl: './generate-key.component.html',
  styleUrls: ['./generate-key.component.css']
})
export class GenerateKeyComponent implements OnInit {

  selectPlans = [
    {plan: 'Plan 1'},
    {plan: 'Plan 2'},
    {plan: 'Plan 3'},
    {plan: 'Plan 4'},
  ]

  constructor() { }

  ngOnInit() {
  }

}