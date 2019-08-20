<!DOCTYPE HTML>
<html lang="en" ng-app='giddhWebsite'>
<head>
  <meta name="description" content="It’s easy to integrate Tally Solutions with Giddh accounting software, now you may easily manage your accounting needs Online. Easy and Secure way for analysis of alerts, graphs and much more. Enhance your experience with Giddh’s Tally Addon."/>
  <meta name="keywords" content="Tally, Tally Solutions, Tally Accounting Software"/>
  <title>Integrate Tally Solutions with Giddh Accounting Software</title>
  <?php include 'head.php';?>
</head>
<!-- {oh:geo.country != 'IN'} -->
<body id="page-top" class="tally_page about-section-body lightTrans" ng-controller="homeController as vm">
  
  <!-- <div ng-class="{'other-country': geo.country != 'IN'}" ng-if="geo.country != 'IN'">
    <iframe src="global.html" style="height:100%;width:100%;padding: 0;margin:0"></iframe>
  </div> -->



  <!-- <ng-include src="'header.html'"></ng-include> -->
  <?php include 'header.php';?>  
  <section id="" class="pr black-back hide-xs">
    <div class="home vh100">
      <div class="col-md-6 col-xs-12 col-sm-6 height100 bg_light_blue intro_col pr">
        <div class="introHead pr"><h1 class="text-right text_blue intro_title clearfix pr">TALLY</h1> <img src="assets/images/plus_icon.png" alt="accounting" class="plus_ico" /></div>
        <div class="clearfix text-right vtext_middle">
          <div class="middle_cell">
          <h3>Graphs, Analytics,</h3>
          <h3>Alerts, Automations and more...</h3>
        </div>
        </div>
        <div class="col-md-8 center-block mrT6 pdT2" style="margin-bottom: 2px;">
          <img src="assets/images/tally.png" class="img-responsive pull-right" alt="accounting" />
        </div>
            <img src="assets/images/plane_ico.svg" alt="" class="img_plane">
      </div>

      <div class="col-md-6 col-xs-12 col-sm-6 height100 bg_dark_blue intro_col">
        <h1 class="text-left intro_title witClr">GIDDH</h1>

        <div class="clearfix text-left vtext_middle">
          <div class="middle_cell">
            <a class="btn btn-lg btn-medium" href="http://faq.giddh.com/tally/how-to-sync-your-data-from-tally-to-giddh" target="_blank">How it works</a>
          </div>
        </div>
        <div class="col-md-8 center-block mrT6 pdT2">
          <img src="assets/images/giddh_dashboard.png" class="img-responsive" alt="accounting" />
        </div>
      </div>

    </div>

  </section> <!-- end of web page -->

  <!-- responsive design -->
  <section id="" class="pr black-back bg_dark_blue hide-sm pdT4">
    <div class="intro home">

    	<div class="col-xs-10 mrT6 text-center center-block">
	         <img src="assets/images/giddh_dashboard.png" class="img-responsive pdT2 pdB2" alt="accounting" />
    		<h1 class="text-center intro_title witClr">GIDDH</h1>
    	</div>
    	<div class="col-xs-10 text-center mrT2 mrB2 center-block">
    		<img src="assets/images/plus_icon.png" alt="accounting" class="plus_ico" style="max-width: 40px;" />
    	</div>
    	<div class="col-xs-10 text-center center-block">
		<h1 class="intro_title clearfix pr">TALLY</h1>
          <img src="assets/images/tally.png" class="img-responsive pdT2" alt="accounting" />
    	</div>

      <div class="col-xs-10 text-center center-block mrT4 mrB5 pdB4 pr">
        <div class="clearfix  mrB4">
          <div class="witClr">
          <h3>Graphs, Analytics,</h3>
          <h3>Alerts, Automations and more...</h3>
        </div>
        </div>
		<a class="btn btn-primary btn-lg" href="http://faq.giddh.com/tally/how-to-sync-your-data-from-tally-to-giddh" target="_blank">How it works</a>
      </div>

    </div>
  </section>

  <!-- tally plugin -->
  <section class="oh w100 cmnPd80 ylwBg homeBtmhalf gridBg tallybg">
    <div class="container adjust-width">
      <div class="row  text-center">
        <div class="col-sm-12">
        	<h2>Download the Plugin</h2>
          <a href="https://s3.ap-south-1.amazonaws.com/giddhbuildartifacts/Walkover+Prod.tcp" target="_blank" class="btn btn-space btn-secondary btn-lg">Plugin</a>
        </div>
      </div>
    </div>
  </section>
	<!-- end of tally plugin -->

  <!-- include footer -->
  <!-- <ng-include src="'footer.html'"></ng-include> -->

  <?php include 'footScript.php';?>
  <?php include 'footer.php';?>  


</body>
</html>