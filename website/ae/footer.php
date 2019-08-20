<!-- footer start -->
  <section id="footer">
    <section id="contact">
      <div class="container">
        <div class="row pr">
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
              <i class="glyphicon glyphicon-phone"></i><a class="font-black" href="tel:+917566109897">+91 756 610 9897</a>
              <i class="glyphicon glyphicon-phone"></i><a class="font-black" href="tel:+919977389948">+91 997 738 9948</a>
              <!-- <i class="glyphicon glyphicon-phone"/><a class="font-black" href="tel:18003131911">1800-3131-911 (toll free)</a> -->
            </p>
            <div id="farzi"></div>
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
        </div>
      </div>
    </section>
    <!-- end of contact -->
    <footer class="inconsolata">
      <div>
        <a href="/about.php">About us</a>|
        <a href="http://blog.giddh.com/" target="_Blank">Blog</a>|
        <a href="https://trello.com/b/PArZrnyg/giddh" target="_Blank">Upcoming</a>|
        <a href="/terms.php" onclick="goTo('/terms.php', 'state')" >Terms of use</a>|
        <a href="/privacy.php">Privacy policy</a>|
        <a href="https://www.walkover.in/currentopening.php" target="_Blank">Work with us!</a>|
          <a href="http://faq.giddh.com" target="_Blank">FAQ</a>|
          <a href="/affiliate.php">Affiliate With Us</a>
      </div>

      <small>All right are reserved © 2020 Walkover <a href="https://giddh.com/" target="_Blank">Giddh.com</a></small>
    </footer>
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
</script>

