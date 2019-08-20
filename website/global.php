<!DOCTYPE html>
<html lang="en" ng-app='giddhWebsite'>
	<head>
		<meta name="description" content=""/>
		<meta name="keywords" content=""/>
		<title>Giddh ~ Admin Panel</title>
		<?php include 'head.php';?>
	</head>
	<style type="text/css">
		.center-block {
			float: none;
		}
		#global {
			background: #28283C;
		}
		.world-map {
			opacity: 0.8;
		}
		.homeContent {
	    padding: 120px 0 60px 0;
	    text-align: center;
	    color: white;
		}

		.blueBg {
		    background-color: #28283C;
		}
		/*#global_cnt {
			background-image: url('/assets/images/world-map.png');
	    background-size: contain;
	    background-repeat: no-repeat;
	    background-position: 1000px 0;
		}*/
		#global_cnt h1, #global_cnt h2 {
			font-weight: 200;
		}
		#getnotify {
			overflow: hidden;
		}
		#getnotify input {
			padding: 12px 15px;
			min-height: 55px;
		  box-shadow: 0px 0px 22px #121217;
		}
		#getnotify button {
		  background-color: #E34A26;
			border-color: #E34A26;
			color: #fff;	
			padding: 15px 45px;
			border: 0;
			border-radius: 4px;
		}
	</style>
	<body ng-controller="loginController">
		<div class="blueBg homeContent" ng-if="!browserIE" id="global_cnt">
			<div class="container">
				<h1 class="text-center">We are not present in your country yet</h1>
				<h2 class="text-center">leave us your email and we will get in touch once we launch in your country</h2>
				<div class="col-md-7 center-block">
					<img src="/assets/images/world-map.png" class="img-responsive world-map" />
				</div>
				<div class="col-md-5 center-block">
					<form id="getnotify" novalidate name="nForm">
						<div class="form-group">
							<input type="email" name="nForm.email" class="form-control" placeholder="your@email.com" ng-model="nFdata.email"/>
							<br />
							<button ng-click="notifyMe()">Notify me</button>
						</div>
					</form>
				</div>
			</div>
		</div>
		<?php include 'footScript.php';?>
	</body>
</html>