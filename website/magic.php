<!DOCTYPE HTML>
<html lang="en" ng-app="giddhWebsite">
<head>
  <meta name="description" content="Giddh, the best online accounting and bookkeeping software. An accounting software to provide you an outstanding solution for business accounting management"/>
  <meta name="keywords" content="bookkeeping software, Accounting softwares, online accounting software, bookkeeping software for small business"/>
  
  <title>Giddh ~ Admin Panel</title>

  <?php include 'head.php';?>

</head>

<!-- {oh:geo.country != 'IN'} -->
<body id="page-top" class="light" ng-controller="magicController">
  
  <!-- <div ng-class="{'other-country': geo.country != 'IN'}" ng-if="geo.country != 'IN'">
    <iframe src="global.html" style="height:100%;width:100%;padding: 0;margin:0"></iframe>
  </div> -->



<!-- <ng-include src="'header.html'"></ng-include> -->
  <?php include 'header.php';?>  

<section class="container-fluid">
      <div style="min-height:600px" ng-hide="magicReady">
        <div class="loader">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>        
      </div>
      <div  class="pdL2 pdR2 pdT2 text-center title no-data" ng-show="showError " style="min-height:600px;">
        <h1>No Transactions Found.</h1>
        <p class="text-center" style="text-decoration:underline">Here are some things you can check:</p>
        <ul class="text-center list-unstyled" style="max-width:395px;margin:0 auto">
            <li><p>Whether the Link is still active.</p></li>
            <li><p>Whether the URL is Proper.</p></li>
            <li><p>You have an Active Internet Connection.</p></li>
            <li><p>Any third party add-on is not blocking scripts on this page.</p></li>
        </ul>
      </div>
      <div ng-show="magicReady && !showError">
        <div class="pdL2 pdR2 pdT2">

          <div class="form-inline pdB1 ledgHead">
            <form name="fromToDateForm" novalidate class="form-group mrR1">
              <div class="form-group datePickr">
                <label>From</label>
                <div class="input-group maxW150">
                  <input type="text" class="form-control"
                        uib-datepicker-popup="{{format}}" required
                        datepicker-options="dateOptions"
                        is-open="fromDatePickerIsOpen"
                        ng-click="fromDatePickerOpen()"
                        ng-model="fromDate.date" 
                        max-date="today" 
                        placeholder="from date" 
                          />
              <span class="input-group-btn">
                <button type="button" class="btn btn-default" ng-click="fromDatePickerOpen()"><i
                    class="glyphicon glyphicon-calendar"></i></button>
              </span>
                </div>
              </div>
              <div class="form-group datePickr">
                <label class="form-middle">To</label>
              </div>
              <div class="form-group">
                <div class="input-group maxW150">
                  <input type="text" class="form-control"
                        uib-datepicker-popup="{{format}}" required
                        datepicker-options="dateOptions"
                        is-open="toDatePickerIsOpen"
                        ng-click="toDatePickerOpen()"
                        ng-model="toDate.date" 
                        min-date="fromDate.date"
                        max-date="today"
                        placeholder="to date" 
                         />
              <span class="input-group-btn">
                <button type="button" class="btn btn-default" ng-click="toDatePickerOpen()"><i
                    class="glyphicon glyphicon-calendar"></i></button>
              </span>
                </div>
              </div>
              <div class="form-group">
                <button type="button" class="btn btn-primary mrL1" ng-disabled="fromToDateForm.$invalid" ng-click="getDataByDate(false)">
                  GO
                </button>
              </div>
