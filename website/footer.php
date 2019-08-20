<!-- footer start -->
  <section id="footer">
    <section id="contact">
      <div class="container">
          <div class="row">
              <div class="col-sm-8">
                  <div class="row app-download">
                        <div class="col-sm-4 col-xs-6">
                            <h3>Desktop App</h3>
                                <ul class="app_download">
                                    <li>
                                        <a href="https://s3-ap-south-1.amazonaws.com/giddh-app-builds/giddh-{{apkVersion}}.dmg">
                                            <i class="fab fa-apple"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://s3-ap-south-1.amazonaws.com/giddh-app-builds/giddh%20Setup%20{{apkVersion}}.exe">
                                            <i class="fab fa-windows"></i>
                                        </a>
                                    </li>
                                    <!-- <li>
                                        <a href="https://s3.ap-south-1.amazonaws.com/giddhbuildartifacts/giddh-app-6.4.0.tar.gz">
                                            <i class="fab fa-linux"></i>
                                        </a>
                                    </li> -->
                                </ul>
                        </div>
                        <div id="mobile-app" class="col-sm-6 col-xs-6">
                          <h3>Mobile App</h3>
                          <ul class="app_download">
                                  <li>
                                      <a href="https://itunes.apple.com/in/app/giddh-tb/id999743672?mt=8">
                                          <i class="icon icon-ios"></i>
                                      </a>
                                  </li>
                                  <li>
                                      <a href="https://play.google.com/store/apps/details?id=com.giddh.app">
                                          <i class="fab fa-android"></i>
                                      </a>
                                  </li>
                              </ul>
                        </div>
                  </div>
                  <div class="row footerlinks">
                        <div class="col-sm-4 col-xs-6">
                            <ul class="nav navbar-nav footerlink">    
                               <li><a href="/about.php">About Us</a></li>
                               <li><a href="http://blog.giddh.com/" target="_Blank">Blog</a></li>
                               <li><a href="http://faq.giddh.com" target="_Blank">FAQ</a></li>
                               <li><a href="https://trello.com/b/PArZrnyg/giddh" target="_Blank">Upcoming</a></li>
                               <li><a href="/terms.php" onclick="goTo('/terms.php', 'state')">Terms of Use</a></li>
                            </ul>
                        </div>
                        <div class="col-sm-6 col-xs-6">
                            <ul class="nav navbar-nav footerlink">    
                            <li>
                              <!-- <a href="/app/create-invoice">Create Invoice</a> -->
                            </li>
                               <li><a href="/pricing.php">Pricing</a></li>
                               <li><a href="/privacy.php">Privacy Policy</a></li>
                               <li><a href="https://www.walkover.in/currentopening.php" target="_Blank">Work With Us</a></li>
                               <li><a href="/affiliate.php">Affiliate With Us</a></li>
                                </ul>
                        </div>
                  </div>
                  <div class="row footer-contacts">
                    <div class="col-sm-6">
                      <h2>Contact Us</h2>
                      <p>
                      Sales : <a href="mailto:shubhendra@giddh.com">shubhendra@giddh.com</a> <br>
                      Support: <a href="mailto:support@giddh.com"> support@giddh.com</a><br>

                      <i class="fa fa-phone fa-rotate-109"></i><!--<a href="tel: 02238128654"> 022-38128654, </a>-->
                       <a href="tel: 02268210057"> 022-68210057</a>
                      
                       <!-- <i class="fa fa-phone fa-rotate-109"></i><a href="tel:07939593939">079 39 59 3939</a>
                       <i class="fa fa-phone fa-rotate-109 m-l-10"></i><a href="tel:08033037089">080 33 03 7089</a> -->
                      </p>
                      <p class="allright">
                      all rights are reserved 2020 Walkover Giddh.com
                      </p>
                    </div>
                  </div>
              </div>
              <div class="col-sm-4 col-xs-10 contact-area">
                <div class="contact-form">
                  <img src="/assets/images/Footer_Caricature.png" alt="" class="img-caricature">
                  <h2 class="center_heading">Tell us!</h2>
                  <!-- <form class="contact" novalidate name="contactForm">
                    <div class="form-group">
                        <input name="contactForm.name" ng-model="vm.cForm.name" type="text" required class="form-control" placeholder="Your Name">
                    </div>
                    <div class="form-group  m-t-36">
                        <label for="" id="emailid">Email ID</label>
                        <input name="contactForm.email" ng-model="vm.cForm.email" type="email" required class="form-control focus" placeholder="Email ID">
                    </div>
                    <div class="form-group m-t-36">
                        <input class="form-control" type="text" name="contactForm.number" ng-model="vm.cForm.number" ng-min="7" ng-max="12" required valid-number placeholder="Contact No.">
                    </div>
                    <div class="form-group m-t-36">
                        <textarea class="form-control" placeholder="How can our team help?" rows="5" name="contactForm.message" required ng-model="vm.cForm.message"></textarea>
                        <button class="btn btn-send" ng-click="vm.submitForm(cForm)" type="submit" ng-disabled="contactForm.$invalid">Send</button>
                    </div>
                    
                  </form> -->
                  <div id="xZyf" class="talktosale-superform"></div>
                </div>
              </div>
          </div>
        <!-- <div class="row pr">
          <div id="footer-mascot" class="visible-md-block visible-lg-block"></div>
          <div class="col-md-5">
            <h4 class="headerline">Contact Us</h4>
            
            <div class="social">
              <a ng-repeat="list in socialList" href="{{list.url}}">
                <div class="scicn {{list.class}}">{{list.name}}</div>
              </a>
            </div>

            <p>405-406, Capt. C. S. Naidu Arcade, Near Greater</p>
            <p>Kailash Hospital, 10/2 Old Palasia,</p>
            <p>Indore, Madhya Pradesh 452018</p>
            <p class="mrT3">
              Sales : shubhendra@giddh.com<br>
              Support: <a class="font-black" href="mailto:support@giddh.com">support@giddh.com</a><br>
              <i class="glyphicon glyphicon-phone"></i><a class="font-black" href="tel:07939593939">079 39 59 3939</a>
              <i class="glyphicon glyphicon-phone"></i><a class="font-black" href="tel:08033037089">080 33 03 7089</a>
              
            </p>
          <ul class="app_download">
            <h3>Desktop App</h3>
            <li><a href="https://s3-ap-south-1.amazonaws.com/giddh-app-builds/giddh-app-{{apkVersion}}.dmg" target="_Blank" title="mac os"><i class="fab fa-apple"></i></a></li>

            <li><a href="https://s3-ap-south-1.amazonaws.com/giddh-app-builds/giddh-app+Setup+{{apkVersion}}.exe" target="_Blank" title="windows"><i class="fab fa-windows"></i></a></li>

            <li><a href="https://s3.ap-south-1.amazonaws.com/giddhbuildartifacts/giddh-app-6.4.0.tar.gz" target="_Blank" title="linux"><i class="fab fa-linux"></i></a></li>
          </ul>
            <div id="farzi" class="visible-md-block visible-lg-block"></div>
          </div>
          <div class="col-md-5 col-md-offset-2" ng-if="vm.formSubmitted">
            <h4 class="headerline">{{responseMsg}}</h4>
          </div>
          <div class="col-md-5 col-md-offset-2" ng-hide="vm.formSubmitted">
            <h4 class="headerline">Tell us!</h4>
            <form novalidate name="contactForm">
              <div class="row">
                <div class="col-sm-6">
                  <div class="form-group">
                    <label for="name">Full Name *</label>
                    <input name="contactForm.name" ng-model="vm.cForm.name" type="text" required class="form-control">
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="form-group">
                    <label for="message">Contact Number *</label>
                    <input class="form-control" type="text" name="contactForm.number" ng-model="vm.cForm.number" ng-min="7" ng-max="12" required valid-number>
                  </div>
                </div>
              </div>

              <div class="control-group">
                <div class="form-group">
                  <label for="email">Email Address *</label>
                  <input name="contactForm.email" ng-model="vm.cForm.email" type="email" required class="form-control">
                </div>
              </div>

              <div class="control-group">
                <div class="form-group">
                  <label for="message">Message *</label>
                  <textarea name="contactForm.message" required ng-model="vm.cForm.message" class="form-control"></textarea>
                </div>
              </div>

              <div class="control-group">
                <div class="form-group">
                  <div 
                    theme="'light'"
                    ng-model="vm.cForm.myRecaptchaResponse">
                  </div>
                  <div 
                    vc-recaptcha
                    theme="'light'"
                    key="captchaKey"
                    ng-model="vm.cForm.myRecaptchaResponse">
                  </div>
                </div>
              </div>

              <button ng-click="vm.submitForm(cForm)" class="btn  btn-default btn-lg" type="submit" ng-disabled="contactForm.$invalid">Submit</button>

            </form>

          </div>
        </div> -->
      </div>
    </section>
    <!-- end of contact -->
  </section>
  <!-- end of footer -->


