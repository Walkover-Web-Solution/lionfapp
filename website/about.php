<!DOCTYPE HTML>
<html lang="en" ng-app='giddhWebsite'>
<head>
  
  <meta name="description" content="Giddh is Online Cloud Based GST ready accounting software & Bookkeeping software. Giddh accounting makes your data secure and available across globe. "/>
  <meta name="keywords" content="About Giddh"/>
  <!-- <meta http-equiv=“Content-Type” content=“text/html; charset=utf-8"> -->
  <title>Giddh ~ About Us</title>
  <?php include 'head.php';?>

  <link href="/styles/new-style.css" rel="stylesheet">

  
<style>
      html, body{
            overflow-x:hidden;
      }
</style>
</head>
<body  ng-controller="homeController as vm" id="aboutPage" class="about-section-body lightTrans">
  
  <!-- <ng-include src="'about-header.html'"></ng-include> -->
  <!-- <ng-include src="'header.html'"></ng-include> -->
<?php include 'header.php';?>  
 <section class="cus-about-sec">
    <div class="container-fluid">
        <div class="row">
            <div class="about-head">
                  <div class="container">
                        <div class="row">
                            <div class="col-md-12">
                                          <div class="area-flex center">
                                          <ul class="nav nav-tabs nav-tabs-about" role="tablist">
                                                  <li role="presentation" ng-class="{'active':vm.selectedTab === 'about'}"><a href="javascript:void(0)" aria-controls="about" role="tab" data-toggle="tab"  ng-click="vm.selectedTab = 'about'">About Us</a></li>
                                                  <li role="presentation" ng-class="{'active':vm.selectedTab === 'values'}"><a href="javascript:void(0)" aria-controls="values" role="tab" data-toggle="tab"  ng-click="vm.selectedTab = 'values'">Our Values</a></li>
                                                  <li role="presentation" ng-class="{'active':vm.selectedTab === 'principle'}"><a href="javascript:void(0)" aria-controls="principle" role="tab" data-toggle="tab"  ng-click="vm.selectedTab = 'principle'">Leadership Principles</a></li>

                                                  <li role="presentation" ng-class="{'active':vm.selectedTab === 'team'}" ><a href="javascript:void(0)" aria-controls="settings" role="tab" data-toggle="tab"  ng-click="vm.selectedTab = 'team'">The Team</a></li>
                                              </ul>

                                        
                                          </div>
                            </div>
                        </div>
                  </div>
            </div>
          <div class="tab-content about-tab-content">
            <!-- about section -->
            <div class="about-content tab-pane active" id="about" ng-class="{'active':vm.selectedTab == 'about'}">
                  <div class="about-content-head">
                      <div class="container area-flex">
                            <h1>About Us</h1>
                            <span>Pioneering the Automation Revolution in Accounting!</span>
                      </div>
                  </div>
                    <div class="about-content-body">
                      <div class="about" >
                                <div class="container">
                                            <div class="tab-content">
                                                    <div class="about-text"><span class="company">Giddh</span> is a team with members who have accounting running in their blood, be it a member of development team or sales team. We are working relentlessly to push forward the automation revolution in bookkeeping industry with our tech solutions.<br><br>
                                                     Since years Indian bookkeeping industry had fallen behind and failed to embrace the technological evolution. To change that once and forever, we have taken the initiative to keep adapting to the latest and greatest technologies making accounting simpler, faster and more secure.<br><br>
                                                      <a><i>As farsighted as a vulture:</i></a><br>
                                                       As the name suggests, Giddh provides you with analytical tools that can help you to keep a sharp vision on your accounts so that you can invest your time on analysing them.
                                                        We believe in making accounting not only automated but simple like an elementary task by creating a product that can be used by everyone; from a simple web user who wants to simplify his accounting to a highly proficient business owners looking to scale up, above and ahead.</div>
                                            </div>
                                </div>
                            </div>
                     
                    <div class="product">
                      <div class="container">
                        <div class="row">
                              <div class="col-sm-12">
                                    <h1>A product from Walkover</h1>
                              </div>
                              <div class="col-sm-12 text-align-center">
                              <img src="../assets/images/logo-big.svg" alt="" class="walkover-logo display-small-cs-top">
                                    <p class="product-info">
                                        Walkover is a closely knit team of technology enthusiasts with a reputation for adding significant value to a range of products for more than 8 years. We combine our technical expertise with business awareness to enable innovation that helps our clients to have a competitive edge.<br><br>
                                         We are transforming everyday workflow and businesses by building products that simplify processes. Our unique technology-based products has served over 100 clients to run more innovative and efficient businesses.
                                    </p>
                                    <img src="../assets/images/logo-big.svg" alt="" class="walkover-logo display-large-sc bottom">
                              </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 col-sm-6 col-xs-6 msg91">
                            <a href="http://www.msg91.com/" target="_blank" class="website-link"></a>
                                          <div class="thumbnail">
                                                <img src="../assets/images/msg-logo-big.svg" alt="msg" class="msg">
                                                <div class="caption">
                                                      <p>
                                                      MSG91 is the flagship product under the Walkover umbrella with over 8 years of experience making it one of the best messaging solution companies. With its easily configurable APIs and a global reach of over 90 countries, MSG91 provides its clients with messaging & mobile solutions whenever they want, where ever they are.
                                                      </p>
                                                    
                                                      <a href="http://www.msg91.com/" target="_blank" class="know-more-link">Know More</a>
                                                </div>
                                          </div>

                              </div>
                            
                            <div class="col-md-6 col-sm-6 col-xs-6 viasocket">
                            <a href="http://www.viasocket.com/" target="_blank" class="website-link"></a>
                              <div class="thumbnail pull-right">
                                  <img src="../assets/images/socket-logo-big.svg" class="socket" alt="socket">
                                  <div class="caption">
                                    <p>
                                        Socket is a multiple API integration and automation tool that makes data flow faster and easier than ever to automate the services. It is the youngest and the smartest member in the family of Walkover products having its own API marketplace that makes developers’ lives easier and adds more power to your business.
                                    </p>
                                    <a href="http://www.viasocket.com/" target="_blank">Know More</a>
                                  </div>
                              
                              </div>
                            </div>
                           
                        </div>
                      </div>
                    </div>
                    </div>
            </div>
            <!-- about end -->
            <!-- our values -->
            <div class="about-content tab-pane" id="values" ng-class="{'active':vm.selectedTab == 'values'}">
                  <div class="about-content-head">
                      <div class="container area-flex">
                            <h1>Our Values</h1>
                            <span>Our values are the essence of our identity and summarises the<br> purpose of our existence.</span>
                      </div>
                  </div>
                    <div class="about-content-body">
                      <div class="about fixabout" id="about-company">
                                <div class="container">
                                            <div class="tab-content">
                                                <!-- start secondry tabs -->
                                                <div>
                                                        <ul class="nav nav-tabs nav-tabs-values" role="tablist">
                                                          <li role="presentation"><a href="#custComFirst" aria-controls="custComFirst" data-toggle="tab" class="activeValue">
                                                           <span class="icon icon-custcome"></span>     
                                                          Customers Come First</a></li>
                                                          <li role="presentation"><a href="#breakBound" aria-controls="breakBound" data-toggle="tab">
                                                          <span class="icon icon-setbacks"></span>       
                                                          Setbacks to Break Boundaries</a></li>
                                                          <li role="presentation"><a href="#impoGoals" aria-controls="impoGoals" data-toggle="tab">
                                                          <span class="icon icon-impossible"></span> 
                                                          We Set Impossible Goals</a></li>
                                                          <li role="presentation"><a href="#peoplePower" aria-controls="peoplePower" data-toggle="tab">
                                                          <span class="icon icon-peoplepower"></span>     
                                                          People are our Power</a></li>
                                                          <li role="presentation"><a href="#peopleFocus" aria-controls="peopleFocus" data-toggle="tab">
                                                          <span class="icon icon-alwaysbefore"></span>      
                                                          We Focus on Why & How?</a></li>
                                                          <li role="presentation"><a href="#alwaysBefore" aria-controls="alwaysBefore" data-toggle="tab">
                                                          <span class="icon icon-focus"></span>          
                                                          Always We Before Me</a></li>
                                                          <li role="presentation"><a href="#doNotSettle" aria-controls="doNotSettle" data-toggle="tab">
                                                          <span class="icon icon-settle"></span>
                                                                We Don’t Settle</a></li>
                                                          <li role="presentation"><a href="#empowerFut" aria-controls="empowerFut" data-toggle="tab">
                                                          <span class="icon icon-empower"></span>      
                                                          We Empower The Future</a></li>
                                                          <li role="presentation"><a href="#transparency" aria-controls="transparency" data-toggle="tab">
                                                          <span class="icon icon-transparency"></span>         
                                                          Transparency and Honesty</a></li>
                                                        </ul>
                                                <!-- end secondry tabs -->
                                                  <div>
                                                  </div>
                                            </div>
                                </div>
                       </div>
                  </div>
                                <!-- tab-content -->
                     <div class="tab-content fixed-tab-content">
                                      <div id="custComFirst">
                                        <div class="product values bg-white">
                                          <div class="container">
                                            <div class="row">
                                            <div class="col-sm-12">
                                                        <h1 class="hidden-xs">Customers Come First</h1>
                                                  </div>
                                                  <div class="col-sm-12 d-flex">
                                                        <p class="product-info">
                                                        We are the leaders that solve problems from the perspective of the customer's experiences. Before wearing our corporate jacket, we wear our customer’s shoes to provide them the solutions they need.
                                                        <h1 class="visible-xs">Customers Come First</h1>
                                                        </p>
                                                       <img src="../assets/images/about/customer.svg" alt="" class="customer-big">
                                                      
                                                  </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    <div id="breakBound" class="target">
                                          <div class="product values bg-gray">
                                                <div class="container">
                                                      <div class="row">
                                                      <div class="col-sm-12">
                                                                  <h1 class="hidden-xs">Embracing Setbacks to Break Boundaries</h1>
                                                            </div>
                                                            <div class="col-sm-12 d-flex">
                                                                  <p class="product-info">
                                                                        Everytime we hit a wall of setback, we push ourselves harder to create new milestones and leave a legacy behind. Once a setback is experienced, we strive on with a deeper understanding of what is need to be done to eventually succeed. 
                                                                        <h1 class="visible-xs">Embracing Setbacks to Break Boundaries</h1>
                                                                  </p>
                                                                  <img src="../assets/images/about/Boundaries.svg" alt="" class="customer-big">
                                                            </div>
                                                      </div>
                                                </div>
                                          </div>
                                    </div>
                                  
                                      <div id="impoGoals">
                                            <div class="product values bg-white">
                                                <div class="container">
                                                  <div class="row">
                                                        <div class="col-sm-12">
                                                              <h1 class="hidden-xs">We Set Impossible Goals</h1>
                                                        </div>
                                                        <div class="col-sm-12 d-flex">
                                                              <p class="product-info">
                                                              We are fueled with a healthy disrespect for the impossible. We make sure to never get distracted with trying to improve things by 10% when we have the certainty and the ability to improve them by 10x.
                                                              <h1 class="visible-xs">We Set Impossible Goals</h1>
                                                              </p>
                                                              <img src="../assets/images/about/Goals.svg" alt="" class="customer-big">
                                                        </div>
                                                  </div>
                                                </div>
                                              </div>
                                      </div>
                                      <div id="peoplePower">
                                            <div class="product values bg-gray">
                                                <div class="container">
                                                  <div class="row">
                                                        <div class="col-sm-12">
                                                              <h1 class="hidden-xs">People are our Power</h1>
                                                        </div>
                                                        <div class="col-sm-12 d-flex">
                                                              <p class="product-info">
                                                              We know that technology is merely an enabler to challenge boundaries and true success is achieved by a honest, efficient and fearless individuals. We make sure to never stop in our pursuit of bringing out the best in people.
                                                              <h1 class="visible-xs">People are our Power</h1>
                                                              </p>
                                                              <img src="../assets/images/about/hands.svg" alt="" class="customer-big">
                                                        </div>
                                                  </div>
                                                </div>
                                              </div>
                                      </div>
                                      <div id="peopleFocus">
                                            <div class="product values bg-white">
                                                <div class="container">
                                                  <div class="row">
                                                        <div class="col-sm-12">
                                                              <h1 class="hidden-xs">We Focus on ‘Why?’ & ‘How?’</h1>
                                                        </div>
                                                        <div class="col-sm-12 d-flex">
                                                              <p class="product-info">
                                                              Our philosophy revolves around two important questions -’Why’ and ‘How’. Asking ‘Why’ to ourselves and those around us gives the purpose for our actions and ‘How’ gives us the shortest path to execute them.
                                                              <h1 class="visible-xs">We Focus on ‘Why?’ & ‘How?’</h1>
                                                              </p>
                                                              <img src="../assets/images/about/Focus.svg" alt="" class="customer-big">
                                                        </div>
                                                  </div>
                                                </div>
                                              </div>
                                      </div>
                                      <div id="alwaysBefore">
                                              <div class="product values bg-gray">
                                                  <div class="container">
                                                    <div class="row">
                                                          <div class="col-sm-12">
                                                                <h1 class="hidden-xs">Always We Before Me</h1>
                                                          </div>
                                                          <div class="col-sm-12 d-flex">
                                                                <p class="product-info">
                                                                We believe in collaborating both inside and outside the organization to maximize our shared knowledge and bring great value to our customers. We are self-centred in our preparation, but selfless in our execution.
                                                                <h1 class="visible-xs">Always We Before Me</h1>
                                                                </p>
                                                                <img src="../assets/images/about/man-circle.svg" alt="" class="customer-big">
                                                          </div>
                                                    </div>
                                                  </div>
                                                </div>
                                      </div>
                                      <div  id="doNotSettle">
                                            <div class="product values bg-white">
                                                <div class="container">
                                                  <div class="row">
                                                        <div class="col-sm-12">
                                                              <h1 class="hidden-xs">We Don’t Settle</h1>
                                                        </div>
                                                        <div class="col-sm-12 d-flex">
                                                              <p class="product-info">
                                                              We don’t settle for anything less than excellent and extraordinary in every group of our organization and possess the honesty to admit when we’re wrong and the courage to change, evolve and adapt according to the situation.
                                                              <h1 class="visible-xs">We Don’t Settle</h1>
                                                              </p>
                                                              <img src="../assets/images/about/Settle.svg" alt="" class="customer-big">
                                                        </div>
                                                  </div>
                                                </div>
                                              </div>
                                      </div>
                                      <div id="empowerFut">
                                            <div class="product values bg-gray">
                                                <div class="container">
                                                  <div class="row">
                                                        <div class="col-sm-12">
                                                              <h1 class="hidden-xs">We Empower The Future</h1>
                                                        </div>
                                                        <div class="col-sm-12 d-flex">
                                                              <p class="product-info">
                                                              We focus on ways by which our organization can harness the power of technology to transform today which can create a better & brighter tomorrow in the most sustainable way. 
                                                              <h1 class="visible-xs">We Empower The Future</h1>
                                                              </p>
                                                              <img src="../assets/images/about/Future.svg" alt="" class="customer-big">
                                                        </div>
                                                  </div>
                                                </div>
                                              </div>
                                      </div>
                                      <div id="transparency">
                                            <div class="product values bg-white">
                                                <div class="container">
                                                  <div class="row">
                                                        <div class="col-sm-12">
                                                              <h1 class="hidden-xs">Transparency and Honesty</h1>
                                                        </div>
                                                        <div class="col-sm-12 d-flex">
                                                              <p class="product-info">
                                                              We apply due care in maintaining transparency in our work by providing honest, accurate and impartial services to our clients. We avoid tricks, hidden agendas and make information accessible to our employees and our clients alike.
                                                              <h1 class="visible-xs">Transparency and Honesty</h1>
                                                              </p>
                                                              <img src="../assets/images/about/Transparency.svg" alt="" class="customer-big">
                                                        </div>
                                                  </div>
                                                </div>
                                              </div>
                                      </div>
                                    </div>           
                            </div>
                    
                           
                  
                    </div>
           
            <!-- our values end -->

              <!-- our principle start -->
              <div class="about-content tab-pane" id="principle" ng-class="{'active':vm.selectedTab == 'principle'}">
                  <div class="about-content-head">
                      <div class="container area-flex">
                            <h1 class="twoline">Leadership Principles</h1>
                            <span>The difference between success and failure is not the amount of money or resources you have, but how a leader leads his team.<br><a class="leader"> A GOOD LEADER ALWAYS:</a></span>
                      </div>
                  </div>
                    <div class="about-content-body">
                    <div class="about fixedprinciple">
                                <div class="container">
                                            <div class="tab-content">
                                                <!-- start secondry tabs -->
                                                <div>
                                                      <ul class="nav nav-tabs nav-tabs-values  nav-tab-principle navs-principle">
                                                            <li>
                                                                  <a href="#Nurture" data-toggle="tab" class="activepr">
                                                                  <span class="icon icon-Nurtures"></span>
                                                                        Nurtures Collaboration</a>
                                                            </li>
                                                            <li><a href="#lcommunication"  data-toggle="tab">
                                                            <span class="icon icon-Communication"></span>
                                                            Leads through Communication</a></li>
                                                            <li><a href="#lexample"  data-toggle="tab">
                                                            <span class="icon icon-leadsByExample"></span>
                                                            Leads By Example</a></li>
                                                            <li><a href="#consults" data-toggle="tab">
                                                            <span class="icon icon-consult"></span>
                                                            Consults and Delegates</a></li>
                                                            <li><a href="#courageous" data-toggle="tab">
                                                            <span class="icon icon-Courageous"></span>
                                                            Is Courageous</a></li>
                                                            <li><a href="#integrity" data-toggle="tab">
                                                            <span class="icon icon-integrity"></span>
                                                            Adds Integrity</a></li>
                                                            <li><a href="#serves" data-toggle="tab">
                                                            <span class="icon icon-ServeGood"></span>
                                                            Serves for the Greater Good</a></li>
                                                            <li><a href="#process" data-toggle="tab">
                                                            <span class="icon icon-process"></span>
                                                            Defines & Creates Processes</a></li>
                                                            <li><a href="#evolve" data-toggle="tab">
                                                            <span class="icon icon-adaptToEvolve"></span>
                                                            Adapts to Evolve</a></li>
                                                      </ul>
                                              </div>
                                           </div>
                               </div>
            </div>
                               <div class="container-fluid fixedPrContainer">
                                    <div class="product p-t-0 p-b-0">
                                    <div class="row" id="Nurture">
                                          <div class="figure bgNurture">
                                                <div class="container">
                                              
                                                      <div class="topSection">
                                                                  <div class="container-principle">
                                                                        <p class="left">
                                                                              <span class="icon icon-Nurtures"></span>
                                                                              <span class="heading">Nurtures <br>Collaboration</span>
                                                                              </p>
                                                                        <p class="right multiline-ellipsis">
                                                                        <span class="heading insideright">Nurtures Collaboration</span>
                                                                              A good leader always nurtures collaboration and acts as an active
                                                                              part in the process of co-creation with his team and the entire
                                                                              ecosystem. A bad leader fails to grasp the importance of
                                                                              collaboration and thus fails himself and his team.
                                                                        </p>
                                                                  </div>
                                                      </div> 
                                              </div>    
                                          </div>
                                    </div>
                                    <div class="row" id="lcommunication">
                                          <div class="figure bgLeads">
                                                <div class="container">
                                                            <div class="topSection">
                                                            <div class="container-principle">
                                                                  <p class="left">
                                                                        <span class="icon icon-Communication"></span>
                                                                        <span class="heading">Leads through<br> Communication</span>
                                                                        </p>
                                                                  <p class="right multiline-ellipsis">
                                                                  <span class="heading insideright">Leads through Communication</span>
                                                                  A Good leader creates an environment that promotes honest and open communications without the fear of judgement. A bad leaders creates an hostile environment that restricts open lines of communication.
                                                                  </p>
                                                            </div>
                                                            </div> 
                                                </div>    
                                          </div>
                                    </div>
                                    <div class="row" id="lexample">
                                          <div class="figure bgLeadsExa">
                                                <div class="container">
                                                            <div class="topSection">
                                                            <div class="container-principle">
                                                                  <p class="left">
                                                                        <span class="icon icon-leadsByExample"></span>
                                                                        <span class="heading">Leads By Example</span>
                                                                        </p>
                                                                  <p class="right multiline-ellipsis">
                                                                  <span class="heading insideright">Leads By Example</span>
                                                                        A good leader always leads by example. He is the first to take actions, sets milestones and then encourages his team follow. A bad leader is passive and fails to take initiative.
                                                                  </p>
                                                                  </div>
                                                            </div>  
                                                </div>   
                                          </div>
                                    </div>
                                    <div class="row" id="consults">
                                          <div class="figure bgConsult">
                                                <div class="container">
                                                            <div class="topSection">
                                                            <div class="container-principle">
                                                                  <p class="left">
                                                                        <span class="icon icon-consult"></span>
                                                                        <span class="heading">Consults and<br> Delegates</span>
                                                                        </p>
                                                                  <p class="right multiline-ellipsis">
                                                                  <span class="heading insideright">Consults and Delegates</span>
                                                                  A good leader has the ability to seek consultation from subordinates and also has the ability to assign tasks to the right employees taking their skills into account. A bad leader is a bad judge of skill set and delegates poorly.
                                                                  </p>
                                                            </div>
                                                            </div> 
                                                </div>    
                                          </div>
                                    </div>
                                    <div class="row" id="courageous">
                                          <div class="figure bgCouragious">
                                                <div class="container">
                                                      <div class="topSection">
                                                      <div class="container-principle">
                                                            <p class="left">
                                                                  <span class="icon icon-Courageous"></span>
                                                                  <span class="heading">Is Courageous</span>
                                                                  </p>
                                                            <p class="right multiline-ellipsis">
                                                                  <span class="heading insideright">Is Courageous</span>
                                                                  A good leader has the strength of self to act with intention on behalf of the common good. A bad leader does not possess the courage to take a stand during adversity.
                                                            </p>
                                                      </div>
                                                      </div>     
                                                </div>
                                          </div>
                                    </div>
                                    <div class="row" id="integrity">
                                          <div class="figure bgIntergrity">
                                                <div class="container">
                                                      <div class="topSection">
                                                      <div class="container-principle">
                                                            <p class="left">
                                                                  <span class="icon icon-integrity"></span>
                                                                  <span class="heading">Adds Integrity</span>
                                                                  </p>
                                                            <p class="right multiline-ellipsis">
                                                                  <span class="heading insideright">Adds Integrity</span>
                                                                  A good leader has moral courage, ethical strength, and trustworthiness. He is able to keep promises and fulfill expectations. A bad leader lacks integrity that inspires his team to take ethical measures in all their actions.
                                                            </p>
                                                      </div>
                                                      </div> 
                                                </div>    
                                          </div>
                                    </div>
                                    <div class="row" id="serves">
                                          <div class="figure bgServes">
                                                <div class="container">
                                                      <div class="topSection">
                                                      <div class="container-principle">
                                                            <p class="left">
                                                                  <span class="icon icon-ServeGood"></span>
                                                                  <span class="heading">Serves for the<br> Greater Good</span>
                                                                  </p>
                                                            <p class="right multiline-ellipsis">
                                                            <span class="heading insideright">Serves for the Greater Good</span>
                                                                  A good leader shows commitment that extends beyond one’s own self interest; personal humility for the sake of a greater cause. A bad leader is self serving and does not believe in serving for a greater good.
                                                            </p>
                                                      </div>
                                                      </div>  
                                                </div>   
                                          </div>
                                    </div>
                                    <div class="row" id="process">
                                          <div class="figure bgDefine">
                                                <div class="container">
                                                      <div class="topSection">
                                                      <div class="container-principle">
                                                            <p class="left">
                                                                  <span class="icon icon-process"></span>
                                                                  <span class="heading">Defines and<br> Creates Processes</span>
                                                                  </p>
                                                            <p class="right multiline-ellipsis">
                                                            <span class="heading insideright">Defines and Creates Processes</span>
                                                                  A good leader creates new processes before indulging into a new project and makes sure to change that process if it is rectifiable. A bad leader takes the shortest path to complete a project without rectifying the process.
                                                            </p>
                                                      </div>
                                                      </div> 
                                                </div>    
                                          </div>
                                    </div>
                                    <div class="row" id="evolve">
                                          <div class="figure bgAdapts">
                                                <div class="container">
                                                      <div class="topSection">
                                                      <div class="container-principle">
                                                                  <p class="left">
                                                                        <span class="icon icon-adaptToEvolve"></span>
                                                                        <span class="heading">Adapts to Evolve</span>
                                                                        </p>
                                                                  <p class="right multiline-ellipsis">
                                                                  <span class="heading insideright">Adapts to Evolve</span>
                                                                        A good leader uses his experience to recognize different situations and take actions according to the context. A bad leader make the mistake of taking the same actions regardless of the facts.
                                                                  </p>
                                                            </div>
                                                      </div> 
                                                </div>    
                                          </div>
                                    </div>



                               </div>
                               </div>
                        </div>

                        
              </div>
            
            <!-- our principle end -->
              <!-- the team start    -->
                  <div class="about-content tab-pane" id="team" ng-class="{'active':vm.selectedTab == 'team'}">
                              <div class="about-content-head team-head">
                                    <div class="container area-flex">
                                          <h1>The Team</h1>
                                          <span>
                                                Our VISION is to provide technologies to organizations that enables them to take data driven financial decisions in the quickest way possible.
                                          </span>
                                    </div>
                              </div>
                              <div class="about-content-body">
                                    <div class="theTeam">
                                    <div class="container">
                                          <div class="row">
                                                <div class="col-sm-12">
                                                      <h1 class="head-left">The Team</h1>
                                                </div>
                                          </div>
                                          <div class="row">
                                                <div class="col-sm-12">
                                                <ul class="list_team">
                                                            <li>
                                                            <figure class="member">
                                                                  <img src="../assets/images/team/alok.png" alt="">
                                                                  <p class="member-footer">
                                                                        <span class="name">Alok</span>
                                                                        <span class="designation">Product Associate  </span>
                                                                        </p>
                                                            </figure>
                                                            </li>
                                                            <li>
                                                                        <figure class="member">
                                                                              <img src="../assets/images/team/gaurav.png" alt="">
                                                                              <p class="member-footer">
                                                                                    <span class="name">Gaurav</span>
                                                                                    <span class="designation">Web Development Engineer</span>
                                                                                    </p>
                                                                        </figure>
                                                            </li>
                                                            <li>
                                                                        <figure class="member">
                                                                              <img src="../assets/images/team/nidhi.png" alt="">
                                                                              <p class="member-footer">
                                                                                    <span class="name">Nidhi</span>
                                                                                    <span class="designation">Programmer & Database Architect</span>
                                                                                    </p>
                                                                        </figure>
                                                            </li>
                                                            <li>
                                                                        <figure class="member">
                                                                              <img src="../assets/images/team/mayank.png" alt="">
                                                                              <p class="member-footer">
                                                                                    <span class="name">Mayank</span>
                                                                                    <span class="designation">Software Engineer</span>
                                                                                    </p>
                                                                        </figure>
                                                            </li>
                                                            <li>
                                                                        <figure class="member m-r-zero">
                                                                              <img src="../assets/images/team/sagar.png" alt="">
                                                                              <p class="member-footer">
                                                                                    <span class="name">Sagar</span>
                                                                                    <span class="designation">QA Specialist</span>
                                                                                    </p>
                                                                        </figure>
                                                            </li>
                                                  
                                                            <li>
                                                                  <figure class="member">
                                                                        <img src="../assets/images/team/mustafa.png" alt="">
                                                                        <p class="member-footer">
                                                                              <span class="name">Mustafa</span>
                                                                              <span class="designation">UI/UX Designer and Developer</span>
                                                                              </p>
                                                                  </figure>
                                                            </li>
                                                            <li>
                                                                  <figure class="member">
                                                                        <img src="../assets/images/team/aditya.png" alt="">
                                                                        <p class="member-footer">
                                                                              <span class="name">Aditya</span>
                                                                              <span class="designation">Java Developer</span>
                                                                              </p>
                                                                  </figure>
                                                            </li>
                                                            <li>
                                                                  <figure class="member">
                                                                        <img src="../assets/images/team/leena.png" alt="">
                                                                        <p class="member-footer">
                                                                              <span class="name">Leena</span>
                                                                              <span class="designation">Full Stack Developer</span>
                                                                              </p>
                                                                  </figure>
                                                            </li>
                                                            <li>
                                                                  <figure class="member">
                                                                        <img src="../assets/images/team/arpit.png" alt="">
                                                                        <p class="member-footer">
                                                                              <span class="name">Arpit</span>
                                                                              <span class="designation">Full Stack Developer</span>
                                                                              </p>
                                                                  </figure>
                                                            </li>
                                                   
                                                            <li>
                                                                  <figure class="member m-r-zero">
                                                                        <img src="../assets/images/team/meghna.png" alt="">
                                                                        <p class="member-footer">
                                                                              <span class="name">Meghna</span>
                                                                              <span class="designation">UI/UX Designer</span>
                                                                              </p>
                                                                  </figure>
                                                            </li>
                                                            <li>
                                                                  <figure class="member">
                                                                        <img src="../assets/images/team/sheba.png" alt="">
                                                                        <p class="member-footer">
                                                                              <span class="name">Sheba</span>
                                                                              <span class="designation">Inbound Sales Executive </span>
                                                                              </p>
                                                                  </figure>
                                                            </li>

                                                            

                                                            
                                                            <!-- <li>
                                                                  <figure class="member">
                                                                        <img src="../assets/images/team/devendra.png" alt="">
                                                                        <p class="member-footer">
                                                                              <span class="name">Devendra</span>
                                                                              <span class="designation">Sales Executive</span>
                                                                              </p>
                                                                  </figure>
                                                            </li>
                                                            <li>
                                                                  <figure class="member">
                                                                        <img src="../assets/images/team/pranay.png" alt="">
                                                                        <p class="member-footer">
                                                                              <span class="name">Pranay</span>
                                                                              <span class="designation">Sales Executive</span>
                                                                              </p>
                                                                  </figure>
                                                            </li> -->
                                                            <li>
                                                                  <figure class="member">
                                                                        <img src="../assets/images/team/jinesh.png" alt="">
                                                                        <p class="member-footer">
                                                                              <span class="name">Jinesh</span>
                                                                              <span class="designation">Content Writer</span>
                                                                              </p>
                                                                  </figure>
                                                            </li>

                                                            
                                                            <li>
                                                                  <figure class="member m-r-zero">
                                                                        <a href="https://www.walkover.in/career.php" target="_blank" class="empty-link"><span class="empty">Interested to <br>join our<br> team.</span></a>
                                                                  </figure>
                                                            </li>
                                                     </ul>
                                                </div>
                                          </div>
                                    </div>
                                    <div class="container-fluid">
                                           <div class="row founder theTeam m-t-60 hidden-xs">
                                           <div class="container">
                                                <div class="row">
                                                            <div class="col-sm-12">
                                                                        <h1 class="head-left">Founder</h1>
                                                                        <p>
                                                                              <span class="name">Shubhendra Agrawal,</span><br>
                                                                              Founder, Tech Visionary<br><br>Shubhendra Agrawal is the founder of Giddh. An entrepreneur at heart and an engineer by choice, he founded Giddh in 2016 with the idea of unifying accounting with automation. Prior to Giddh, Shubhendra was the co-founder and CFO of MSG91, one of India’s top 5 messaging solutions firm.<br><br>
                                                                              With experience lasting over a decade in engineering, he has been a keen analyser of consumer behavior helping him cultivate a team that creates simple yet highly functional IT products.
                                                                        </p>
                                                                  </div>
                                                            </div>
                                                      </div>
                                          </div>
                                    </div>
                                    <div class="container m-t-70">
                                    <div class="row visible-xs">
                                                <div class="col-sm-3">
                                                      <h1 class="head-left m-t-90">Founder</h1>
                                                </div>
                                          </div>
                                          <div class="row visible-xs">
                                                <div class="col-sm-12">
                                                <div class="mentors-info">
                                                         <div class="row">
                                                               <div class="col-sm-6">
                                                                        <img src="/assets/images/team/Shubhendra_thumb.png" alt=""> 
                                                               </div>
                                                               <div class="col-sm-6">
                                                                  <p>
                                                                        <span class="name">Shubhendra Agrawal,</span><br>Founder, Tech Visionary<br><br>Shubhendra Agrawal is the founder of Giddh. An entrepreneur at heart and an engineer by choice, he founded Giddh in 2016 with the idea of unifying accounting with automation. Prior to Giddh, Shubhendra was the co-founder and CFO of MSG91, one of India’s top 5 messaging solutions firm.<br><br>
                                                                        With experience lasting over a decade in engineering, he has been a keen analyser of consumer behavior helping him cultivate a team that creates simple yet highly functional IT products.
                                                                  </p>
                                                              </div>
                                                        </div>
                                                   </div>
                                                </div>
                                          </div>
                                          <div class="row">
                                                <div class="col-sm-3">
                                                      <h1 class="head-left">Mentors</h1>
                                                </div>
                                          </div>
                                          <div class="row">
                                                <div class="col-sm-12">
                                                   <div class="mentors-info">
                                                         <div class="row">
                                                               <div class="col-sm-6">
                                                                        <img src="/assets/images/team/pushpendra.png" alt=""> 
                                                               </div>
                                                               <div class="col-sm-6">
                                                                  <p>
                                                                        <span class="name">Pushpendra Agrawal,</span><br>Idea Guy, Technology Geek<br><br>A calculated risk-taker with passion for everything numbers, Pushpendra is an IMT pass out, and the founder of Walkover. Over the years Pushpendra has perfected the art of crafting the most efficient code and believes apathy to be a man’s biggest foe and time to be his biggest ally.
                                                                  </p>
                                                              </div>
                                                        </div>
                                                   </div>
                                                   <div class="mentors-info m-t-70">
                                                         <div class="row res-flex">
                                                               <div class="col-sm-6 res-second">
                                                                  <p class="left">
                                                                  <span class="name">Ashish Yadav,</span><br>Concept Creator<br><br>Ashish brings 10+ years of experience with himself in designing highly functional and intuitive applications. He believes Design to be the biggest ‘Weapon of Mass Inspiration’. As a Head of Design at Walkover, his work is grounded in his deep interest in how people connect through visual communication.
                                                                  </p>
                                                              </div>
                                                              <div class="col-sm-6 res-first">
                                                                        <img src="/assets/images/team/aashish-big.png" alt="" class="pull-right"> 
                                                               </div>
                                                        </div>
                                                   </div>
                                                   <div class="mentors-info m-t-70">
                                                         <div class="row">
                                                               <div class="col-sm-6">
                                                                        <img src="/assets/images/team/priyanka.png" alt=""> 
                                                               </div>
                                                               <div class="col-sm-6">
                                                                  <p>
                                                                        <span class="name">Priyanka Pathak,</span><br>Technology Geek<br><br>With zeros and ones coursing through her brain and blood, Priyanka has more than 7 years of experience in application development with ThoughtWorks. One part idea brewer and one part geek, she is fondly known as the Black Widow of Walkover.
                                                                  </p>
                                                              </div>
                                                        </div>
                                                   </div>
                                                   <div class="mentors-info m-t-70">
                                                         <div class="row res-flex">
                                                               <div class="col-sm-6 res-second">
                                                                  <p class="left">
                                                                        <span class="name">Ravindra Dangi,</span><br>Sales Samurai<br><br>Ravindra, the Director of Sales at MSG91, is a conversational samurai with half a decade worth of experience in sales. Unlike any other sales guy Ravindra loves to be on the phone. He believes the secret to his success in sales is treating clients like his girlfriends, and his girlfriends like clients!
                                                                        
                                                                  </p>
                                                              </div>
                                                              <div class="col-sm-6 res-first">
                                                                        <img src="/assets/images/team/ravindra-big.png" alt="" class="pull-right"> 
                                                               </div>
                                                        </div>
                                                   </div>
                                                   <div class="mentors-info m-t-70">
                                                         <div class="row">
                                                               <div class="col-sm-6">
                                                                        <img src="/assets/images/team/ankita-big.png" alt=""> 
                                                               </div>
                                                               <div class="col-sm-6">
                                                                  <p> 
                                                                        <span class="name">Ankita Chadha,</span><br>Idea Brewer<br><br>With a knack for creating beautiful spaces and bringing together the brightest of minds,Ankita is the perfect blend of a novelist, having written a novel, and an entrepreneur, having founded Mitti-Brewing Ideas, a cafe where the thinkers and doers collaborate and let their creative juices flow.
                                                                  </p>
                                                              </div>
                                                        </div>
                                                   </div>
                                                   
                                                </div>
                                          </div>
                                    </div>
                                    </div>
                              </div>
                             

                  </div>

             <!-- the team end    -->

             <!-- see company start -->
                 <div class="see-company">
                      <div class="container">
                        <div class="row">
                          <div class="col-sm-12">
                            <h1><span>See More</span></h1>
                            <p class="text-primary">See more about the Company</p>
                            <p class="text-secondry">Learn more about how Giddh can provide the solution you need.</p>
                          </div>
                        <div class="col-sm-10 col-sm-offset-1 col-xs-12 col-xs-offset-0">
                        <ul class="nav nav-tabs nav-tabs-footer area-flex wd-100per noborder" role="tablist">
                                    <li role="presentation" class="active" ng-show="vm.selectedTab != 'about'"><a href="javascript:void(0)" aria-controls="about" role="tab" data-toggle="tab" class="one btn btn-default" ng-click="vm.selectedTab = 'about'">About Us</a></li>
                                    
                                    <li role="presentation"  ng-show="vm.selectedTab != 'values'"><a href="javascript:void(0)" aria-controls="profile" role="tab" data-toggle="tab" class="two btn btn-default" ng-click="vm.selectedTab = 'values'">Our Values</a></li>

                                    <li role="presentation" ng-show="vm.selectedTab != 'principle'"><a href="javascript:void(0)" aria-controls="principle" role="tab" data-toggle="tab" class="three btn btn-default" ng-click="vm.selectedTab = 'principle'">Leadership Principles</a></li>

                                    <li role="presentation" ng-show="vm.selectedTab != 'team'"><a href="javascript:void(0)" aria-controls="settings" role="tab" data-toggle="tab" class="four btn btn-default"  ng-click="vm.selectedTab = 'team'">The Team</a></li>
                              </ul>
                        </div>


                        
                        </div>
                      </div>
                </div>
                <!-- see company end -->

          </div>
        </div>              
    </div>
