<?php
  if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $body = '';
    $fh   = @fopen('php://input', 'r');
    if ($fh)
    {
      while (!feof($fh))
      {
        $s = fread($fh, 1024);
        if (is_string($s))
        {
          $body .= $s;
        }
      }
      fclose($fh);
    }
  
   $urlx = $_SERVER['REQUEST_URI'];
   $rx = "(company/(.+)/import)Ui" ;
   preg_match($rx, $urlx, $data);
  
  
    $url = "http://api.giddh.com/company/".$data[1]."/import-master-data?isMaster=".$_GET['isMaster'];
    $ch = curl_init();
    curl_setopt_array($ch, array(
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_URL => $url,
        CURLOPT_POST => 1,
        CURLOPT_CUSTOMREQUEST=>'POST',
        CURLOPT_HTTPHEADER => array('Content-Type:text/plain','Auth-Key:'.$_SERVER['HTTP_AUTH_KEY']),
        CURLOPT_POSTFIELDS=>$body
    ));
    //$response = json_decode(curl_exec($ch) );
    $response = curl_exec($ch) ;
    curl_close($ch);
    print_r($response);
  
  }  
?>
