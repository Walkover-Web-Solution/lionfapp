<!DOCTYPE HTML>
<html lang="en" ng-app='giddhWebsite'>
<head>
  
  <meta name="description" content="Giddh is Online Cloud Based GST ready accounting software & Bookkeeping software. Giddh accounting makes your data secure and available across globe. "/>
  <meta name="keywords" content="About Giddh"/>
  <title>Giddh ~ About Us</title>
  <?php include 'head.php';?>

</head>
<body  ng-controller="homeController as vm" id="aboutPage" class="unresponsive lightTrans notAffix">
  
  <ng-include src="'header.html'"></ng-include>

  <div id="fullpage">
    <div class="section">
      <img class="img-responsive" src="/assets/images/new/about-banner.jpg" />
      <div class="secBgWrap">
        <div class="secBg secBg-zero">
          <div class="sec-overlay">
            
            <div class="container">
              <div class="row text-center">
                <div class="col-sm-12">
                  <h1 class="brand-heading arvo">It’s okay to make a mess<br>Our experiments have turned into amazing things</h1>
                  <!-- <div id="abtCircle" class="arvo-b">
                    ?
                  </div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- first section -->

    <div class="section" id="nrmTxtWrp">
      <div class="container">
        <div class="row fs24 abtTxt">
          <div class="col-sm-12">
            <p>Around 2 years ago, the idea of Giddh happened. The very first version was created that same time in core PHP, and it took many discussion sessions then. And finally after 1 year, we combined PHP with Laravel framework. There was a time when we completely scraped the earlier version in order to make data security our prime focus.</p>
            <p>Today, as you can see, <a href="https://giddh.com" title="Giddh Accounting"> Giddh</a> runs on JAVA with spring and your data is secure than it was ever before. It took time, but as we look back today, the wait seems worth it.</p>
            <p>It’s been long since people have been avoiding their business numbers, thinking them as maths. Plus, the UI of accounting software’s feels so heavy. Giddh’s UI combines the use of Node.js and Angular.js, to give you a smooth UI experience. <a href="https://giddh.com/gst.php" title="GST Accounting Software">GST Accounting</a> will not be maths anymore.</p>
          </div>
        </div>
      </div>
    </div>
    <!-- second section -->


    <div class="section">
      <img class="img-responsive" src="/assets/images/new/webegan.jpg" />
      <div class="secBgWrap">
        <div class="secBg secBg-one">
          <div class="sec-overlay">
            <div class="container">
              <div class="row text-center">
                <div class="col-sm-12">
                  <h3 class="bigger-text">We Began</h3>
                  <p>Initially, we wanted to introduce everything in Giddh. But after giving a lot of thought, we decided to stick to very basic features. Today, we are focusing only on non-inventory accounting. We will move to other areas once we create disruption in the existing market.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- third section -->
    
    <div class="section">
      <img class="img-responsive" src="/assets/images/new/theteam.jpg" />
      <div class="secBgWrap">
        <div class="secBg secBg-two">
          <div class="sec-overlay">
            <div class="container">
              <div class="row text-center">
                <div class="col-sm-12">
                  <h3 class="bigger-text">The team</h3>
                  <p>Small but mighty as we call them. There was a time when we were only a four people team. Now we are a pack of twelve crazy people who does not stop being curious. Discussions, paper flows, fights over features, we believe in everything insane.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- fourth section -->

    <div class="section">
      <img class="img-responsive" src="/assets/images/new/culture.jpg" />
      <div class="secBgWrap">
        <div class="secBg secBg-three">
          <div class="sec-overlay">
            <div class="container">
              <div class="row text-center">
                <div class="col-sm-12">
                  <h3 class="bigger-text">Culture</h3>
                  <p>You’ll find a 2 AM work freak and a 6 AM early starter at our office. We are not chained by time, but by what the product needs. There is a guy who loves to curse the very core of the feature. There comes a time when it goes like developer vs QA, accountants vs developers, CEO vs his brain.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- five section -->

    <div class="section">
      <img class="img-responsive" src="/assets/images/new/youdecide.jpg" />
      <div class="secBgWrap">
        <div class="secBg secBg-four">
          <div class="sec-overlay">
            <div class="container">
              <div class="row text-center">
                <div class="col-sm-12">
                  <h3 class="bigger-text">You decide</h3>
                  <p>After much changes and thought, we are ready for you guys. We would love to hear about what more you could need to make your accounting life easier. Write to us, call us or leave us a feedback here. We would improve.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- six section -->

    <div class="section" id="nrmTxtWrp1">
      
      <div class="container">
        <div class="row text-center secBg-five">
          <div id="abtMascot" class="visible-md-block visible-lg-block"></div>
          <h2>Revolution is not made by technology, but by people!</h2>
          <p class="arvo-b clearfix">Want to <a href="https://walkover.workable.com/" target="_Blank" class="btn btn-p-bdr btn-lg btn-bdr">work with us</a></p>
        </div>
      </div>
       
    </div>
    <!-- seven section -->

    <div class="section">
      <ng-include src="'footer.html'"></ng-include>
    </div>
    <!-- eight section -->

  </div>
  <!-- end of directive -->
  <?php include 'footScript.php';?>
  <script type="text/javascript">
    jQuery(document).ready(function($){
    'use strict';
      $(window).resize(function(){
        $(".navbar").removeClass('navbar-fixed-top')
        var imgs = $('.section .img-responsive')
        $.each( imgs , function( key, ths ) {
          $(ths).next('div').css({ 
            'height' : $(ths).height(),
            'width' : $(ths).width()
          })
        });
      });
      
    });
    window.onload = function() {
      $(window).trigger('resize');
      $(".navbar").removeClass('navbar-fixed-top')
    }
  </script>
</body>
</html>