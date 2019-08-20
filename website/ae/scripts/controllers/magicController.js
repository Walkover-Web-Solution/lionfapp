(function(){

'use strict';
	function magicCtrl ($scope, toastr, $http, $location, $rootScope, $filter, FileSaver) {
      var ml;
      ml = this;
      $rootScope.magicLinkPage = true;
      $scope.magicReady = false;
      $scope.magicLinkId = window.location.search.split('=');
      $scope.magicLinkId = $scope.magicLinkId[1];
      $scope.ledgerData = [];
      $scope.magicUrl = 'https://app.giddh.com/magic-link';
      $scope.downloadInvoiceUrl = $scope.magicUrl + '/download-invoice';
      $scope.today = new Date();
      $scope.fromDate = {
        date: new Date()
      };
      $scope.toDate = {
        date: new Date()
      };
      $scope.fromDatePickerIsOpen = false;
      $scope.toDatePickerIsOpen = false;
      $scope.dateOptions = {
        'year-format': "'yy'",
        'starting-day': 1,
        'showWeeks': false,
        'show-button-bar': false,
        'year-range': 1,
        'todayBtn': false
      };
      $scope.format = "dd-MM-yyyy";
      $scope.showError = false;
      $scope.accountName = '';
      $scope.isCompoundEntry = false;
      $scope.fromDatePickerOpen = function() {
        return this.fromDatePickerIsOpen = true;
      };
      $scope.toDatePickerOpen = function() {
        return this.toDatePickerIsOpen = true;
      };
      $scope.data = {
        id: $scope.magicLinkId
      };
      $scope.filterLedgers = function(ledgers) {
        return _.each(ledgers, function(lgr) {
          lgr.hasDebit = false;
          lgr.hasCredit = false;
          if (lgr.transactions.length > 0) {
            return _.each(lgr.transactions, function(txn) {
              if (txn.type === 'DEBIT') {
                return lgr.hasDebit = true;
              } else if (txn.type === 'CREDIT') {
                return lgr.hasCredit = true;
              }
            });
          }
        });
      };
      $scope.assignDates = function(fromDate, toDate) {
        var fdArr, from, tdArr, to;
        fdArr = fromDate.split('-');
        tdArr = toDate.split('-');
        from = new Date(fdArr[1] + '/' + fdArr[0] + '/' + fdArr[2]);
        to = new Date(tdArr[1] + '/' + tdArr[0] + '/' + tdArr[2]);
        $scope.fromDate.date = from;
        return $scope.toDate.date = to;
      };
      $scope.getData = function(data, updateDates) {
        var _data;
        $scope.magicReady = false;
        _data = data;
        return $http.post($scope.magicUrl, {
          data: _data
        }).then(function(success) {
          $scope.companyName = success.data.body.companyName.split(" ");
          $scope.companyName = $scope.companyName[0];
          $scope.accountName = success.data.body.account.name;
          $scope.ledgerData = success.data.body.ledgerTransactions;
          $scope.filterLedgers($scope.ledgerData.ledgers);
          $scope.countTotalTransactions();
          $scope.calReckoningTotal();
          $scope.magicReady = true;
          $scope.showError = false;
          if (updateDates) {
            return $scope.assignDates($scope.ledgerData.ledgers[0].entryDate, $scope.ledgerData.ledgers[$scope.ledgerData.ledgers.length - 1].entryDate);
          }
        }, function(error) {
          toastr.error(error.data.message);
          $scope.magicReady = true;
          return $scope.showError = true;
        });
      };
      $scope.downloadInvoice = function(invoiceNumber) {
        var _data;
        this.success = function(res) {
          var blobData;
          blobData = ml.b64toBlob(res.data.body, "application/pdf", 512);
          return FileSaver.saveAs(blobData, invoiceNumber + ".pdf");
        };
        this.failure = function(res) {
          return toastr.error(res.message);
        };
        _data = {
          id: $scope.data.id,
          invoiceNum: invoiceNumber
        };
        return $http.post($scope.downloadInvoiceUrl, {
          data: _data
        }).then(this.success, this.failure);
      };
      $scope.getData($scope.data, true);
      ml.b64toBlob = function(b64Data, contentType, sliceSize) {
        var blob, byteArray, byteArrays, byteCharacters, byteNumbers, i, offset, slice;
        contentType = contentType || '';
        sliceSize = sliceSize || 512;
        byteCharacters = atob(b64Data);
        byteArrays = [];
        offset = 0;
        while (offset < byteCharacters.length) {
          slice = byteCharacters.slice(offset, offset + sliceSize);
          byteNumbers = new Array(slice.length);
          i = 0;
          while (i < slice.length) {
            byteNumbers[i] = slice.charCodeAt(i);
            i++;
          }
          byteArray = new Uint8Array(byteNumbers);
          byteArrays.push(byteArray);
          offset += sliceSize;
        }
        blob = new Blob(byteArrays, {
          type: contentType
        });
        return blob;
      };
      $scope.getDataByDate = function(updateDates) {
        $scope.data.from = $filter('date')($scope.fromDate.date, 'dd-MM-yyyy');
        $scope.data.to = $filter('date')($scope.toDate.date, 'dd-MM-yyyy');
        return $scope.getData($scope.data, updateDates);
      };
      $scope.hasWhiteSpace = function(s) {
        return /\s/g.test(s);
      };
      $scope.validateEmail = function(emailStr) {
        var pattern;
        pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(emailStr);
      };
      $scope.captchaKey = '6LcgBiATAAAAAMhNd_HyerpTvCHXtHG6BG-rtcmi';
      $scope.submitForm = function(data) {
        var unameArr;
        $scope.formProcess = true;
        if ($scope.hasWhiteSpace(data.name)) {
          unameArr = data.name.split(" ");
          data.uFname = unameArr[0];
          data.uLname = unameArr[1];
        } else {
          data.uFname = data.name;
          data.uLname = "";
        }
        if (!($scope.validateEmail(data.email))) {
          toastr.warning("Enter valid Email ID", "Warning");
          return false;
        }
        data.company = '';
        if (_.isEmpty(data.message)) {
          data.message = 'test';
        }
        return $http.post('https://giddh.com/contact/submitDetails', data).then(function(response) {
          $scope.formSubmitted = true;
          if (response.status === 200 && _.isUndefined(response.data.status)) {
            return $scope.responseMsg = "Thanks! will get in touch with you soon";
          } else {
            return $scope.responseMsg = response.data.message;
          }
        });
      };
      $scope.entryTotal = {};
      $scope.entryTotal.amount = '';
      $scope.entryTotal.type = '';
      $scope.checkCompEntry = function(ledger) {
        var unq;
        unq = ledger.uniqueName;
        ledger.isCompoundEntry = true;
        return _.each($scope.ledgerData.ledgers, function(lgr) {
          if (unq === lgr.uniqueName) {
            return lgr.isCompoundEntry = true;
          } else {
            return lgr.isCompoundEntry = false;
          }
        });
      };
      $scope.creditTotal = 0;
      $scope.debitTotal = 0;
      $scope.reckoningDebitTotal = 0;
      $scope.reckoningCreditTotal = 0;
      $scope.countTotalTransactions = function() {
        $scope.creditTotal = 0;
        $scope.debitTotal = 0;
        $scope.dTxnCount = 0;
        $scope.cTxnCount = 0;
        if ($scope.ledgerData.ledgers.length > 0) {
          return _.each($scope.ledgerData.ledgers, function(ledger) {
            if (ledger.transactions.length > 0) {
              return _.each(ledger.transactions, function(txn) {
                txn.isOpen = false;
                if (txn.type === 'DEBIT') {
                  $scope.dTxnCount += 1;
                  return $scope.debitTotal += Number(txn.amount);
                } else {
                  $scope.cTxnCount += 1;
                  return $scope.creditTotal += Number(txn.amount);
                }
              });
            }
          });
        }
      };
      return $scope.calReckoningTotal = function() {
        $scope.reckoningDebitTotal = $scope.ledgerData.debitTotal;
        $scope.reckoningCreditTotal = $scope.ledgerData.creditTotal;
        if ($scope.ledgerData.balance.type === 'CREDIT') {
          $scope.reckoningDebitTotal += $scope.ledgerData.balance.amount;
          return $scope.reckoningCreditTotal += $scope.ledgerData.forwardedBalance.amount;
        } else if ($scope.ledgerData.balance.type === 'DEBIT') {
          $scope.reckoningCreditTotal += $scope.ledgerData.balance.amount;
          return $scope.reckoningDebitTotal += $scope.ledgerData.forwardedBalance.amount;
        }
      };
    }



    angular.module('giddhWebsite').controller('magicController', magicCtrl);



})();
