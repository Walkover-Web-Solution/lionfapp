(function() {
  'use strict';
  
  function LoginController($scope, $rootScope, $http, $timeout, $window, $document, $location, $auth, localStorageService,$uibModal,toastr) {
    var getOtpFailure, getOtpSuccess, loginUser, loginUserFailure, loginUserSuccess, loginWithTwoWayAuthentication, verifyEmailFailure, verifyEmailSuccess, verifyOtpFailure, verifyOtpSuccess;
    $scope.showLoginBox = false;
    $scope.toggleLoginBox = function(e) {
      e.stopPropagation();
      $scope.showLoginBox = !$scope.showLoginBox;
    };


    $scope.loginIsProcessing = false;
    $scope.captchaKey = '6LcgBiATAAAAAMhNd_HyerpTvCHXtHG6BG-rtcmi';
    $scope.phoneLoginPopup = false;
    $scope.showOtp = false;
    $scope.contact = {};
    $scope.countryCode = 91;
    $rootScope.homePage = false;
    $scope.loginBtnTxt = "Get OTP";
    $scope.loggingIn = false;
    $scope.twoWayVfyCode = null;
    
    $scope.TwoWayLogin = function(code) {
      var url;
      this.success = function(res) {
        localStorageService.set("_userDetails", res.data.body.user);
        $window.sessionStorage.setItem("_ak", res.data.body.authKey);
        return window.location = "https://app.giddh.com";
      };
      this.failure = function(res) {
        return toastr.error(res.data.message, "Error");
      };
      $scope.twoWayUserData.oneTimePassword = code;
      url = 'https://app.giddh.com/app/api/verify-number';
      return $http.post(url, $scope.twoWayUserData).then(this.success, this.failure);
    };
    loginWithTwoWayAuthentication = function(res) {
      var modalInstance;
      $scope.twoWayUserData = {};
      $scope.twoWayUserData.countryCode = res.countryCode;
      $scope.twoWayUserData.mobileNumber = res.contactNumber;
      return modalInstance = $uibModal.open({
        templateUrl: 'twoWayAuthSignIn.html',
        size: "md",
        backdrop: 'static',
        scope: $scope
      });
    };
    $scope.authenticate = function(provider) {
      $scope.loginIsProcessing = true;
      return $auth.authenticate(provider).then(function(response) {
        if (response.data.result.status === "error") {
          toastr.error(response.data.result.message, "Error");
          return $timeout((function() {
            return window.location = "/index";
          }), 3000);
        } else {
          if (response.data.result.body.authKey) {
            localStorageService.set("_userDetails", response.data.userDetails);
            $window.sessionStorage.setItem("_ak", response.data.result.body.authKey);
            return window.location = "https://app.giddh.com?sId=" + response.data.result.body.sId;
          } else {
            return loginWithTwoWayAuthentication(response.data.result.body);
          }
        }
      })["catch"](function(response) {
        $scope.loginIsProcessing = false;
        if (response.data.result.status === "error") {
          toastr.error(response.data.result.message, "Error");
          return $timeout((function() {
            return window.location = "/index";
          }), 3000);
        } else if (response.status === 502) {
          return toastr.error("Something went wrong please reload page", "Error");
        } else {
          return toastr.error("Something went wrong please reload page", "Error");
        }
      });
    };
    $scope.loginWithMobile = function(e) {
      $scope.phoneLoginPopup = true;
      return e.stopPropagation();
    };
    $scope.signUpWithEmailModal = function(e) {
      var modalInstance;
      modalInstance = $uibModal.open({
        templateUrl: 'signUpEmail.html',
        size: "md",
        backdrop: 'static',
        scope: $scope
      });
      return e.stopPropagation();
    };
    $scope.verifyMail = false;
    $scope.emailToVerify = "";
    $scope.verifyMailMakeFalse = function() {
      return $scope.verifyMail = false;
    };
    getOtpSuccess = function(res) {
      return $scope.showOtp = true;
    };
    getOtpFailure = function(res) {
      return toastr.error(res.data.response.code);
    };
    $scope.cancelOtpView = function(e){
      $scope.phoneLoginPopup = false;
      return e.stopPropagation();
    };
    $scope.getOtp = function() {
      $scope.contact.countryCode = $scope.countryCode;
      if ($scope.contact.mobileNumber !== void 0) {
        $http.post('https://app.giddh.com/app/api/get-login-otp', $scope.contact).then(getOtpSuccess, getOtpFailure);
      } else {
        toastr.error("mobile number cannot be blank");
      }
      return $scope.loginBtnTxt = "Resend";
    };
    
    loginUserSuccess = function(res) {
      localStorageService.set("_userDetails", res.data.body.user);
      $window.sessionStorage.setItem("_ak", res.data.body.authKey);
      window.location = "https://app.giddh.com";
    };
    
    loginUserFailure = function(res) {
      toastr.error(res.data.message);
      return $scope.loggingIn = false;
    };
    
    loginUser = function(token) {
      var data;
      data = {
        countryCode: $scope.contact.countryCode,
        mobileNumber: $scope.contact.mobileNumber,
        token: token
      };
      return $http.post('https://app.giddh.com/app/api/login-with-number', data).then(loginUserSuccess, loginUserFailure);
    };
    verifyOtpSuccess = function(res) {
      var refreshToken;
      refreshToken = res.data.response.refreshToken;
      return loginUser(refreshToken);
    };
    verifyOtpFailure = function(res) {
      toastr.error(res.data.response.code);
      return $scope.loggingIn = false;
    };
    $scope.verifyOtp = function(otp) {
      var contact;
      contact = $scope.contact;
      contact.oneTimePassword = otp;
      $http.post('https://app.giddh.com/app/api/verify-login-otp', contact).then(verifyOtpSuccess, verifyOtpFailure);
      return $scope.loggingIn = true;
    };
    $scope.signUpWithEmail = function(emailId, resend) {
      var dataToSend;
      dataToSend = {
        email: emailId
      };
      return $http.post('https://app.giddh.com/app/api/signup-with-email', dataToSend).then(function(res) {
        $scope.verifyMail = true;
        $scope.emailToVerify = emailId;
        if (resend) {
          return toastr.success(res.data.body);
        }
      }, function(res) {
        $scope.verifyMail = false;
        return toastr.error(res.data.message);
      });
    };
    $scope.verifyEmail = function(emailId, code) {
      var dataToSend;
      dataToSend = {
        email: $scope.emailToVerify,
        verificationCode: code
      };
      return $http.post('https://app.giddh.com/app/api/verify-email-now', dataToSend).then(verifyEmailSuccess, verifyEmailFailure);
    };
    verifyEmailSuccess = function(res) {
      $scope.verifyEmail = false;
      localStorageService.set("_userDetails", res.data.body.user);
      $window.sessionStorage.setItem("_ak", res.data.body.authKey);
      return window.location = "https://app.giddh.com";
    };
    return verifyEmailFailure = function(res) {
      toastr.error(res.data.message);
      return $scope.verifyMail = true;
    };

    $scope.notifyMe = function(){
      console.log('bingo')
    };
  };

  angular.module('giddhWebsite').controller('loginController', LoginController);

}).call(this);
