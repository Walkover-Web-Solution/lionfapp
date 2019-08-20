<?php

  function contactUs() {
    $ch = curl_init();
    
    $fields = array(
       'name'=>$_REQUEST['name'],
       'number'=>$_REQUEST['number'],
       'email'=>$_REQUEST['email'],
       'message'=>$_REQUEST['message']
       );

    echo "1";

    // echo $fields;

    $postvars = '';

    foreach($fields as $key=>$value) {
     $postvars .= $key . "=" . $value . "&";
    }

    echo "2";
    $url = "https://sokt.io/zX62dMuqyjqikthjh5/giddh-giddh-contact-form";

    curl_setopt($ch,CURLOPT_URL,$url);
    curl_setopt($ch,CURLOPT_POST, 1); //0 for a get request
    curl_setopt($ch,CURLOPT_POSTFIELDS,$postvars);
    curl_setopt($ch,CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch,CURLOPT_CONNECTTIMEOUT ,3);
    curl_setopt($ch,CURLOPT_TIMEOUT, 20);

    echo "3";

    $headers = array(
      'authkey: xYgjNVbbu4seGCunYKnp'   
  );

    echo "4";

    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

    $response = curl_exec($ch);    

    print $response;

    curl_close ($ch); 
  }

$fn = $_REQUEST['fn'];

contactUs();

?> 


