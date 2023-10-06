<?php

include "includes/splitNames.php"; 


//$issue = $_GET(["issue"]);
$issue = "../../test.pdf";

$splitLongNames = file("vars/splitList");
$splitNames = getSplitNames($splitLongNames);

$initialSRC = "file=" . $issue . "?dc=" . time() . "#page=1";


?>

<style>
     
    div#contentBox {
        width: 100%;
        height: calc(100% - 50px);
        border-width:0px;
        display: inline-block;
        vertical-align: middle;
        margin: auto;
    }

    p#navBar {
        
        margin: auto;
        margin-top: 10px;
        margin-bottom: 0px;
        font-size: 32px;
        
    }

    
</style>


<head>

    <meta http-equiv='cache-control' content='no-cache'>
    <meta http-equiv='expires' content='0'>
    <meta http-equiv='pragma' content='no-cache'>
    <script src="includes/library.js"></script>
    <script>setInterval(checkForUpdate, 50);</script>

</head>


<html>
    
    <div id="contentBox"><iframe id="pdfBox" style="width: 100%; height: calc(100% - 40px); overflow: hidden;" src="pdf/web/viewer.html?<?php echo $initialSRC; ?>">Iframes not supported</iframe></div>
    <div align="center"><?php printSplitNames($splitNames);?></div>
   
</html>