<script type="text/javascript">
  

    function goTo (state, type) {
      if(type == "state") {window.location = state
      }else {window.open(state)}
    }

</script>

<script type="text/javascript">
/*-------------------------------------------------------------------*/
/*  FULL SCREEN FIRST SECTION
/*-------------------------------------------------------------------*/
jQuery(document).ready(function($){
'use strict';
  $(window).resize(function(){
    $('#videoBg').css({ 'height' : $(window).height() });
  });
  $(window).trigger('resize');
});
/*-----------------------------------------------------------------------------------*/
/*  SCROLL TO TOP OF PAGE
/*-----------------------------------------------------------------------------------*/
jQuery(document).ready(function($){
'use strict';

  $('.pScroll').click(function(){
    var url = $(this).attr('href');
    $("html, body").animate({ scrollTop: $(url).offset().top}, 500);
    return false;    
  });

  $('.page-scroll').click(function(){
    var url = $(this).attr('href');
    if (window.location.pathname === '/'){
      $("html, body").animate({ scrollTop: $(url).offset().top}, 500);
      return false;
    }
    else{
      window.location.href = window.location.origin+url
    }
  });


//sadik smooth scroller
$('a[rel="relativeanchor"]').click(function(){
    $('html, body').animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top
    }, 500);
    return false;
}); 

  // onwindow scroll
  $(window).scroll(function(){
    
    var scrollTop = $(window).scrollTop();
    
    if( scrollTop > 100 ){
      $('.navbar').addClass('affix')
    } 
    else {
      $('.navbar').removeClass('affix')
    }
    
    // $('.page-scroll').each(function(){
    //   var scrollHref = $(this).attr('href');
    //   if( $(window).scrollTop() > $(scrollHref).offset().top - 100 ) {
    //     $('.page-scroll').removeClass('active');
    //     $(this).addClass('active');
    //   }
    // });
  });
});
$("input[type='email']").focus(function(){
 $("#emailid").css({
   'display':'block',
   'top':'-2px',
   'position':'relative',
 });
 $("input[type='email']").removeAttr('placeholder');
});


// sadique css start
var ul = document.querySelector('#cardList');
for (var i = ul.children.length; i >= 0; i--) {
    ul.appendChild(ul.children[Math.random() * i | 0]);
}
console.log(ul.children.length);
var listPosition = ul.children.length;
console.log("List position = +" + listPosition);
$(document).ready(function () {
    size_li = $("#cardList li").length;
    x = 0;
    numToShow = 3;
    numToIncrement = 3;
    $('#cardList').find('li').hide().slice(x, x + numToShow).show();
});





</script>

