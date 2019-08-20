<!DOCTYPE HTML>
<html lang="en" ng-app='giddhWebsite'>
<head>
    <meta name="description" content="Do you feel accounting is tough to manage? Giddh will solve all your accounting related needs. Get a free invitation now."/>
    <meta name="keywords" content="Accounting softwares, online accounting software, Web Based Accounting Software"/>
    <title>Signup or Login - Giddh ~ Accounting at its Rough!</title>
    <?php include 'head.php';?>
</head>
<body ng-controller="loginController" class="lightTrans">
<ng-include src="'header.html'"></ng-include>

<section id="videoBg" class="intro login">
    <!-- banner content -->
    <div class="intro-body">
        <div class="container">
            <div class="row">
                <div class="col-sm-12">
                    <h1 class="brand-heading arvo">Enter your accounting space</h1>

                    <div id="box" class="text-uppercase">
                        <div class="clearfix mrB1">
                            <p class="lead ">Sign In or register</p>
                        </div>

                        <button type="login" class="btn sharp btn-block btn-lg btn-login google" ng-click="authenticate('google')">connect with Google</button>
                        <button type="login" class="btn sharp btn-block btn-lg btn-login twitter" ng-click="authenticate('twitter')">connect with Twitter</button>
                        <button type="login" class="btn sharp btn-block btn-lg btn-login linkedin" ng-click="authenticate('linkedin')">connect with LinkedIn</button>
                        <button type="login" class="btn sharp btn-block btn-lg btn-login mobile" ng-click="signUpWithEmailModal($event)">connect with Email</button>

                    </div>


                </div>
            </div>
        </div>
    </div>
</section> <!-- end of intro -->

<!-- include footer -->
<ng-include src="'footer.html'"></ng-include>
<?php include 'footScript.php';?>

</body>
</html>