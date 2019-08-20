<!DOCTYPE HTML>
<html lang="en" ng-app="giddhWebsite">
  <meta charset="UTF-8">
  <meta name="description" content="Online accounting dashboard with simple charts and graph help you to keep inside of your business."/>
  <!-- 
  <meta name="keywords" content=""/> -->
  
  <title>Online Accounting Dashboard</title>
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
            <h2 class="banner_heading_new">Know your business' worth <br>with simple online dashboard</h2>
            <p class="banner_sub_heading m-t-15">Turn your accounting data into business intelligence <br>with Giddh Dashboard.</p>
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
      <img src="../assets/images/dashboard/dashboard-banner.png" alt="Tally your books with giddh" class="cloud-accounting-software-img">
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
              <h2 class="center_heading">Assess your numbers in one glance</h2>
              <div class="middle-width"> <p>Gain actionable insights and easily evaluate growth of your business. Real-time accounting dashboard offers you a bird eye’s view to your business health on a single window. Actively keep an eye on the net worth, revenue, profit/loss and other key information of your business.</p></div>
              <!-- <a class="btn btn-primary btn-lg m-t-70" data-toggle="modal" data-target="#talkToSales_dialog">Talk to Sales</a> -->
              <a href="https://giddh.com/app/signup" class="btn btn-primary btn-lg m-t-70">Try Now</a>
                      </div>
          </div>
      </div>
      
      </div>
      
  </section> 
  <section class="whitebg left-text">
  <div class="container">
  <div class="row financial-services">
  <div class="col-sm-6">
  <h2>Know the true worth of your business</h2>
  <p>There’s no way to know exactly where your business stands without knowing what your net worth is, whether your revenue is grow financial-servicesing and where your expenses lie. Online accounting dashboard gives you the real position of your all these values by automatically crunching your numbers and presenting them on an easy to evaluate graph.</p>
  </div>
  
  <div class="col-sm-6 text-center">
   <img src="../assets/images/dashboard/dashboard-feature-1.png" alt="">
  </div>
  
  </div>
  
  <div class="row financial-services">
  <div class="col-sm-6 ">
   <img src="../assets/images/dashboard/dashboard-feature-2.png" alt="">
  </div>
  <div class="col-sm-6">
  <h2>Track your monthly overdues</h2>
  <p>Pay and get paid quicker by easily following up on your monthly overdues. Dashboard gives a summary of what you owe to your clients and what’s owed to you in the form of receivable and payable right on your home window.</p>
  </div>
  </div>

  <div class="row financial-services">
   
  <div class="col-sm-6">
  <h2 class="collab">Keep an eye on where your money goes</h2>
  <p>Keep track of your expenses & discounts you give. Giddh accounting dashboard provides you with easy to understand expense graph so that you can create better strategies to minimise expenses & maximise profits.</p>
  </div>
  
  <div class="col-sm-6 text-center">
   <img src="../assets/images/dashboard/dashboard-feature-3.png" alt="">
  </div>
 </div>
 
 <div class="row financial-services">
   <div class="col-sm-6 ">
   <img src="../assets/images/dashboard/dashboard-feature-4.png" alt="">
  </div>
   
  <div class="col-sm-6">
  <h2 class="collab">Predict with more precision</h2>
  <p>Giddh takes the pain out from your prediction process. With one-click yearly comparison of revenues, profit/loss & expenses, you can make better assumptions of how the business will behave in the future by the past trends.</p>
  </div>
  
 </div>
 
 <div class="row financial-services">

  <div class="col-sm-6">
  <h2 class="collab">Financial ratio analysis</h2>
  <p>Will your business be able to pay short-term and long-term obligations? What is its liquidity and profitability? The ratio analysis calculated automatically from the standard business formulas gives you an idea about your liability, equity and more so that you can take appropriate measures at the right time.</p>
  </div>
  
  <div class="col-sm-6 text-center">
   <img src="../assets/images/dashboard/dashboard-feature-5.png" alt="">
  </div>
 </div>
   
  </div>
  </section> 
  
  
  <section class="graybg p-t-70">
    <div class="container area-flex  blog_center_new">
    <div class="center-divbox">
      <div class="pioneer blog_center_new"><img src="../assets/images/dashboard/dashboard-blog.png" alt=""></div>
      <span class="blog-reporting">Optimise, Analyse and Evaluate with <br>
      Giddh Dynamic Dashboard<br>

      <a href="https://blog.giddh.com/optimise-analyse-and-evaluate-with-giddhs-dynamic-dashboard-43560ea66ad" target="_blank">Read more...</a>
      </span></div>
    </div>
  </section>
  
  <section class="whitebg know p-t-80">
<div class="container">
<div class="row p-tb-0">
                <div class="col-sm-12">
                    <div class="text-center">
                    <img src="../assets/images/reporting/footer.svg" class="peopel-img" alt="">
                       
                       <div class="reporting-blog-text">
                         
                       <div class="reporting-blog-text">
                        <div class="footer-meta-heading"> <span>People interested in <h1> accounting dashboard </h1> also looked at</span></div>

                        
                        <div class="clearfix text-center mrT2">
                          <a class="all-features" href="features.php">All features</a>
                            <ul id="cardList">
                              <li><a href="cloud-accounting-software.php">Cloud accounting</a></li>
                              <li><a href="invoice-software.php">Invoicing</a></li>
                              <li><a href="multi-currency-accounting-software.php">Multi-Currency</a></li>
                              <li><a href="financial-reporting.php">Financial reporting</a></li>
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
