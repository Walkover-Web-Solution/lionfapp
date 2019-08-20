//init app with modules dependent
angular
	.module("giddhWebsite", [
		"ngVidBg",
		"fullPage.js", 
		"vcRecaptcha",
		"satellizer",
		"LocalStorageModule",
		"ui.bootstrap",
		"toastr"
	])
	.directive('validNumber', ValidNumber)
	.config(config)
	.run(runBlock);

// "ui.bootstrap", "LocalStorageModule", "toastr", "satellizer"
//directives
function ValidNumber() {

	function isNullOrEmptyOrUndefined(value) {
    return !value
  }

	return {
	  require: '?ngModel',
	  link: function(scope, element, attrs, ngModelCtrl) {
	    if (!ngModelCtrl) {
	      return;
	    }
	    ngModelCtrl.$parsers.push(function(val) {
	      var clean, decimalCheck;
	      if (angular.isUndefined(val)) {
	        val = '';
	      }
	      if (isNullOrEmptyOrUndefined(val)) {
	        val = '';
	      }
	      clean = val.replace(/[^0-9\.]/g, '');
	      decimalCheck = clean.split('.');
	      if (!angular.isUndefined(decimalCheck[1])) {
	        decimalCheck[1] = decimalCheck[1].slice(0, 2);
	        clean = decimalCheck[0] + '.' + decimalCheck[1];
	      }
	      if (val !== clean) {
	        ngModelCtrl.$setViewValue(clean);
	        ngModelCtrl.$render();
	      }
	      return clean;
	    });
	    element.on('keypress', function(event) {
	      if (event.keyCode === 32) {
	        event.preventDefault();
	      }
	    });
	  }
	};
}


//config
config.$inject = ['vcRecaptchaServiceProvider', '$httpProvider', '$authProvider', 'localStorageServiceProvider'];
function config(vcRecaptchaServiceProvider, $httpProvider, $authProvider, localStorageServiceProvider) {

	$httpProvider.defaults.withCredentials = true;

	delete $httpProvider.defaults.headers.common["X-Requested-With"];

	vcRecaptchaServiceProvider.setDefaults({
    	key: '6LcgBiATAAAAAMhNd_HyerpTvCHXtHG6BG-rtcmi'
  	});

  	$authProvider.google({
        clientId: '641015054140-3cl9c3kh18vctdjlrt9c8v0vs85dorv2.apps.googleusercontent.com',
        url: 'https://app.giddh.com/app/auth/google'
      });
      $authProvider.twitter({
        clientId: 'w64afk3ZflEsdFxd6jyB9wt5j',
        url: 'https://app.giddh.com/app/auth/twitter'
      });
      $authProvider.linkedin({
        clientId: '75urm0g3386r26',
        url: 'https://app.giddh.com/app/auth/linkedin'
      });
      $authProvider.linkedin({
        url: 'https://app.giddh.com/app/auth/linkedin',
        authorizationEndpoint: 'https://www.linkedin.com/uas/oauth2/authorization',
        redirectUri: window.location.origin + "/login/",
        requiredUrlParams: ['state'],
        scope: ['r_emailaddress'],
        scopeDelimiter: ' ',
        state: 'STATE',
        type: '2.0',
        popupOptions: {
          width: 527,
          height: 582
        }
      });
    $authProvider.httpInterceptor = false;
    localStorageServiceProvider.setPrefix('giddh');
}

//run block
runBlock.$inject = ['$rootScope', '$window'];
function runBlock($rootScope, $window) {
  $rootScope.magicLinkPage = false;
  $rootScope.whiteLinks = false;
  $rootScope.loginPage = false;
  $rootScope.signupPage = false;
  $rootScope.fixedHeader = false;
  $rootScope.showBlack = false;
  $rootScope.isNavCollapsed = true;
  

function isIE() {
    var is_ie, ua;
    ua = navigator.userAgent;
    /* MSIE used to detect old browsers and Trident used to newer ones */
    is_ie = ua.indexOf('MSIE ') > -1 || ua.indexOf('Trident/') > -1;
    return is_ie;
  };
  $rootScope.browserIE = false;
  if (isIE()) {
    $rootScope.browserIE = true;
    return window.location.pathname = '/IE';
  }

  loc = window.location.pathname;
  if (loc === "/index" || loc === "/") {
    $rootScope.whiteLinks = true;
  }
  if (loc === "security.php") {
    $rootScope.whiteLinks = true;
  }

  $rootScope.goTo = function (page) {
  	// if(type == "state") {window.location = state}else {window.open(state)}
  }

  $rootScope.toggleNavbar = function (){
    $rootScope.isNavCollapsed = !$rootScope.isNavCollapsed;
    if (!$rootScope.isNavCollapsed){
      $rootScope.whiteLinks = false;
    }else{
      $rootScope.whiteLinks = true;
    }
    
  }


}


/*
  "ui.bootstrap"
  "LocalStorageModule"
  "toastr"
	"satellizer"
  "ngResource"
  "razor-pay"
  "ngFileSaver"
*/
