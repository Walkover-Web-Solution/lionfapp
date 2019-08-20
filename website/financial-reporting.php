<!DOCTYPE HTML>
<html lang="en" ng-app="giddhWebsite">
  <meta charset="UTF-8">
  <meta name="description" content="See your business growth in real time with the automatically generated business financial report in Giddh. Keep track of your finances & share the financial reporting and analysis with your advisor. "/>
  <!-- 
  <meta name="keywords" content=""/> -->
  
  <title>Financial Reporting and Analysis </title>
  <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script> -->
  <?php include 'head.php';?>

</head>

<!-- {oh:geo.country != 'IN'} -->
<body id="page-top" class="light" ng-controller="homeController as vm">
  
  <!-- <div ng-class="{'other-country': geo.country != 'IN'}" ng-if="geo.country != 'IN'">
    <iframe src="global.html" style="height:100%;width:100%;padding: 0;margin:0"></iframe>
  </div> -->



  <!-- <ng-include src="'header.html'"></ng-include> -->
  <?php include 'header.php';?>  
  <!-- end navigation -->

    
<section id="videoBg" class="black-back main-banner">
  <div class="container">
    <img src="../assets/images/Cloud Icon.svg" alt="" class="sky-small">
    <img src="../assets/images/Cloud Icon.svg" alt="" class="sky-large">
    
    <div class="row">
      <div class="col-md-7">
      <div class="banner_intro features_banner">
            <h2 class="banner_heading_new">Make sense of your numbers <br>by automatic Financial Reports</h2>
            <p class="banner_sub_heading m-t-15">Financial reports will help in evaluating the strengths
and weaknesses of any business, be it a small retail one 
or a growing e-commerce one.</p>
            <p class="m-t-20 banner-btn">
            
            <a class="btn btn-primary" id="downloadWindows" href="https://s3-ap-south-1.amazonaws.com/giddh-app-builds/giddh%20Setup%20{{apkVersion}}.exe">Download Free</a>
              <a class="btn btn-primary" id="downloadMacOS" href="https://s3-ap-south-1.amazonaws.com/giddh-app-builds/giddh-{{apkVersion}}.dmg">Download Free</a>
              <a class="btn btn-primary" id="downloadLinux" href="https://s3-ap-south-1.amazonaws.com/giddh-app-builds/giddh%20Setup%20{{apkVersion}}.exe">Download Free</a>

              <a class="talktosale" data-toggle="modal" data-target="#talkToSales_dialog"><span class="glyphicon glyphicon-earphone"></span>Talk to Sales</a>
            </p>
        </div>
      </div>
  <!-- col end -->
    <div class="col-md-5">
      <div class="right-section">
        <img src="../assets/images/reporting/reporting-banner.png" alt="Tally your books with giddh" class="cloud-accounting-software-img">
      </div>
    </div>
    <!-- col end -->
    </div>
  <!-- row end -->
    </div>
  <!-- container end -->
  </section> <!-- end of videoBg -->
  
  
  <!-- home content end -->
  <section class="graybg graybg-reporting  homeContent" id="feature">
    <div class="container">
    <div class="row">
          <div class="col-sm-12">
            <h2 class="center_heading">Smart accounting reports for business of any size</h2>
            <div class="middle-width"><p>Stay on top of your numbers and make informed business decisions. Analyse and share your vital financial reports like- balance sheet, trial balance, profit/loss to the key decision maker of your business. Giddh gives you all reports you may need to run your business better.</p></div>
            <!-- <a class="btn btn-primary btn-lg m-t-70" data-toggle="modal" data-target="#talkToSales_dialog">Talk to Expert</a> -->
            <a href="https://giddh.com/app/signup" class="btn btn-primary btn-lg m-t-70">Try Now</a>
        </div>
    </div>
    
    </div>
      
  </section> 

  <section class="whitebg left-text">
  <div class="container">

  <div class="row financial-services">
  <div class="col-sm-6">
  <h2>Big picture analysis made easy</h2>
  <p>You don’t need to be an accounting professional to know how your business is doing. Giddh financial reports are color-coded so that the process of analysis is simple like an elementary task for you. And if you want to bring an accountant overboard, you can seamlessly share your reports.</p>
  </div>
  
  <div class="col-sm-6 text-center">
   <img src="../assets/images/reporting/reporting-feature-1.png" alt="">
  </div>
  </div>
  <!-- row end -->

  
  <div class="row financial-services">
  <div class="col-sm-6">
   <img src="../assets/images/reporting/reporting-feature-2.png" alt="">
  </div>
  <div class="col-sm-6">
  <h2>Ready-made reports when you need them</h2>
  <p>With cloud-based business reporting, you don’t need to wait for the month’s end to know where your business stands as the reports can be viewed whenever you want and wherever you like.</p>
  </div>
  </div>
  
  <div class="row financial-services">
  <div class="col-sm-6">
  <h2>Keep an eye on the money owed to you</h2>
  <p>Keep tabs on your unpaid invoices and customers who owe money to your business with Aging report. Aging report provides clear answers to questions like - “how much do my customers customers owe me” & “how long have they owed that money”, enabling you to prepare better collection strategy.</p>
  </div>
  
  <div class="col-sm-6 text-center">
   <img src="../assets/images/reporting/reporting-feature-3.png" alt="">
  </div>
 </div>
 <!-- col end -->
 
  <div class="row financial-services">
   <div class="col-sm-6">
   <img src="../assets/images/reporting/reporting-feature-4.png" alt="">
  </div>
  <div class="col-sm-6">
  <h2 class="collab">Collaborate & grow</h2>
  <p>Bring your accountant in so they can identify trends and actions. Download your automatically generated financial reports and share them with the stakeholders of your business: investors, executives, sales, finance, and other departments in formats like PDF and Excel.</p>
  </div>
 </div>
