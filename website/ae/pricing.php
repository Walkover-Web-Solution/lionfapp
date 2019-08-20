<!DOCTYPE HTML>
<html lang="en" ng-app='giddhWebsite'>
<head>
  <meta name="description" content="Giddh is an Affordable accounting solution for VAT Compliance in GCC.  Get a Giddh Accounting solution at best prices; Signup Now for free demo."/>
  <meta name="keywords" content="bookkeeping software, Accounting softwares, best accounting software"/>
  <title>Affordable VAT Compliance solution in UAE</title>
  <?php include 'head.php';?>
</head>
<body ng-controller="homeController as vm" id="page-top">

  <ng-include src="'header.html'"></ng-include>

  <section id="videoBg" class="intro pricing">
    <div class="intro-body">
      <div class="container">
        <div class="row">
          <div class="col-sm-12">
            <h1 class="brand-heading arvo">Don’t expect long tables here.<br> We are flat <span>AED 100 a month.</span></h1>
            <figure>
              <img class="img-responsive" src="/ae/assets/images/Pricing-Icon-01.png" alt="business accounting software">
              <!-- <h3 class=""><span class="pClr head3">Free</span>, If Revenue is less than 1 Lac per month.</h3> -->
            </figure>
            <div class="text-center pBnrBtm clearfix">
              <span class="head3 pClr">Still Confused?</span>
              <a href="#footer" class="pScroll btn btn-p-bdr btn-lg btn-bdr">Talk to us</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section> 

  <section class="blueBg cmnPd100 pricing">
    <div class="container">
      
      <div class="row">
        <div class="col-sm-4">
          <div class="thumbnail">
            <img src="/assets/images/new/ledger-sharing.png" alt="account software">
            <div class="caption">
              <h3>Ledger Sharing</h3>
            </div>
          </div>
        </div>

        <div class="col-sm-4">
          <div class="thumbnail">
            <img src="/assets/images/new/business-reports.png" alt="best small business accounting software">
            <div class="caption">
              <h3>Business Reports</h3>
            </div>
          </div>
        </div>

        <div class="col-sm-4">
          <div class="thumbnail">
            <img src="/assets/images/new/multiple-person-entry.png" alt="simple accounting software">
            <div class="caption">
              <h3>Multiple Person Entry</h3>
            </div>
          </div>
        </div>
      </div>
      
      <div class="row text-center mrT4">
        <div class="col-sm-12">
          <h2 class="arvo-b bigger-text mrB5 pClr">24/7 instant support</h2>
          <a onclick="location.href='/app/signup'" id="pBtn" class="btn btn-primary btn-lg arvo">Try Now</a>
        </div>
      </div>

    </div>
  </section>

  <ng-include src="'footer.html'"></ng-include>
  
  <?php include 'footScript.php';?>

</body>
</html>