</section>


<a href="#" class="go-top"><img src="../assets/images/arrow.svg" alt="" /></a>
 

<!-- include footer -->
<?php include 'footScript.php';?>
  <?php include 'footer.php';?> 
  <script>
  $(document).ready(function(){
        
//  
$("html, body").animate({ scrollTop: 0 }, "slow");
$(window).scroll(function(){
  if ($(window).scrollTop() >= 262) {
    $('.fixabout').addClass('fixed');
    $('#custComFirst').css('margin-top', '215px');
   }
   else {
    $('.about').removeClass('fixed');
    $('#custComFirst').css('margin-top', '0');
   }
});

$(window).scroll(function(){
  if ($(window).scrollTop() >= 300) {
    $('.fixedprinciple').addClass('fixed');
    $('.bgNurture').css('margin-top', '215px');
   }
   else {
    $('.fixedprinciple').removeClass('fixed');
    $('.bgNurture').css('margin-top', '0');
   }
});



});


$('.nav-tabs-footer li a').click(function(){
         
//  $('html, body').scroll(0,0);
// $('html,body').scroll(0, 'slow');
$("html, body").animate({ scrollTop: 0 }, 0);
});


  $(function() {
      
  $('.nav-tabs-values li a[href^="#"]').click(function() {
        // debugger;
    if  ((location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname)) {
      var target = $(this.hash);
      $("a.activeValue").removeClass("activeValue");
      $(this).addClass("activeValue");
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top - 200 //offsets for fixed header
        }, 800);
        return false;
      }
    }
  });
  $('.nav-tab-principle li a[href^="#"]').click(function(e) {
        // debugger;
    if  ((location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname)) {
      var target = $(this.hash);
      $("a.activepr").removeClass("activepr");
      $(this).addClass("activepr");
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top - 200 //offsets for fixed header
        }, 800);
        return false;
      }
    }
  });
});




if ( $(window).width() < 768 ){
      $(".multiline-ellipsis").click(function(){
    $(this).toggleClass('expand');
   
     var abc = $(".multiline-ellipsis").text();
     $(this).siblings().children('.heading').toggleClass('sphideshow');
})
}


$(window).scroll(function() {
    if ($(this).scrollTop()) {
        $('.go-top').fadeIn();
    } else {
        $('.go-top').fadeOut();
    }
});

// go to top jump jQuery
$(".go-top").click(function() {
    $("html, body").animate({scrollTop: 0}, 1000);
 });


</script>


  
</body>
</html>