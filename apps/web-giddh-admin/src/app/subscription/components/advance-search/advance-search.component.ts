import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-advance-search',
  templateUrl: './advance-search.component.html',
  styleUrls: ['./advance-search.component.scss']
})
export class AdvanceSearchComponent implements OnInit {
 
  @Input() public rightToggle: boolean = false;
  @Output() public hidePopup: EventEmitter<boolean> = new EventEmitter(true);

  public closePopup() {
    this.hidePopup.emit();
  }

  constructor() { }

  ngOnInit() {
  }

}
