<!DOCTYPE HTML>
<html lang="en" ng-app="giddhWebsite">
  <meta charset="UTF-8">
  <!-- <meta name="description" content=""/>
  <meta name="keywords" content=""/> -->
  
  <title>Giddh Features</title>
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

  <section id="videoBg" class="black-back">
    <!-- <div class="scroll-btn">
      <a href="#feature" class="page-scroll"></a>
    </div> -->
   
    <div class="intro home flex-box-banner slide show container">
    <img src="../assets/images/Cloud Icon.svg" alt="" class="sky-one-01">
        <div class="banner_intro features_banner">
              <h1 class="banner_heading">Access your books anytime anywhere</h1>
              <p class="banner_sub_heading m-t-20">Manage your business finances anytime, from any internet-connected device – phone, laptop or computer.</p>
              <p class="m-t-20">
              <a class="btn btn-primary" id="downloadWindows" href="https://s3.ap-south-1.amazonaws.com/giddhbuildartifacts/giddh-app+Setup+6.4.0.exe">Download Free</a>
                <a class="btn btn-primary" id="downloadMacOS" href="https://s3.ap-south-1.amazonaws.com/giddhbuildartifacts/giddh-app-6.4.0.dmg">Download Free</a>
                <a class="btn btn-primary" id="downloadLinux" href="https://s3.ap-south-1.amazonaws.com/giddhbuildartifacts/giddh-app-6.4.0.tar.gz">Download Free</a>
                <a class="talktosale" data-toggle="modal" data-target="#talkToSales_dialog"><span class="glyphicon glyphicon-earphone"></span>Talk to Sales</a>
            </p>
        </div>
        <div class="right-section">
          <!-- <img src="../assets/images/Cloud Icon.svg" alt="" class="sky-one bn-3"> -->
          <img src="../assets/images/Cloud Icon.svg" alt="" class="sky-two bn-3">
          <img src="../assets/images/feature_banner_big.png" alt="Tally your books with giddh" class="tallybook">
        </div>
    </div>
  </section> <!-- end of videoBg -->
  
  <!-- home content end -->
  <section class="whitebg homeContent" id="feature">
      <div class="container">
              <div class="row m-b-60">
                    <div class="col-sm-12">
                      <h2 class="center_heading">Features to run every part of your business</h2>
                  </div>
              </div>
             <div class="row row-features">
                      <div class="col-sm-6 col-md-4">
                        <div class="thumbnail feature_thumbnail">
                        <a href="gst.php">
                          <img src="../assets/images/GST.svg" alt="Manage GST with Giddh">
                        
                          <div class="caption">
                            <h3>GST Compliance</h3>
                            <p>Compliance is no more a challenge! Create GST compliant invoices & file GST returns.</p>
                          </div>
                          </a>
                        </div>
                      </div>
                      <div class="col-sm-6 col-md-4">
                        <div class="thumbnail feature_thumbnail">
                        <a href="invoice-software.php"><img src="../assets/images/Invoicing-gray.svg" alt="Manage GST with Giddh">
                          <div class="caption">
                            <h3>Invoicing</h3>
                            <p>Get paid faster by creating professional looking invoices and send them automatically.</p>
                          </div>
                          </a>
                        </div>
                      </div>
                      <div class="col-sm-6 col-md-4">
                        <div class="thumbnail feature_thumbnail">
                        <a href="accounting-dashboard.php"><img src="../assets/images/Dashboard.svg" alt="Manage GST with Giddh">
                          <div class="caption">
                            <h3>Dashboard</h3>
                            <p>Get a bird’s eye view of revenue, net-worth of your business, all on one screen.</p>
                          </div>
                          </a>
                        </div>
                      </div>
                     
                      <div class="col-sm-6 col-md-4">
                        <div class="thumbnail feature_thumbnail">
                          <a href="cloud-accounting-software.php"><img src="../assets/images/anywhere_anytime.svg" alt="Manage GST with Giddh">
                          <div class="caption">
                            <h3><a href="cloud-accounting-software.php">Anywhere Anytime</h3>
                            <p>Jump on the cloud and manage your accounting whenever and wherever you want.</p>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-6 col-md-4">
                            <div class="thumbnail feature_thumbnail">
                              <a href="conect-bank-reconcile.php"><img src="../assets/images/reconciliation.svg" alt="Manage GST with Giddh">
                              <div class="caption">
                                <h3>Bank Reconciliation</h3>
                                <p>Giddh makes the confusing work of bank reconciliation easy & simple. Know your cash position anytime.</p>
                            </div>
                            </a>
                            </div>
                      </div>
                      <div class="col-sm-6 col-md-4">
                            <div class="thumbnail feature_thumbnail">
                            <a rel="relativeanchor" href="#mobile-app">
                                <img src="../assets/images/share_data.svg" alt="Manage GST with Giddh">
                              <div class="caption">
                                <h3>Mobile App</h3>
                                <p>The power of automated accounting in your hands now with Giddh’s robust mobile application.</p>
                              </div>
                              </a>
                            </div>
                      </div>
                     
                      <div class="col-sm-6 col-md-4">
                        <div class="thumbnail feature_thumbnail">
                          <a href="financial-reporting.php"><img src="../assets/images/report.svg" alt="Manage GST with Giddh">
                          <div class="caption">
                            <h3>Report & Analysis</h3>
                            <p>Analyse your business’s health using Giddh’s finance reporting tools such as daybook and audit log.</p>
                          </div>
                          </a>
                        </div>
                      </div>
                      <div class="col-sm-6 col-md-4">
                        <div class="thumbnail feature_thumbnail">
                        <a href="import-data.php"><img src="../assets/images/import_excel.svg" alt="Manage GST with Giddh">
                          <div class="caption">
                            <h3>Import Excel Files</h3>
                            <p>Bring in and add your financial data from different excel files easily in Giddh..</p>
                          </div>
                          </a>
                        </div>
                      </div>
                      <div class="col-sm-6 col-md-4">
                          <div class="thumbnail feature_thumbnail">
                          <a href="conect-bank-reconcile.php"><img src="../assets/images/bank.svg" alt="Manage GST with Giddh">
                            <div class="caption">
                              <h3>Linked Bank Account</h3>
                              <p>Link multiple bank accounts and view transaction history whenever and wherever you want.</p>
                            </div>
                            </a>
                          </div>
                      </div>
                     
                      <div class="col-sm-6 col-md-4">
                            <div class="thumbnail feature_thumbnail">
                            <a href="multi-currency-accounting-software.php"><img src="../assets/images/Multi_Currency.svg" alt="Manage GST with Giddh">
                              <div class="caption">
                                <h3>Multi Currency</h3>
                                <p>Serve your international clients by using Giddh’s multi currency solution.</p>
                              </div>
                              </a>
                            </div>
                      </div>

                      <div class="col-sm-6 col-md-4">
                            <div class="thumbnail feature_thumbnail">
                            <a href="javascript:void(0)">
                                <img src="../assets/images/Search.svg" alt="Manage GST with Giddh">
                              <div class="caption">
                                <h3>Search</h3>
                                <p>Search and find whatever you required from wherever you are in Giddh.</p>
                              </div>
                              </a>
                            </div>
                      </div>
                      <div class="col-sm-6 col-md-4">
                          <div class="thumbnail feature_thumbnail">
                              <a href="multi-user-accounting-software.php"><img src="../assets/images/ShareData.svg" alt="Manage GST with Giddh">
                            <div class="caption">
                              <h3>Share Data</h3>
                              <p>Collaborate with your colleagues by easily sharing all your financial data.</p>
                            </div>
                            </a>
                          </div>
                      </div>
                     
                      <div class="col-sm-6 col-md-4">
                            <div class="thumbnail feature_thumbnail">
                            <a href="inventory-management-software.php"><img src="../assets/images/Inventory-gray.svg" alt="Manage GST with Giddh">
                              <div class="caption">
                                <h3>Inventory</h3>
                                <p>Create inventory easily and track inventory expenses. Managing inventory is no more a hassle!</p>
                              </div>
                              </a>
                            </div>
                      </div>
                      <div class="col-sm-6 col-md-4">
                        <div class="thumbnail feature_thumbnail">
                        <a href="https://developers.giddh.com/collection" target="_blank"><img src="../assets/images/API.svg" alt="Manage GST with Giddh">
                          <div class="caption">
                            <h3>API Integration</h3>
                            <p>Use full potential of automation by integrating APIs that automates complex accounting tasks.</p>
                          </div>
                          </a>
                        </div>
                      </div>
                      <div class="col-sm-6 col-md-4">
                        <div class="thumbnail feature_thumbnail">
                        <a href="tallyplusgiddh.php"><img src="../assets/images/ShareData.svg" alt="Manage GST with Giddh">
                          <div class="caption">
                            <h3>Tally Integration</h3>
                            <p>Sync all your financial data from Tally to Giddh and make the switch to cloud accounting.</p>
                          </div>
                          </a>
                        </div>
                      </div>
                     
                      <div class="col-sm-6 col-md-4">
                        <div class="thumbnail feature_thumbnail">
                        <a href="contacts.php">
                        <img src="../assets/images/Automation.svg" alt="Manage GST with Giddh">
                          <div class="caption">
                            <h3>Contact</h3>
                            <p>Get an overview of your customers, vendors and their business information at one place.</p>
                          </div>
                          </a>
                        </div>
                      </div>
                      <div class="col-sm-6 col-md-4">
                        <div class="thumbnail feature_thumbnail">
                            <a href="security.php">
                            <img src="../assets/images/Support.svg" alt="Manage GST with Giddh">
                          <div class="caption">
                            <h3>Security</h3>
                            <p>With bank level security, your financial reports are safe from any unethical breaches.</p>
                          </div>
                          </a>
                        </div>
                      </div>
                      <div class="col-sm-6 col-md-4">
                        <div class="thumbnail feature_thumbnail">
                        <a href="javascri[t:void(0)" data-toggle="modal" data-target="#talkToSales_dialog">
                        <img src="../assets/images/Security.svg" alt="Manage GST with Giddh">
                          <div class="caption">
                            <h3>Support</h3>
                            <p>With a diligent support team, your query is one call or email away from resolution.</p>
                          </div>
                        </a>
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