<!-- col end -->

  </div>
  </section> 
  
  <section class="reporting-solution">
  <div class="container">
  <div class="row">
    <div class="col-sm-12 m-b-60">
    <h2 class="center_heading m-b-60">Your all round reporting solution</h2>
    <p>Giddh online accounting software produces all of the standard financial reports required by a forward-<br> 
    thinking business to make smarter and faster business decisions.</p>
    </div>

    <div class="text-center">
      <ul class="reportint-list">
      <li>Profit/Loss Statement, Balance Sheet, General Ledger and Trial Balance.</li>
      <li>Drill down the reports by date, financial year, or even project type.</li>
      <li>Export reports in any of the two supported formats: PDF or Excel.</li>
      <li>Invite your accountant, partners or investors.</li>
      </ul>
    </div>
      
    </div>
  </div>
  </section>
  
  <section class="graybg p-t-70">
    <div class="container area-flex  blog_center_new">
      <div class="center-divbox">
          <div class="pioneer blog_center_new"><img src="../assets/images/reporting/reporting-blog.png" alt=""></div>
          <span class="blog-reporting">Business reporting tools: Turning data <br> into information & information into insight.<br>

          <a href="https://blog.giddh.com/business-reporting-tools-turning-data-into-information-information-into-insight-8facc67ba1" target="blank">Read more...</a>
          </span>
          </div>
    </div>
</section>
  
<section class="whitebg know p-t-80">
<div class="container">
<div class="row p-tb-0">
  <div class="col-sm-12">
      <div class="text-center">
      <img src="../assets/images/reporting/footer.svg" class="peopel-img" alt="">
          
          <div class="reporting-blog-text">
          <div class="footer-meta-heading"><span>People interested in  <h1>financial reporting</h1> also looked at</span></div>
          
          <div class="clearfix text-center mrT2">
          <a class="all-features" href="features.php">All features</a>
            <ul id="cardList">
              <li><a href="cloud-accounting-software.php">Cloud accounting</a></li>
              <li><a href="accounting-dashboard.php">Dashboard</a></li>
              <li><a href="invoice-software.php">Invoicing</a></li>
              <li><a href="multi-currency-accounting-software.php">Multi-Currency</a></li>
              <li><a href="multi-user-accounting-software.php">Share Data</a></li>
              <li><a href="import-data.php">Import data</a></li>
              <li><a href="conect-bank-reconcile.php">Bank reconcile</a></li>
              <li><a href="inventory-management-software.php">Management software</a></li>
            </ul>
          </div>
          
          </div>
      </div>
  </div>
</div>
</div>

</section>
  
  <!-- <div class="modal fade" id="talkToSales_dialog" role="dialog">
  <div class="modal-dialog custom-dialog">
    <div class="modal-header">
      <h3 class="brdB left">Talk to Expert</h3>
      <a data-dismiss="modal" aria-label="Close" class="close-glyph">✕</a>
       <ul class="nav-tabs nav-tabs-talk height42" id="shortner_tabs">
           <li class="active"><a href="#scheduleCall"  data-toggle="tab">Arrange a Demo</a></li>
           <li><a href="#dropEmail"  data-toggle="tab">Drop us a mail</a></li>

       </ul>
    </div>
       <div class="pd2 tab-content custom-padding-20 height-552 tab-content-modal">

         <div id="dropEmail" class="tab-pane">
           <div id="Jkvq" class="talktosale-superform"></div>

           <div class='alert alert-succcess successsales'></div>
         </div>

         <div id="scheduleCall" class="tab-pane active vertical-center">
                <p>Choose your preferred time to schedule<br>
                   a demo with an expert. </p>
                <button class="btn btn-primary">Click Here</button>
         </div>
       </div>
       
     </div>
 </div> -->
  <!-- end of page -->
  <?php include 'footScript.php';?>
  <?php include 'footer.php';?> 
  <script>
  function detectBrowser(x, y, z) {
    z = z || y;
    if (navigator[x] && navigator[x].indexOf(y) !== -1) {
        osName = z;
    }
}

/*   navigator     value     download  */
detectBrowser( "appVersion", "Mac",    "MacOS"   );
detectBrowser( "appVersion", "Linux"             );
detectBrowser( "userAgent",  "Linux"             );
detectBrowser( "platform",   "Linux"             );
detectBrowser( "appVersion", "Win",    "Windows" );
detectBrowser( "userAgent",  "Windows"           );
detectBrowser( "platform",   "Win",    "Windows" );
detectBrowser( "oscpu",      "Windows"           );
document.getElementById("download"+osName).className = "btn btn-primary knownOS";

  </script>
</body>
</html>
