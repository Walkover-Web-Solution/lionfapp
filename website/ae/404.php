<!DOCTYPE HTML>
<html lang="en" ng-app='giddhWebsite'>
<head>
  <meta name="description" content=""/>
  <meta name="keywords" content="bookkeeping software, Accounting softwares, best accounting software"/>
  <title>Page Not Found | Giddh</title>
  <?php include 'head.php';?>
</head>
<body ng-controller="homeController as vm" id="page-top">

  <ng-include src="'header.html'"></ng-include>

  <section id="videoBg" class="intro no-result">
    <div class="intro-body">
      <div class="container">
        <div class="row">
          <div class="col-sm-7 center-block">
            <figure>
              <img class="img-responsive" src="/assets/images/404.svg" alt="business accounting software">
            </figure>            
          </div>
        </div>
      </div>
    </div>
  </section> 


  <ng-include src="'footer.html'"></ng-include>
  
  <?php include 'footScript.php';?>

</body>
</html>
