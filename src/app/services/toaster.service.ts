import { Injectable } from '@angular/core';
import { APP_DEFAULT_TITLE, DEFAULT_TOASTER_OPTIONS } from '../app.constant';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ToasterService {

  constructor(private toaster: ToastrService) {

  }

  public successToast(msg: string, title: string = APP_DEFAULT_TITLE): void {
    this.toaster.success(msg, title, Object.assign({}, DEFAULT_TOASTER_OPTIONS));
  }

  public errorToast(msg: string, title: string = APP_DEFAULT_TITLE): void {
    this.toaster.error(msg, title, Object.assign({}, DEFAULT_TOASTER_OPTIONS));
  }

  public warningToast(msg: string, title: string = APP_DEFAULT_TITLE): void {
    this.toaster.warning(msg, title, Object.assign({}, DEFAULT_TOASTER_OPTIONS));
  }

  public infoToast(msg: string, title: string = APP_DEFAULT_TITLE): void {
    this.toaster.info(msg, title, Object.assign({}, DEFAULT_TOASTER_OPTIONS));
  }

  public clearAllToaster(): void {
    this.toaster.clear();
  }
}
