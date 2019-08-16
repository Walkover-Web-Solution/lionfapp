export const Configuration = {
  AppUrl : 'http://localhost:4200/',
  ApiUrl : 'http://apitest.giddh.com/',
  isElectron: false,
  // tslint:disable-next-line:max-line-length
  OtpToken: '73k6G_GDzvhy4XE33EQCaKUnC0PHwEZBvf0qsZ3Q9S3ZBcXH-f_6JT_4fH-Qx1Y5LxIIwzqy7cFQVMoyUSXBfLL5WBX6oQWifweWIQlJQ8YkRZ1lAmu3oqwvNJXP1Y5ZTXDHO1IV5-Q63zwNbzxTFw==',
  APP_FOLDER: 'app'
};

export const APP_DEFAULT_TITLE = 'Giddh -';

export const DEFAULT_TOASTER_OPTIONS = {
  closeButton: true, // show close button
  timeOut: 3000, // time to live
  enableHtml: false, // allow html in message. (UNSAFE)
  extendedTimeOut: 1000, // time to close after a user hovers over toast
  progressBar: true, // show progress bar
  toastClass: 'toast', // class on toast
  positionClass: 'toast-top-right', // class on toast
  titleClass: 'toast-title', // class inside toast on title
  messageClass: 'toast-message', // class inside toast on message
  tapToDismiss: true, // close on click
  onActivateTick: false
};

export const DEFAULT_SERVER_ERROR_MSG = 'Something went wrong! Please try again.';
export let IS_ELECTRON_WA = false; // isElectron;
export let APP_URL_WA = 'http://localhost:4200/'; // AppUrl;
export let APP_FOLDER_WA = 'app'; // APP_FOLDER;
