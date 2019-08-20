import { Component, OnInit } from '@angular/core';
import { LicenceService } from '../../services/licence.service';


@Component({
  selector: 'app-licence-key',
  templateUrl: './licence-key.component.html',
  styleUrls: ['./licence-key.component.scss']
})
export class licenceKeyComponent implements OnInit {
  public items;

  constructor(private liecnceService: LicenceService) {
    liecnceService.getAllLicence().subscribe(res => {
      this.items = res.body.results;
    });
  }

  ngOnInit() {
  }
  public generateLicenceKeyRedirect() {
    console.log('logic to redirect');
  }
}