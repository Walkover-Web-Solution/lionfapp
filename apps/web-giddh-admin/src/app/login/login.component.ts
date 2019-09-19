import { Component, OnInit } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store';
import { Router } from '@angular/router';
import { ToasterService } from '../services/toaster.service';
import { AuthService, GoogleLoginProvider } from "../theme/ng-social-login-module/index";
import { takeUntil } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { GeneralService } from '../services/general.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public isLoginWithMobileSubmited$: Observable<boolean>;
  public isLoginWithEmailSubmited$: Observable<boolean>;
  // @ViewChild('forgotPasswordModal') public forgotPasswordModal: ModalDirective;
 
  public isSubmited: boolean = false;
  public isVerifyMobileInProcess$: Observable<boolean>;
  public isLoginWithMobileInProcess$: Observable<boolean>;
  public isVerifyEmailInProcess$: Observable<boolean>;
  public isLoginWithEmailInProcess$: Observable<boolean>;
  public isSocialLogoutAttempted$: Observable<boolean>;
  public isTwoWayAuthInProcess$: Observable<boolean>;
  public isTwoWayAuthInSuccess$: Observable<boolean>;
  public selectedCountry: string;
  public selectedBanner: string = null;
  public loginUsing: string = null;
  public urlPath: string = "";

  public isLoginWithPasswordInProcess$: Observable<boolean>;
  public isForgotPasswordInProgress$: Observable<boolean>;
  public isForgotPasswordInSuccess$: Observable<boolean>;
  public isResetPasswordInSuccess$: Observable<boolean>;

  public isLoginWithPasswordSuccessNotVerified$: Observable<boolean>;

  public showForgotPassword: boolean = false;
  public forgotStep: number = 0;
  public retryCount: number = 0;
  public apkVersion: string;
  private imageURL: string;
  private email: string;
  private name: string;
  private token: string;
  private userUniqueKey: string;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private authService : AuthService,
    private _toaster: ToasterService,
    private authenticationService : AuthenticationService,
    private generalService: GeneralService
) {
  this.authService.authState.pipe(takeUntil(this.destroyed$)).subscribe((user) => {
    if(user){
    this.authenticationService.LoginWithGoogle(user.token).subscribe(res => {
      if(res.status === 'success'){
        let session = res.body.session;
        this.generalService.sessionId = session.id;
        this.generalService.user = res.body.user;
        this.router.navigate(['admin/subscription']);
      }else{
        this._toaster.errorToast(res.message);
      }
    });
  }else{
    this.router.navigate(['login']);
  }
  });
}
  public async signInWithProviders(provider: string) {
      if (provider === "google") {
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
      } 
  }

  ngOnInit() {
  }


}
