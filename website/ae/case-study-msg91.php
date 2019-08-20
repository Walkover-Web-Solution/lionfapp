<!DOCTYPE HTML>
<html lang="en" ng-app="giddhWebsite">
<head>
  <title>Giddh Accounting Software case Study for MSG91.com</title>
  <meta name="description" content="MSG91, enterprise messaging solution uses Giddh accounting software for their accounting. Find more about utility of Giddh accounting & bookkeeping software."/>
  <meta name="keywords" content="Giddh Accounting Software case Study"/>
  

  <?php include 'head.php';?>
  <style>
  	.navbar-custom .navbar-nav > li > a{color:#fff !important}
  	.navbar-custom.affix .navbar-nav > li > a{color:#26263A !important}
  </style>

</head>

<!-- {oh:geo.country != 'IN'} -->
<body id="page-top" class="light" ng-controller="homeController as vm">
  
  <!-- <div ng-class="{'other-country': geo.country != 'IN'}" ng-if="geo.country != 'IN'">
    <iframe src="global.html" style="height:100%;width:100%;padding: 0;margin:0"></iframe>
  </div> -->



  <ng-include src="'header.html'"></ng-include>

  <!-- end navigation -->
  

  <section class="text-center caseStudy">
      <aside class="msgBg"><img class="imgHd" src="assets/images/new/msg91-big.png" /></aside>
      <div class="triangle"></div>
      <div style="background:#eee;">
          <div class="container adjust-width">
            <h2 style="color:#363636">About the Company</h2>
            <div class="clearfix mrB5">
                <div class="col-sm-4">
                    <img src="assets/images/new/ic-bulb.png" />
                    <p class="mrT3">Founded</p><small>2010</small>
                </div>
                <div class="col-sm-4 ind">
                    <img src="assets/images/new/ic-cloud.png" />
                    <p class="mrT3">Industry</p><small>B2B, SaaS</small>
                </div>
                <div class="col-sm-4">
                    <img src="assets/images/new/ic-smile.png" />
                    <p class="mrT3">Clients Served</p><small>5000+</small>
                </div>
            </div>
            <p class="pdT1"><span class="font-black">MSG91</span>, an enterprise messaging solution shifted<br> from Tally to Giddh for automatic bookkeeping, accounting and invoicing.</p>
          </div>
      </div>   
      
      <div class="moreAbout">
          <div class="container text-left adjust-width">
            <h3>Maintain Transaction Entries</h3>
            <p>Earlier MSG91's Accountants used to do 90-100 transaction entries in Tally on a daily
basis. Now, after integrating <span class="pClr">Giddh</span> APIs, their entire transaction entries are done smoothly and automatically. This way MSG91 is saving 36 hours of an accountant work every month</p>
            
            <h3 class="mrT4">Sharing real time Ledger with Clients</h3>
            <p>With the help of <span class="pClr">Giddh</span>, MSG91 is able to share real time ledger to their Clients for solving the problem of outstanding amount or mismatch of any transaction entry.</p>

            <h3 class="mrT4">Invoicing</h3>
            <p>With the help of <span class="pClr">Giddh <a href="https://giddh.com" title="Accounting Software">Accounting Software</a></span>, every MSG91 User receives an automatic invoice after purchasing SMS. This automation saves a lot of time of their Accountants and Sales team to generate and send invoices.</p>
          </div>
      </div> 
      
      <div class="blueBg">
        <div class="container adjust-width">
            <p>"Accounting is not just for tax purpose but the backbone of any business. It has to be real time, automated and available to everyone (Giddh’s everyone is different, it includes vendors, clients, everyone..wtf ). Giddh is made for the people like us NOT the account department. No second thought."</p>
            <div class="clearfix mrB5 mrT2">
                <div class="col-sm-4"></div>
                <div class="col-sm-4"></div>
                <div class="col-sm-4 text-left mrB2"><p>Pushpendra Agrawal</p><small>CEO @ Msg91</small></div>
            </div>
            
            <p>"Switching to Giddh has saved us many man-hours. We can now focus on analysis instead of doing manual entries. And it’s surprisingly easy to use."</p>
            <div class="clearfix mrT2">
                <div class="col-sm-4"></div>
                <div class="col-sm-4"></div>
                <div class="col-sm-4 text-left"><p>Tameem Khan</p><small>Accountant @ Msg91</small></div>
            </div>
        </div>
      </div>
      
      <div class="text-center pdT4 pdB3"><a class="btn btn-secondary fs24" href="signup.php">TRY NOW</a></div>
      
      
  </section>
  <!-- home content end -->

  <!-- include footer -->
  <?php include 'footScript.php';?>
  <?php include 'footer.php';?>  
</body>
</html>