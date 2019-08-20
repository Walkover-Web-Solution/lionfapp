<!DOCTYPE HTML>
<html lang="en" ng-app="giddhWebsite">
<head>
  <title>Giddh Accounting Software case Study  for Instacar.in</title>
  <meta name="description" content="Instacar.in using Giddh accounting software for their bookkeeping needs. Click here to use Giddh Accounting & bookkeeping software for your business."/>
  <meta name="keywords" content="Giddh, Accounting Software, Accounting case Study, Instacar.in "/>
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



  <!-- <ng-include src="'header.html'"></ng-include> -->
      <?php include 'header.php';?>  
  <!-- end navigation -->
  

  <section class="text-center caseStudy">
      <aside class="insBg"><img class="imgHd" src="assets/images/new/instacar-big.png" /></aside>
      <div class="triangle"></div>
      <div style="background:#eee;">
          <div class="container adjust-width">
            <h2 style="color:#363636">About the Company</h2>
            <div class="clearfix mrB5">
                <div class="col-sm-4">
                    <img src="assets/images/new/ic-bulb.png" />
                    <p class="mrT3">Founded</p><small>2016</small>
                </div>
                <div class="col-sm-4">
                    <img src="assets/images/new/ic-car.png" />
                    <p class="mrT3">Industry</p><small>B2C, Car Rental</small>
                </div>
                <div class="col-sm-4">
                    <img src="assets/images/new/ic-smile.png" />
                    <p class="mrT3">Clients Served</p><small>70,000+</small>
                </div>
            </div>
            <p class="pdT1"><span class="font-black">Instacar</span> is an outstation car rental service provider company in India. The company decided to use Giddh as an Online Accounting platform to automate their manual accounting tasks and saved tons of time which was not possible with offline software.</p>
          </div>
      </div>   
      
      <div class="moreAbout">
          <div class="container text-left adjust-width">
            <h3>Company Creation</h3>
            <p>Every time a new fleet partner joins Instacar, they need to submit a form on Instacar website. These details are sent to Giddh via API and a new company is created in <span class="pClr">Giddh</span> <a href="https://giddh.com" title="accounting software">accounting software</a> with a fleet partner name. This entire process happens without any human intervention.</p>
            
            <h3 class="mrT4">Request to make advance payment</h3>
            <p>At Instacar every booking confirm after advanced payment. So, Instacar integrated Razorpay with <span class="pClr">Giddh</span> to send payment request via invoice. This increased their total number of confirmation booking and rides.</p>

            <h3 class="mrT4">Invoicing</h3>
            <p>Instacar sends invoice after the end of the ride to their customer and fleet partner. Due to their integration with <span class="pClr">Giddh</span>, all invoices are sent instantly and automatically. This invoice automation process has reduced their Accounting team's efforts.</p>
          </div>
      </div> 
      
      <div class="blueBg">
        <div class="container adjust-width">
            <p>"When it comes to Accounting and Finance, finding a good product is evasive. We tried almost all available solutions and ended up on Giddh solely because the team was open to customisations as per our growing needs. We’ve about 500+ companies for our partner agencies and automated billing and Giddh has been an amazing experience, each and every requirement has been fulfilled within 1-2 hours. Super team, a must use tool if you are a startup, scaling rapidly and your finances are complex."</p>
            <div class="clearfix mrB5 mrT2">
                <div class="col-sm-4"></div>
                <div class="col-sm-4"></div>
                <div class="col-sm-4 text-left mrB2"><p>Ishan Vyas</p><small>CEO @ Instacar</small></div>
            </div>
            
            <p>"Giddh has helped me immensely in creating and sending invoices automatically."</p>
            <div class="clearfix mrT2">
                <div class="col-sm-4"></div>
                <div class="col-sm-4"></div>
                <div class="col-sm-4 text-left"><p>Abhishek Singh</p><small>Accountant @ Instacar</small></div>
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