<!DOCTYPE HTML>
<html lang="en" ng-app="giddhWebsite">
<head>
  <meta name="description" content="Giddh Accounting software is made with high level data security with unmatched data encryption algorithm to provide you with hassle free Accounting solutions."/>
  <meta name="keywords" content="Secure Accounting Software, Secure accounting software for small business"/>
  
  <title>Giddh - Secure Online Accounting Software.</title>

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
  

  <section class="blueBg homeContent security">
    <div class="container">
      <div class="row">
        <img src="../assets/images/Cloud Icon.svg" alt="" class="sky-one bn-4">
        <img src="../assets/images/Cloud Icon.svg" alt="" class="sky-two bn-4">
          <h3>Still managing your accounts offline? <br> Go online with Giddh. 
          It gives you high level data security with <br> its unmatched data encryption algorithm.</h3>
          <img src="/assets/images/new/security.png" class="img-responsive"/>
      </div>
    </div>
  </section>
  <section class="oh w100 cmnPd80 ylwBg homeBtmhalf gridBg tallybg">
      <div class="container">
          <div class="row">
              <p class="font-21 text-center">Your data is on AWS cloud, a Linux server and Giddh uses java as backend development. This makes your data much more secure compared to any other local server. Giddh processes your data in an encrypted format, which can’t be accessed even by our developers. Your data could be at high risk if you are on local server. It can be leaked and an onsite disaster will get your data destroyed along with the backups.</p>

              <p class="font-21 text-center m-t-70">Selecting the right <a href="https://giddh.com/gst.php" title="GST">GST</a> <a href="https://giddh.com" title="Accounting Software">Accounting Software</a> with the right server and the right approach is a crucial decision for your business. Giddh is here to ensure that you meet these needs and achieve the best possible solution. For more information on Giddh - a Cloud-based accounting software, contact a member of our team today!</p>
          </div>
    </div>
  </section>
  <!-- home content end -->

  <!-- include footer -->
  <?php include 'footScript.php';?>
  <?php include 'footer.php';?>  
</body>
</html>