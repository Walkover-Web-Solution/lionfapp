(function() {
  'use strict';

    function paymentCtrl($scope, toastr, $http, $location, $rootScope, $filter, $sce) {
        var data, searchArr, urlSearch;
        urlSearch = window.location.search;
        searchArr = urlSearch.split("=");
        $scope.randomUniqueName = searchArr[1];
        data = {};
        data.randomNumber = $scope.randomUniqueName;
        $scope.wlt = {
            Amnt: 100,
            orderId: ""
        };
        $scope.basicInfo = {
            name: 'ravi soni',
            email: 'ravisoni@walkover.in'
        };
        $scope.pdfFile = "";
        $scope.showInvoice = true;
        $scope.removeDotFromString = function(str) {
            return Math.floor(Number(str));
        };
        $scope.b64toBlob = function(b64Data, contentType, sliceSize) {
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
        $scope.getDetails = function() {
            return $http.post('/invoice-pay-request', data).then(function(response) {
                $scope.wlt = response.data.body;
                $scope.content = "data:application/pdf;base64," + $scope.wlt.content;
                $scope.pdfFile = $sce.trustAsResourceUrl($scope.content);
                $scope.contentHtml = $sce.trustAsHtml($scope.wlt.htmlContent);
                return $scope.showInvoice = true;
            }, function(error) {
                return toastr.error(error.data.message);
            });
        };
        $scope.successPayment = function(data) {
            if ($scope.wlt.contentType === "invoice") {
                return $http.post('/invoice/pay', data).then(function(response) {
                    return toastr.success(response.data.body);
                }, function(error) {
                    return toastr.error(error.data.message);
                });
            } else if ($scope.wlt.contentType === "proforma") {
                return $http.post('/proforma/pay', data).then(function(response) {
                    return toastr.success(response.body);
                }, function(error) {
                    return toastr.error(error.data.message);
                });
            }
        };
        $scope.downloadInvoice = function() {
            var a, dataUri;
            dataUri = 'data:application/pdf;base64,' + $scope.wlt.content;
            a = document.createElement('a');
            a.download = $scope.wlt.contentNumber + ".pdf";
            a.href = dataUri;
            return a.click();
        };
        return $scope.getDetails();
    };

    angular.module('giddhWebsite').controller('paymentCtrl', paymentCtrl);

}).call(this);