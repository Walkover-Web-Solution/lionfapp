import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CompanyResponse, ICurrencyResponse, StateDetailsResponse } from '../models/api-models/Company';
import { Action, Store } from '@ngrx/store';
import { LinkedInRequestModel, SignupwithEmaillModel, SignupWithMobile, UserDetails, VerifyEmailModel, VerifyEmailResponseModel, VerifyMobileModel, VerifyMobileResponseModel } from '../models/api-models/loginModels';
import { ToasterService } from '../services/toaster.service';
import { GeneralActions } from './general/general.actions';
import { CompanyActions } from './company.actions';
import { BaseResponse } from '../models/api-models/BaseResponse';
import { ActivatedRoute, Router } from '@angular/router';
import { sortBy } from '../lodash-optimized';
import { COMMON_ACTIONS } from './common.const';
import { AppState } from '../store';
import { Injectable } from '@angular/core';
import { map, switchMap, take } from 'rxjs/operators';
import { userLoginStateEnum } from '../models/user-login-state';
import { Actions, Effect } from '@ngrx/effects';
import { DbService } from '../services/db.service';
import { CompanyService } from '../services/companyService.service';
import { GeneralService } from '../services/general.service';
import { Observable, ReplaySubject, zip as observableZip } from 'rxjs';
import { CustomActions } from '../store/customActions';
import { LoginWithPassword, SignUpWithPassword } from '../models/api-models/login';
import { AuthenticationService } from '../services/authentication.service';
import { AccountService } from '../services/account.service';
import { Configuration } from '../app.constant';
import { ROUTES } from '../routes-array';

@Injectable()
export class LoginActions {

  public static RESET_SOCIAL_LOGOUT_ATTEMPT = 'RESET_SOCIAL_LOGOUT_ATTEMPT';
  public static SOCIAL_LOGOUT_ATTEMPT = 'SOCIAL_LOGOUT_ATTEMPT';
  public static SIGNUP_WITH_GOOGLE_REQUEST = 'SIGNUP_WITH_GOOGLE_REQUEST';
  public static SIGNUP_WITH_GOOGLE_RESPONSE = 'SIGNUP_WITH_GOOGLE_RESPONSE';

  public static SIGNUP_WITH_LINKEDIN_REQUEST = 'SIGNUP_WITH_LINKEDIN_REQUEST';
  public static SIGNUP_WITH_LINKEDIN_RESPONSE = 'SIGNUP_WITH_LINKEDIN_RESPONSE';

  public static SignupWithEmailRequest = 'SignupWithEmailRequest';
  public static SignupWithEmailResponce = 'SignupWithEmailResponce';
  public static ResetSignupWithEmailState = 'ResetSignupWithEmailState';
  public static SignupWithMobileRequest = 'SignupWithMobileRequest';
  public static SignupWithMobileResponce = 'SignupWithMobileResponce';

  public static ResetSignupWithMobileState = 'ResetSignupWithMobileState';
  public static VerifyEmailRequest = 'VerifyEmailRequest';
  public static VerifyEmailResponce = 'VerifyEmailResponce';

  public static VerifyMobileRequest = 'VerifyMobileRequest';
  public static VerifyMobileResponce = 'VerifyMobileResponce';
  public static VerifyTwoWayAuthRequest = 'VerifyTwoWayAuthRequest';
  public static VerifyTwoWayAuthResponse = 'VerifyTwoWayAuthResponse';
  public static LoginSuccess = 'LoginSuccess';
  public static LogOut = 'LoginOut';
  public static ClearSession = 'ClearSession';
  public static SetLoginStatus = 'SetLoginStatus';
  public static GoogleLoginElectron = 'GoogleLoginElectron';
  public static LinkedInLoginElectron = 'LinkedInLoginElectron';
  public static AddNewMobileNo = 'AddNewMobileNo';
  public static AddNewMobileNoResponse = 'AddNewMobileNoResponse';

  public static VerifyAddNewMobileNo = 'VerifyAddNewMobileNo';
  public static VerifyAddNewMobileNoResponse = 'VerifyAddNewMobileNoResponse';
  public static FetchUserDetails = 'FetchUserDetails';
  public static FetchUserDetailsResponse = 'FetchUserDetailsResponse';

  public static AddBalance = 'AddBalance';
  public static AddBalanceResponse = 'AddBalanceResponse';
  public static ResetTwoWayAuthModal = 'ResetTwoWayAuthModal';
  public static SetCurrencyInStore = 'SetCurrencyInStore';

  public static NEEDS_TO_REDIRECT_TO_LEDGER = 'NEEDS_TO_REDIRECT_TO_LEDGER';
  public static RESET_NEEDS_TO_REDIRECT_TO_LEDGER = 'RESET_NEEDS_TO_REDIRECT_TO_LEDGER';

  public static SignupWithPasswdRequest = 'SignupWithPasswdRequest';
  public static SignupWithPasswdResponse = 'SignupWithPasswdResponse';

  public static LoginWithPasswdRequest = 'LoginWithPasswdRequest';
  public static LoginWithPasswdResponse = 'LoginWithPasswdResponse';

  public static forgotPasswordRequest = 'forgotPasswordRequest';
  public static forgotPasswordResponse = 'forgotPasswordResponse';

  public static resetPasswordRequest = 'resetPasswordRequest';
  public static resetPasswordResponse = 'resetPasswordResponse';

  public static renewSessionRequest = 'renewSessionRequest';
  public static renewSessionResponse = 'renewSessionResponse';
}
