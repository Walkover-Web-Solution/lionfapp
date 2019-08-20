<base href="/">
<?php
// redirect www to non-www
if (substr($_SERVER['HTTP_HOST'], 0, 4) === 'www.') {
    header('Location: http'.(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS']=='on' ? 's':'').'://' . substr($_SERVER['HTTP_HOST'], 4).$_SERVER['REQUEST_URI']);
    exit;
}

// $jsPath = '/bower_components';
// $jsPath = 'bower_components';

echo '<meta charset="UTF-8"/>
  <meta http-equiv="X-UA-Compatible" content="IE=egde"/>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="bower_components/angular-vidbg/dist/vidBg.min.css" rel="stylesheet">
  <link href="bower_components/intl-tel-input/build/css/intlTelInput.css" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css?family=Arvo:400" rel="stylesheet" type="text/css">
  <link href="https://fonts.googleapis.com/css?family=Inconsolata:400,700" rel="stylesheet" type="text/css">
  <link href="styles/new-style.css" rel="stylesheet">
  <link href="styles/icomoon-style.css" rel="stylesheet">
  <link href="bower_components/angular-toastr/dist/angular-toastr.min.css" rel="stylesheet">
  <link href="bower_components/ui-bootstrap-custom-build/ui-bootstrap-custom-2.5.0-csp.css" rel="stylesheet">
  <link href="https://use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="scripts/bootstrap.min.js"></script>
  <script type="text/javascript">
      window.superformIds = ["Jkvq", "xZyf"];
  </script>
  <link rel="stylesheet" media="screen" href="https://assets.sokt.io/superform/superform.css" />
  <script src="https://assets.sokt.io/superform/superform.js" async></script>
  <script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async></script>
  ';
?>
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-K2L9QG');</script>
<!-- End Google Tag Manager -->


<script>                       
! function() {
  var analytics = window.analytics = window.analytics || [];
  if (!analytics.initialize)
      if (analytics.invoked) window.console && console.error && console.error("Segment snippet included twice.");
      else {
          analytics.invoked = !0;
          analytics.methods = ["trackSubmit", "trackClick", "trackLink", "trackForm", "pageview", "identify", "reset", "group", "track", "ready", "alias", "debug", "page", "once", "off", "on"];
          analytics.factory = function(t) {
              return function() {
                  var e = Array.prototype.slice.call(arguments);
                  e.unshift(t);
                  analytics.push(e);
                  return analytics
              }
          };
          for (var t = 0; t < analytics.methods.length; t++) {
              var e = analytics.methods[t];
              analytics[e] = analytics.factory(e)
          }
          analytics.load = function(t, e) {
              var n = document.createElement("script");
              n.type = "text/javascript";
              n.async = !0;
              n.src = "https://cdn.segment.com/analytics.js/v1/" + t + "/analytics.min.js";
              var a = document.getElementsByTagName("script")[0];
              a.parentNode.insertBefore(n, a);
              analytics._loadOptions = e
          };
          analytics.SNIPPET_VERSION = "4.1.0";
          analytics.load("pwEAdSA97VnDhJ3j2DEJlm9JfLkv3CmU");
          analytics.page();
          setTimeout(senduserInfo, 30000);

      }
}();
</script>