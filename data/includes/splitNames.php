<?php 


function getSplitNames($splitList) {
    $x = 0;


    
    foreach ($splitList as $name) {

            $splitList[$x] = trimSplitName($name);
            $x++;
            
    }

    
    return $splitList;
}


function trimSplitName($splitName) {

    if ( strlen($splitName) >= 18 ) {

        $dropThese = ["and ", "the ", "of "];
        $splitName = str_ireplace($dropThese, "", $splitName);

    }

    if ( strLen($splitName) >= 18 ) {

            $splitName = substr($splitName, 0, 15) . "...";

    }

    
    return $splitName;

}


function printSplitNames ($splitNames) {

    echo '<span onclick="manualPage(\'B\')">BACK</span> || ';
    

    //LiveSplit starts counting at 0; if you need to
    //'Offset by one,' do that as needed but not here.
    $x = 1;
    foreach ($splitNames as $name) {

        echo '<span style="color: red" onclick="manualPage(' . $x . ')">' . $name . '</span> ';
        echo ' || ';
        $x++;

    }

    echo '<span onclick="manualPage(\'N\')">NEXT</span>';

}




?>
