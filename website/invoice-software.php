<!DOCTYPE HTML>
<html lang="en" ng-app="giddhWebsite">
  <meta charset="UTF-8">
  <!-- 
  <meta name="keywords" content=""/> -->
  <meta name="description" content="An Online invoicing software to generate your GST compliances invoices and bills. Select the invoice template & change the invoice format according to your business need to get paid faster."/>
  
  <title>Invoice Software | Generate Invoice online to get paid faster by Giddh</title>
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
            <h2 class="banner_heading_new">Smart Accounting Software  <br>for all your Invoicing Needs</h2>
            <p class="banner_sub_heading m-t-15">Creating and sending invoices doesn't have to be a pain.</p>
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
      <img src="../assets/images/inovicing/invoicing-banner.png" alt="Tally your books with giddh" class="cloud-accounting-software-img">
    </div>
  </div>
  <!-- col end -->
  </div>
<!-- row end -->
  </div>
<!-- container end -->
</section> <!-- end of videoBg -->

  
  <!-- home content end -->
  <section class="graybg graybg-reporting homeContent" id="feature">
      <div class="container">
              <div class="row">
                    <div class="col-sm-12">
                      <h2 class="center_heading">Save time with Invoicing Solutions</h2>
                     <div class="middle-width"> <p>Giddh makes the dull job of creating invoices so simple, you'll be amazed how much time you can save to focus on your core business activities. With its beautiful templates and customization options, Giddh is the best invoicing partner for all kinds of business owners.</p></div>
                      <!-- <a class="btn btn-primary btn-lg m-t-70" data-toggle="modal" data-target="#talkToSales_dialog">Talk to Sales</a> -->
                      <a href="https://giddh.com/app/signup" class="btn btn-primary btn-lg m-t-70">Start Your Trial</a>
                  </div>
              </div>
             
             </div>
      
  </section> 
  <section class="whitebg left-text">
  <div class="container">
  <div class="row financial-services">
  <div class="col-sm-6">
  <h2>Professional looking invoices within minutes!</h2>
  <p>You are the real deal, so why not create professional looking invoices that say the same? With a variety of templates and customizations at your disposal, create the best looking invoices for your business and wow your clients.</p>
  </div>
  
  <div class="col-sm-6 text-center">
   <img src="../assets/images/inovicing/invoicing-feature-1.png" alt="">
  </div>
  </div>
  
  <div class="row financial-services">
  <div class="col-sm-6">
   <img src="../assets/images/inovicing/invoicing-feature-2.png" alt="">
  </div>
  <div class="col-sm-6">
  <h2>Stay GST Compliant</h2>
  <p>Stay Goods and Service Tax(GST) compliant by creating invoices that are GST compliant. Giddh invoice templates have fields for HSN or SAC code, GSTIN number, state of business operation which are mandatory for business owners in order to stay compliant.</p>
  </div>
  </div>
  

  <div class="row financial-services">
  <div class="col-sm-6">
  <h2 class="collab">Lock your invoices and move on!</h2>
  <p>Tired of unwanted tampering to your finalized invoices? With Giddh's invoice locking feature, lock your invoices from being edited or deleted once they are finalized.</p>
  </div>
  
  <div class="col-sm-6 text-center">
   <img src="../assets/images/inovicing/invoicing-feature-3.png" alt="">
  </div>
 </div>
   
   <div class="row financial-services">
   <div class="col-sm-6">
   <img src="../assets/images/inovicing/invoicing-feature-4.png" alt="">
  </div>
   
  <div class="col-sm-6">
  <h2 class="collab">Run your business with automation!</h2>
  <p>From setting payment reminders to sending invoices to clients on a recurring basis, you can utilize the complete potential of automation with Giddh! So let Giddh follow-up with customer and focus on your core business activities.</p>
  </div>
 </div>
   
  </div>
  </section> 
  
  <section class="invoicing">
      <div class="container">
              <div class="row m-b-90">
                    <div class="col-sm-12 text-center">
                      <h2 class="center_heading">Other equally important invoicing feature</h2>
                  </div>
              </div>
              <div class="w-900">
             <div class="row row-features">
                      <div class="col-sm-6 col-md-4">
                            <div class="invoice-feature">
                                <img src="../assets/images/inovicing/invoicing-feature-5.png" alt="#">
                              <div class="caption">
                                <p>Add invoice due dates</p>
                              </div>
                            </div>
                      </div>
                      <div class="col-sm-6 col-md-4">
                            <div class="invoice-feature">
                                <img src="../assets/images/inovicing/invoicing-feature-6.png" alt="#">
                              <div class="caption">
                                <p>Customize invoice terms</p>
                               
                              </div>
                            </div>
                      </div>
                      <div class="col-sm-6 col-md-4">
                            <div class="invoice-feature">
                                <img src="../assets/images/inovicing/invoicing-feature-7.png" alt="#">
                              <div class="caption">
                                <p>Preview invoices before sending</p>
                                
                              </div>
                            </div>
                      </div>
                     
                      <div class="col-sm-6 col-md-4">
                            <div class="invoice-feature">
                                <img src="../assets/images/inovicing/invoicing-feature-8.png" alt="">
                              <div class="caption">
                                <p>Choose preferred currency with multi currency option.</p>
                              
                              </div>
                            </div>
                      </div>
                      <div class="col-sm-6 col-md-4">
                            <div class="invoice-feature">
                                <img src="../assets/images/inovicing/invoicing-feature-9.png" alt="#">
                              <div class="caption">
                                <p>Automatic updates once an invoice has been paid</p>
                              </div>
                            </div>
                      </div>
                      <div class="col-sm-6 col-md-4">
                            <div class="invoice-feature">
                                <img src="../assets/images/inovicing/invoicing-feature-10.png" alt="">
                              <div class="caption">
                                <p>Always on the go? Create Invoices without logging in!</p>
                                
                              </div>
                            </div>
                      </div>
                      
                      <div class="col-sm-12 text-center">
                      <!-- <a class="btn btn-primary btn-lg" data-toggle="modal" data-target="#talkToSales_dialog">Create Invoice</a> -->
                      <a href="https://giddh.com/app/signup" class="btn btn-primary btn-lg m-t-70">Try Now</a>
                      </div>
               </div>
               </div>
             </div>
      
  </section>
  
  
  
  <section class="graybg p-t-70">
    <div class="container area-flex  blog_center_new">
      <div class="center-divbox">
      <div class="pioneer"><img src="../assets/images/inovicing/invoicing-blog.png" alt=""></div>
      <span class="blog-reporting">3 Most common invoicing mistakes <br>
you might be making (and their fixes)<br>

      <a href="https://blog.giddh.com/3-most-common-invoicing-mistakes-you-might-be-making-and-their-fixes-bd179ca76b21" target="_blank">Read more...</a>
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

                       <div class="footer-meta-heading"><span> People interested in <h1> invoice software </h1> also looked at</span></div>

                       <div class="clearfix text-center mrT2">
                        <a class="all-features" href="features.php">All features</a>
                          <ul id="cardList">
                            <li><a href="cloud-accounting-software.php">Cloud accounting</a></li>
                            <li><a href="accounting-dashboard.php">Dashboard</a></li>
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
