import { Component, OnInit } from '@angular/core';
import { AuthService } from 'ng2-ui-auth';

@Component({
  selector: 'social-login-callback',
  template: `
    in social callback
  `
})
export class SocialLoginCallbackComponent implements OnInit {
  constructor() {
    //
  }

  public ngOnInit() {
    // console.log(this.auth.getPayload());
  }

}