<!--               <div class="form-group" ng-if="entryTotal.amount > 0">
                Entry Total:{{entryTotal.amount}} {{entryTotal.type}}
              </div> -->
            </form>

           <div class="form-group mrL1 pull-right">
              <input type="search" class="form-control maxW150" placeholder="Search ledger" ng-model="particularSearch">
              <i class="glyphicon glyphicon-search"  style="right:25px;top:3px;"></i>
            </div>
            <!--  
            <a class="pull-right mrL1" href="javascript:void(0)" title=""  uib-tooltip="Show List" tooltip-placement="left" ng-click="showImportList()" >
              <i class="glyphicon glyphicon-th-list" ></i>
            </a>
            
            <a class="pull-right mrL1" href="javascript:void(0)" title=""  uib-tooltip="Export" tooltip-placement="left" ng-click="exportLedger()" >
              <i class="glyphicon glyphicon-cloud-download pull-right" ></i>
            </a>

            <span id="isSafari"></span>
           
            <form class="pull-right mrL1" enctype="multipart/form-data">
              <a class="mrL1" type="file" ngf-select="importLedger($files, $invalidFiles)" accept=".xls, .xlsx" ngf-max-size="100MB" ng-disabled="!canUpdate">
                 <i class="glyphicon glyphicon-copy" uib-tooltip="Import" tooltip-placement="left"></i>
              </a>
            </form>
            
            <span class="pull-right mrL1" uib-dropdown  auto-close="outsideClick">
              <a href id="simple-dropdown" uib-dropdown-toggle>
                <i uib-tooltip="Send Ledger" tooltip-placement="right" class="glyphicon glyphicon-envelope" ></i>
              </a>
              <ul class="dropdown-menu" uib-dropdown-menu aria-labelledby="simple-dropdown">
                <li>
                  <form class="form-group pd1" name="ledgerEmailSendForm" novalidate>
                    <div class="mrB1">
                      <textarea ng-model="ledgerEmailData.email" required name="ledgerEmailSendForm.email" class="form-control" placeholder="Recipents Email Id's"></textarea>
                    </div>
                    <button ng-disabled="ledgerEmailSendForm.$invalid" class="btn btn-primary btn-sm" ng-click="sendLedgEmail(ledgerEmailData.email)">Send Email</button>
                  </form>
                </li>
              </ul>
            </span> -->
          </div>

          <table class="table ledgerTable">
            <thead>
            <th class="nopad" colspan="3">
              <div class="clearfix ldgTheadL">
                <span class="icon48 icon-in"></span>

                <h3 class="ledgerHead">
                  <span tooltip-placement="top" uib-tooltip="{{accountName}}" class="ellp">{{accountName}}</span>
                  <span> is <strong>receiving</strong></span>
                </h3>
              </div>
            </th>
            <th class="nopad" colspan="3">
              <div class="pull-right alR">
                <div class="clearfix ldgTheadR">
                  <span class="icon48 icon-out"></span>

                  <h3 class="ledgerHead">
                    <span tooltip-placement="top" uib-tooltip="{{accountName}}" class="ellp">{{accountName}}</span>
                    <span> is <strong>giving</strong></span>
                  </h3>
                </div>
              </div>
            </th>
            </thead>
            <!-- end main thead -->
            <tbody>
            <tr>
              <td class="nopad bdrL bdrR" style="width:50%" colspan="3">
                <table class="table">
                  <thead>
                  <tr class="splBg">
                    <th colspan="100%">Debit (Dr)</th>
                  </tr>
                  <tr class="dgreyBg">
                    <th width="28%">Date <span class="small">(DD-MM-YYYY)</span></th>
                    <th width="44%">Particular</th>
                    <th width="28%" class="alR">Amount</th>
                  </tr>

                  <tr class="greyBg" ng-if="ledgerData.forwardedBalance.type == 'DEBIT' && ledgerData.forwardedBalance.amount > 0">
                    <th colspan="2" class="alR">
                      B/F Balance
                    </th>
                    <th class="alR">{{ledgerData.forwardedBalance.amount | number:2}}</th>
                  </tr>
                  <tr class="greyBg"
                      ng-if="ledgerData.forwardedBalance.type == 'CREDIT' && ledgerData.forwardedBalance.amount > 0">
                    <th colspan="100%">
                      &nbsp;
                    </th>
                  </tr>
                  </thead>
                  <tbody>
                    <tr ng-repeat="ledger in ledgerData.ledgers" ng-if="ledger.hasDebit" ng-class="{compoundEntry: ledger.isCompoundEntry}" ng-click="checkCompEntry(ledger)" uib-tooltip="Total : {{ledger.total.amount}} {{ledger.total.type}}" tooltip-placement="top">
                      <td colspan="100%" style="padding:0;border:0">
                        <table style="width:100%">
                          <tbody>
                            <tr class="text-left bdrB" ng-repeat="txn in ledger.transactions | filter:particularSearch" ng-if="txn.type == 'DEBIT'">
                              <td class="col-xs-3" style="padding:10px;">{{ledger.entryDate}}</td>
                              <td class="col-xs-6 bdrL" style="padding:10px;">{{txn.particular.name}}</td>
                              <td class="col-xs-3 bdrL pr" align="right" style="padding:10px;padding-right:30px;">{{txn.amount}}
                                <span
                                  class="download-invoice-ledger pa" 
                                  ng-if="ledger.invoiceGenerated" 
                                  tooltip-append-to-body="true"
                                  ng-mouseover="$event.stopPropagation()"
                                  ng-click="downloadInvoice(ledger.invoiceNumber)"
                                  uib-tooltip="Download invoice : {{ledger.invoiceNumber}}" 
                                  tooltip-placement="bottom" style="top:11px;right:2px;"> 
                                  <i class="glyphicon glyphicon-download" style="font-size:15px" ></i>
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr ng-if="ledgerData.ledgers.length < 1">
                      <td colspan="100%" style="padding:0;border:0">
                        <table style="width:100%">
                          <tbody>
                            <tr class="text-left bdrB">
                              <td class="col-xs-3" style="padding:20px;min-height:42px"></td>
                              <td class="col-xs-6 bdrL" style="padding:20px;"></td>
                              <td class="col-xs-3 bdrL" style="padding:20px;"></td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>

                  </tbody>
                </table>
              </td>
              <!-- main left td end here -->
              <td class="nopad bdrL bdrR" style="width:50%" colspan="3">
                <table class="table">
                  <thead>
                  <tr class="splBg">
                    <th colspan="100%">Credit (Cr)</th>
                  </tr>
                  <tr class="dgreyBg">
                    <th width="28%">Date <span class="small">(DD-MM-YYYY)</span></th>
                    <th width="44%">Particular</th>
                    <th width="28%" class="alR">Amount</th>
                  </tr>
                  <tr class="greyBg"
                      ng-if="ledgerData.forwardedBalance.type == 'CREDIT' && ledgerData.forwardedBalance.amount > 0">
                    <th colspan="2" class="alR">
                      B/F Balance
                    </th>
                    <th class="alR">{{ledgerData.forwardedBalance.amount | number:2}}</th>
                  </tr>
                  <tr class="greyBg"
                      ng-if="ledgerData.forwardedBalance.type == 'DEBIT' && ledgerData.forwardedBalance.amount > 0">
                    <th colspan="100%">
                      &nbsp;
                    </th>
                  </tr>
                  </thead>

                  <tbody>
                    <tr ng-repeat="ledger in ledgerData.ledgers" ng-if="ledger.hasCredit" ng-class="{compoundEntry: ledger.isCompoundEntry}" ng-click="checkCompEntry(ledger)" uib-tooltip="Total : {{ledger.total.amount}} {{ledger.total.type}}" tooltip-placement="top">
                      <td colspan="100%" style="padding:0; border:0">
                        <table  style="width:100%;">
                          <tbody>
                            <tr class="text-left bdrB" ng-repeat="txn in ledger.transactions | filter:particularSearch" ng-if="txn.type == 'CREDIT'">
                              <td class="col-xs-3" style="padding:10px;">{{ledger.entryDate}}</td>
                              <td class="col-xs-6 bdrL" style="padding:10px;">{{txn.particular.name}}</td>
                              <td class="col-xs-3 bdrL pr" align="right" style="padding:10px;padding-right:30px;">{{txn.amount}}
                                <span 
                                  class="download-invoice-ledger pa" 
                                  ng-if="ledger.invoiceGenerated" 
                                  tooltip-append-to-body="true"
                                  ng-mouseover="$event.stopPropagation()" 
                                  ng-click="downloadInvoice(ledger.invoiceNumber)"
                                  uib-tooltip="Download invoice : {{ledger.invoiceNumber}}" 
                                  tooltip-placement="bottom" style="top:11px;right:2px;"> 
                                  <i class="glyphicon glyphicon-download" style="font-size:15px;" ></i>
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <trng-if="ledgerData.ledgers.length < 1">
                      <td colspan="100%" style="padding:0; border:0">
                        <table  style="width:100%;">
                          <tbody>
                            <tr class="text-left bdrB" >
                              <td class="col-xs-3" style="padding:20px;"></td>
                              <td class="col-xs-6 bdrL" style="padding:20px;"></td>
                              <td class="col-xs-3 bdrL" style="padding:20px;"></td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <!-- main right td end here -->
            </tr>
            </tbody>
            <!-- end main tbody -->
            <tfoot>

            <tr class="fw600 dgreyBg">
              <td colspan="2" class="bdrL" style="width:36%">
                <div class="pull-right" ng-if="ledgerData.balance.type == 'CREDIT'">
                  C/F Balance
                </div>
              </td>
              <td style="width:14%" class="bdrR alR">
                <span ng-if="ledgerData.balance.type == 'CREDIT'">{{ledgerData.balance.amount | number:2}}
                  <span ng-if="ledgerData.balance.type == 'DEBIT'">DR</span>
                  <span ng-if="ledgerData.balance.type == 'CREDIT'">CR</span>
                </span>
              </td>
              <td colspan="2" style="width:36%" class="bdrL">
                <div class="pull-right"  ng-if="ledgerData.balance.type == 'DEBIT'">
                  C/F Balance
                </div>
              </td>
              <td style="width:14%" class="bdrR alR">
                <span ng-if="ledgerData.balance.type == 'DEBIT'">{{ledgerData.balance.amount | number:2}}
                  <span ng-if="ledgerData.balance.type == 'DEBIT'">DR</span>
                  <span ng-if="ledgerData.balance.type == 'CREDIT'">CR</span>
                </span>
              </td>
            </tr>
            <tr class="total greyBg">
              <td colspan="2" style="width:36%" class="bdrL">
                <span class="pull-left">Debit Total:{{debitTotal | number:2 }}</span>
                <span class="pull-right">Reckoning</span>
              </td>
              <td style="width:14%" class="bdrR alR">
                <span>{{reckoningDebitTotal | number:2}}</span>
              </td>
              <td colspan="2" style="width:36%" class="bdrL">
                <span class="pull-left">Credit Total:{{creditTotal | number:2 }}</span>
                <span class="pull-right">Reckoning</span>
              </td>
              <td style="width:14%" class="bdrR alR">
                <span>{{reckoningCreditTotal | number:2}}</span>
              </td>
            </tr>

            </tfoot>
            <!-- end main tfoot -->
          </table>
        </div>
        <div style="height: 80px;"></div>
      </div>
    </section>
    
    <section class="cmnPd80 ylwBg homeBtmhalf">
      
      <div class="container">
          <div class="row text-center">
              <div class="col-sm-12">
                          <h3 class="arvo">Giddh <strong>automates the accounting</strong> on behalf of <span class="companyName"><strong>{{companyName}}</strong></span>.</h3>
                          <h4 class="arvo">We would love to extend our support via <a href="https://muneem.co" target="_blank" class="green" style="text-decoration: underline;">Muneem</a> for any query related to your ledger with <span class="companyName">{{companyName}}</span>.</h4>
              </div>
          </div>
      </div>
    
    </section>

    <section class="cmnPd80 sub_footer">
      
      <div class="container">
          <div class="row text-center">
              <div class="col-sm-12">
                          <h3 class="arvo">Giddh is the future of online accounting software (but-obvious GST ready).</h3>
                          <h3 class="arvo">Do you have any question with Giddh?</h3>
              </div>
          </div>
      </div>
    
    </section>

  <!-- include footer -->
  <ng-include src="'footer.html'"></ng-include>

  <?php include 'footScript.php';?>

</body>
</html>