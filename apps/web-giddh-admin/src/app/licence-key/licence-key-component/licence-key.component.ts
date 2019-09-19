import { Component, OnInit } from '@angular/core';
import { LicenceService } from '../../services/licence.service';
import { CommonPaginatedRequest, SubscriberList } from '../../modules/modules/api-modules/subscription';


@Component({
  selector: 'app-licence-key',
  templateUrl: './licence-key.component.html',
  styleUrls: ['./licence-key.component.scss']
})
export class LicenceKeyComponent implements OnInit {
  public items;
  public getAllLicenceKeyRequest: CommonPaginatedRequest = new CommonPaginatedRequest();
  public LicenceKeyRes: SubscriberList = new SubscriberList();


  constructor(private liecnceService: LicenceService) {

  }

  ngOnInit() {
    this.getAllLicenceKeyRequest.count = 10;
    this.getAllLicenceKeyRequest.page = 1;

    this.getAllLicenceKey();
  }
  public getAllLicenceKey() {
    this.liecnceService.getAllLicence(this.getAllLicenceKeyRequest).subscribe(res => {
      if (res.status === 'success') {
        this.LicenceKeyRes = res.body;
        this.items = res.body.results;
      }
    });
  }
  public generateLicenceKeyRedirect() {
    console.log('logic to redirect');
  }
  public pageChanged(event: any): void {
    this.getAllLicenceKeyRequest.page = event.page;
    this.getAllLicenceKey();

  }
}