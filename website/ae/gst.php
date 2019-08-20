<!DOCTYPE HTML>
<html lang="en" ng-app="giddhWebsite">
<head>
  <meta name="description" content="Giddh GST accounting software to file GST return online. Enjoy automated GST return filling with details like GST return form, tax invoice & GST online payments"/>
  <meta name="keywords" content="bookkeeping software, Accounting softwares, online accounting software, bookkeeping software for small business"/>
  
  <title>GST return filing Automation (Best GST Accounting Software India)</title>

  <?php include 'head.php';?>

</head>

<!-- {oh:geo.country != 'IN'} -->
<body id="page-top" class="gst arvo" ng-controller="homeController as vm">
  
  <!-- <div ng-class="{'other-country': geo.country != 'IN'}" ng-if="geo.country != 'IN'">
    <iframe src="global.html" style="height:100%;width:100%;padding: 0;margin:0"></iframe>
  </div> -->



  <ng-include src="'header.html'"></ng-include>

  <!-- end navigation -->

<!--Banner-->
<div id="gstBanner" class="ylwBg gridBg">
    <div class="container text-center">
    	<img src="/assets/images/new/gst.png" class="img-responsive"/>
        <h3>Goods and Service Tax (GST)</h3>
    </div>
</div>
<!--//Banner-->

<!--try giddh-->
<div id="tryG">
    <div class="container text-center">
    	<p>Don't get confused</p>
        <h3>File your GST RETURN automatically</h3><br>
        
        <a class="trBox" href="signup.php"><span>Try </span><img src="/assets/images/new/giddh-logo-white.png"/></a>
        <p>Cloud Based Accounting Software to File GST return online</p>
    </div>
</div>
<!--//try giddh-->

<!--Filling process-->
<div id="filling">
    <div class="container text-center">
    <div class="col-md-12 mrB3">
	    	<h1>GST Return Filing Process</h1>
	    </div>
    	<div class="col-sm-6 others">
        	<h3>With Others</h3>
            <br>
            <div class="clearfix">
                <div class="ic-32"></div>
                <p>You file GSTR-1 for sales made. (GST due date 10th of every month)</p>
            </div>
            <img src="/assets/images/new/ar-down.png" />
            
            <div class="clearfix">
                <div class="ic-32 view"></div>
                <p>Your buyer views the sales made by you in GSTR-2A</p>
            </div>
            <img src="/assets/images/new/ar-down.png" />
            
            <div class="clearfix">
                <div class="ic-32 tick"></div>
                <p>Your buyer views the sales made by you in GSTR-2A</p>
            </div>
            <img src="/assets/images/new/ar-down.png" />
            
            <div class="clearfix">
                <div class="ic-32 eq"></div>
                <p>Your buyer views the sales marked by you, you can see that in GSTR-1A and approve or disapprove it and file GSTR-3.</p>
            </div>
            <img src="/assets/images/new/ar-down.png" />
            
            <div class="clearfix">
                <div class="ic-32 card"></div>
                <p>Get a GST tax return amount & pay seperately to bank</p>
            </div>
        </div>
        
        <div class="col-sm-6 giddh">
        	<h3>With Giddh</h3>
            <br>
            <div class="clearfix">
                <div class="ic-32 gidd"></div>
                <p>Focus on your business</p>
            </div>
            <img src="/assets/images/new/ar-down.png" />
            <div class="clearfix">
                <div class="ic-32 gidd"></div>
                <p>Focus on your business</p>
            </div>
            <img src="/assets/images/new/ar-down.png" />
            <div class="clearfix">
                <div class="ic-32 gidd"></div>
                <p>Focus on your business</p>
            </div>
            <img src="/assets/images/new/ar-down.png" />
            <div class="clearfix">
                <div class="ic-32 gidd"></div>
                <p>Approve and submit GST return online</p>
            </div>
            <img src="/assets/images/new/ar-down.png" />
            <div class="clearfix">
                <div class="ic-32 gidd"></div>
                <p>Determine & pay the tax amount directly via Giddh <a href="https://giddh.com" title="Accounting Software">Accounting Software</a></p>
            </div>
        </div>
    </div>
</div>
<!--//Filling process-->

<!--question-->
<div id="ques">
    <div class="container text-center">
        <h3>Have question on GST Accounting? Have free discussion <a href="#contact">Contact Us</a></h3>
    </div>
</div>
<!--//question-->

<!--Advantages-->
<div id="adv">
    <div class="container text-center">
    	<h3>Advantages of filing GST Return with us</h3>
    	<div class="col-md-3 col-xs-6">
        	<div class="ic-52 circ"></div>
            <br>100%<br> accurate
        </div>
        <div class="col-md-3 col-xs-6">
        	<div class="ic-52 tick"></div>
            <br>Easy, Secure<br>and Fast
        </div>
        <div class="col-md-3 col-xs-6">
        	<div class="ic-52 ldm"></div>
            <br>Status<br> Tracking
        </div>
        <div class="col-md-3 col-xs-6">
        	<div class="ic-52 lock"></div>
            <br>Full<br> confidential
        </div>
    </div>
</div>

<!--//Advantages-->

<!-- Collaborators -->
<div class="cmnPd80 ylwBg">
    <div class="container text-center">
        <h3 class="mrB5 mrT">GST Return Collaborators</h3>
        <div class="pdT4 clearfix">
            <div class="col-md-4 col-xs-12 collaborator">
                <div>
                    <img src="assets/images/collaborator1.png" alt="jio gst" />
                </div>
            </div>
            <div class="col-md-4 col-xs-12 collaborator bdrL bdrR">
                <div>
                    <img src="assets/images/collaborator2.png" alt="cleartax" />
                </div>
            </div>
            <div class="col-md-4 col-xs-12 collaborator">
                <div>
                    <img src="assets/images/collaborator3.png" alt="tax raahi" />
                </div>
            </div>
        </div>
    </div>
</div>
<!-- //Collaborators -->


  <!-- include footer -->
  <?php include 'footScript.php';?>
  <?php include 'footer.php';?>  
</body>
</html>