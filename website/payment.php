<!DOCTYPE HTML>
<html lang="en" ng-app="giddhWebsite">
<head>
  <meta name="description" content="Giddh, the best online accounting and bookkeeping software. An accounting software to provide you an outstanding solution for business accounting management"/>
  <meta name="keywords" content="bookkeeping software, Accounting softwares, online accounting software, bookkeeping software for small business"/>
  
  <title>Giddh ~ Admin Panel</title>

  <?php include 'head.php';?>

</head>

<!-- {oh:geo.country != 'IN'} -->
<body ng-controller="paymentCtrl" id="page-top">
  
  <!-- <div ng-class="{'other-country': geo.country != 'IN'}" ng-if="geo.country != 'IN'">
    <iframe src="global.html" style="height:100%;width:100%;padding: 0;margin:0"></iframe>
  </div> -->



  <!-- <ng-include src="'header.html'"></ng-include> -->
  <?php include 'header.php';?>  

<section class="container-fluid" style="margin-top:100px">
  <div class="row mr1">

  </div>
  <div ng-if="showInvoice" class="row mr1">
  <!-- razor-pay -->
    <button ng-if="wlt.status != 'paid'" ng-disabled="disableRazorPay" razor-pay class="btn btn-primary pull-left" style="margin-left:20%;">Pay Now</button>
    <button class="btn btn-primary pull-right" style="margin-right:20%" ng-click="downloadInvoice()">Download</button>
  </div>
  <div class="row mr1">
    <!--<a ng-download="{{wlt.contentNumber}}.pdf" ng-href="{{content}}">Download Invoice</a>-->
    <object ng-disabled="true" ng-if="showInvoice" data="{{pdfFile}}" type="application/pdf" style="width: 100%; height: 600px;">
      <param name="title" value="{{wlt.contentNumber}}.pdf" >
    </object>
    <!-- <div ng-if="showInvoice" ng-bind-html="contentHtml" style="margin:0 20%;padding:2%;border:1px solid lightgrey;"></div> -->
    <!--<embed ng-src="{{pdfFile}}" style="width:100%;height:600px;"></embed>-->
    <!--<iframe style="height:100%; width:100%" src="data:application/pdf;base64,JVBERi0xLjQKJeLjz9MKNCAwIG9iago8PC9MZW5ndGggMTY5Ny9GaWx0ZXIvRmxhdGVEZWNvZGU+PnN0cmVhbQp4nJ1YX1PbOBB/z6fYmb7QGaxKsiTbPF0aDo5rSznIDS99MYkAXxMb7ASGb3Mf9VZ2Qqw/puTK0NYr7e5Pv9VKu3ocfZ6OYgUpVTCdjyhEijHCmfn4fTr6ywwzoPjDgCtGUgVJKoiA6XL06YQBS2F6Ozo4K5+qYqY/Tv8xWo8jihOVSsD9t74zzhIlCUtAspgkEsck1Hp0i84e218OfyKQU+vXAiJURlQKiaAkaZEMDlCYzhAnB0ZbnMf5Sh8B5RFjEadMGcBbZSkSROLoRklCUo7jHR99ECIlEudz6YJwB1wQG7Lgw1HfvcgYiT21A7DnCMJi3zTbmjZrYgzXFwdWZmtFWUoy+bqyYeo9+uOUcAkq5YRbC3fl7rpP6mppLVkJgrvBUYi4IoyFGN/YV0nY76vcJeU6X/ysnnQN1/oGrqrFelVUZQMXdfGE2wG+Fstiped9YJxnRDDXZMQwREy9AU0OUCKHKBFURoKqQ5jkDysCE3JF4Dx/Wc/XMK5n+Vz3UTGMWBy71iKmKKHpG6jiAcLiZAAVo5/4IXxfzOEiX+RNkR9CqfMaTmuNhNXwJS9QfA9/VM1DscoXhxZ3MiaZazziTBK12W0ODD5AGreWiVkzr2oNQnJKmUUL5WZfO/Mj3Fwie4MVOsAKHWLlG7kgVlalJGXufDxViAxvETxUAzljSV2X08rKlziWRHgZZh8RsVlG7Nt8zYYx7na4rO7r3FLLOGHcy8WEGenQavxM5F7S9FbzGSmDMTR6VpVzOFlUVY27fK41TIrVi3XO4U2DF5KXf3g202Fy/eyzpC6c03V9l1elxYLMSObpREhpFj6RjAM/vSypl1ycU85tr9056KRMHBvpkFc/ayyp6zXHqJPaRP23uyWmL5lVS4txzkjCvSRilBrxEAg/h7iXET0QGcsyiZWG4EliEZAmrXMnlZTq+3YuKFM5PJs6A8uRGNx/L09HyGaagsxiU2ost5+4ofFuXoyu3m+hU1mOMEOSzLLwLhx4ZSu1w7H53AeHpbIciY6XvYEIlZIekM3nPkAsleXIlBX7cmrr7Gx0qN6/mE1sTL3Xiy5WXnTP6HYqr9HtWdgnulscm899cFgqu+juC2QTmy2Qzec+QCyVXWT2MWHr7Gx0qF4XM/T7DvuZmSMz2dmP1fb/W9t2n2CyBE/0zCrP+0L3crzSdZEv4EP/dMIOQKauToRXsQwWXViktceE69eVu66PdTOriwdTm1rVDZZTvneJiw7eSJJKkqUB996AXxdU63Jltw1tf+atHA/rJNgRIbNSmarLoftV6N2F1hWUmMrJmRzJgXJqQ6fnz5W7Lq/yhW5gPJu5q2UKTwDm+VdYzQYvQIm3lWIBBN6AX17jrUppiGrHeYytkAg5TxXhyBW2SnaUXbnr+t++0zQjVLiTI2QhuK8FE+2yPJ/egEf5+gamFfYJYDe8SHiWeP7x7AiXPZK2Iz4Ab+BdhAtsiV3fv+IbHdm9vit3kyrEtz15mO+4o8fz6Q24TluuLaZxW6UeTOdpAUtf5aE7CEbMWUFM3wqXh98bcPEPh8t1PBQuNC+S1CTu9pmqf8bBWQnXVT1vjIfeNjnaPF85hsyrl+wMvU79XmqY3lfrJsdO5nu5eHnny5eQzIT7f798dT2qyTiR+r3rTu5mwOTs/Aj+Trig9NsFp4xeTCeUx1iLW0cgbmflmcG2KyVhmluvcZYF0ezk3oEwnRzBeDyeXGeJSr9eHbsdvWmtPQMRw976jdeXOA2zspO7OC7G530cFgSOEISrG2UYsvCjQlfiYGdjHvH6GNwBF8T+r1Pdc55jMWLmpTIOY5OEQ4wlt7KRWWIX13FxZ952Fi9wqktdI5Y5lBU0xV2Zr9a1xp37uC7qEDTbZsRSTnbAfpUipgfnoRSx0zLmbSbZ+T3V9bIBk5OTqpwXLZPhrI6pMLe9ndXjGwwE5N0hUTRQlHhUzIu8hPPc2MIb7HL9oLF++HFwdn7542PQNMduVgnH9LWGuZ4tcuRtdZ+v8K/WfvcQ3NxXzw2K0PdstUYvD7URV7etrNH1E342yEM510h4u8DWCoYHHvJ6VczWaBpXbszXa21mWA02okr4BtXBrKprPVuRMHosLWXioL9Y6LzR8Fy09vOyucX92uLtuFpVG/RtVQV3xZMu4UYvqucw+3jyEPdIvbaMH+tVXiyaIzib4A98zsuf8HV6HLaGWwH7AyeWn2bw4QgoFYxKyrhkIqxM28cXW/ns5GrSuabmj2Ab1f8AmIFfHAplbmRzdHJlYW0KZW5kb2JqCjEgMCBvYmoKPDwvVHlwZS9QYWdlL01lZGlhQm94WzAgMCA1OTUgODQyXS9SZXNvdXJjZXM8PC9Gb250PDwvRjEgMiAwIFIvRjIgMyAwIFI+Pj4+L0NvbnRlbnRzIDQgMCBSL1BhcmVudCA1IDAgUj4+CmVuZG9iago3IDAgb2JqCjw8L1RpdGxlKEludm9pY2UpL1BhcmVudCA2IDAgUi9EZXN0WzEgMCBSL1hZWiAyMCA4MDYgMF0+PgplbmRvYmoKNiAwIG9iago8PC9UeXBlL091dGxpbmVzL0ZpcnN0IDcgMCBSL0xhc3QgNyAwIFIvQ291bnQgMT4+CmVuZG9iagoyIDAgb2JqCjw8L1R5cGUvRm9udC9TdWJ0eXBlL1R5cGUxL0Jhc2VGb250L0hlbHZldGljYS1Cb2xkL0VuY29kaW5nL1dpbkFuc2lFbmNvZGluZz4+CmVuZG9iagozIDAgb2JqCjw8L1R5cGUvRm9udC9TdWJ0eXBlL1R5cGUxL0Jhc2VGb250L0hlbHZldGljYS9FbmNvZGluZy9XaW5BbnNpRW5jb2Rpbmc+PgplbmRvYmoKNSAwIG9iago8PC9UeXBlL1BhZ2VzL0NvdW50IDEvS2lkc1sxIDAgUl0+PgplbmRvYmoKOCAwIG9iago8PC9UeXBlL0NhdGFsb2cvUGFnZXMgNSAwIFIvT3V0bGluZXMgNiAwIFI+PgplbmRvYmoKOSAwIG9iago8PC9Qcm9kdWNlcihpVGV4dK4gNS41LjEwIKkyMDAwLTIwMTUgaVRleHQgR3JvdXAgTlYgXChBR1BMLXZlcnNpb25cKSkvQ3JlYXRpb25EYXRlKEQ6MjAxNjExMTEwOTU4MDNaKS9Nb2REYXRlKEQ6MjAxNjExMTEwOTU4MDNaKT4+CmVuZG9iagp4cmVmCjAgMTAKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAxNzgwIDAwMDAwIG4gCjAwMDAwMDIwMzkgMDAwMDAgbiAKMDAwMDAwMjEzMiAwMDAwMCBuIAowMDAwMDAwMDE1IDAwMDAwIG4gCjAwMDAwMDIyMjAgMDAwMDAgbiAKMDAwMDAwMTk3NCAwMDAwMCBuIAowMDAwMDAxOTAxIDAwMDAwIG4gCjAwMDAwMDIyNzEgMDAwMDAgbiAKMDAwMDAwMjMzMSAwMDAwMCBuIAp0cmFpbGVyCjw8L1NpemUgMTAvUm9vdCA4IDAgUi9JbmZvIDkgMCBSL0lEIFs8OTIxNDQ1ZWU2YmQyMTE1ZjQ1NmUwZGU0OTQwMGEwN2M+PDkyMTQ0NWVlNmJkMjExNWY0NTZlMGRlNDk0MDBhMDdjPl0+PgolaVRleHQtNS41LjEwCnN0YXJ0eHJlZgoyNDc3CiUlRU9GCg=="></iframe>-->
  </div>
</section>


  <!-- include footer -->
<ng-include src="'footer.html'"></ng-include>

  <?php include 'footScript.php';?>

</body>
</html>