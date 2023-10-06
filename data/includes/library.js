function loadFile(filePath) {

    
    var result = null;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.overrideMimeType("text/html");
    //xmlhttp.open("GET", filePath+'?ts='+(new Date()).getTime(), false);
    xmlhttp.open("GET", filePath, false);
    xmlhttp.send();
    if (xmlhttp.status==200) {
      result = xmlhttp.responseText;
    }
    return result;
}

function changePage(splitIndex) {

   
  const regPage = /page=\d+/g;
  var currentPage = document.getElementById('pdfBox').src.split("/pdf/");
  oldURL = currentPage[1];

  //check if there's a # in the PDF's url.
  //if so...
  if ( oldURL.includes("#")) {

      
      //replace page=XXX with page=SplitIndex
      splitURL = oldURL.split("#");
      
      

      splitURL[1] = splitURL[1].replace(regPage, 'page=' + splitIndex);

      console.log("The page is: " + splitURL[1]);

      newPage = splitURL[0] + "#" + splitURL[1];
      
  }

  //if not, simply append page number
  else { newPage = oldURL + "#page=" + splitIndex; }

  
  newPage = "./pdf/" + newPage;
  
  
  
  
  document.getElementById('pdfBox').src = newPage;



}


function checkForUpdate () {

  var playPause = loadFile('vars/playPause');
    
  if (playPause == "play") {

      
      var splitIndex = parseInt(loadFile('vars/splitIndex' ));
      
      //offset is +1 (LiveSPlit starts 0, PDF starts 1)
      //rest is manual offset (Notes don't start on page 1 of PDF, etc.)
      var offset = 1 + parseInt( loadFile('vars/pageOffset' ));
      
      
      var currentPage = parseInt( loadFile('vars/currentPage' ));

      //figure out what livesplit splitIndex the current page
      //actually  refers to.
      var pageMinusOffset = currentPage - offset;

      console.log("Checkign for update. SI is:" + splitIndex + "and CP is: " + currentPage + "and Offset is: " + offset);

      //hey we're on the wrong page!
      if (splitIndex != pageMinusOffset) {

        console.log("changePage(): " + parseInt(splitIndex + offset));

        //updatePage
        var xhr = (window.XMLHttpRequest) ? new XMLHttpRequest() : new activeXObject("Microsoft.XMLHTTP");
        xhr.open( 'post', 'includes/updateDone.php?currentPage=' + parseInt(splitIndex + offset) + '&dc='+ new Date().getTime() );
        xhr.send();

        changePage(parseInt(splitIndex + offset));

      }

    }

  }

      



function manualPage(splitIndex) {

  
  //if "B.ack" or "N.ext", get the CURRENT PAGE
  //then adjust back or forward by 1.
  if (splitIndex == "B") {

    var splitIndex = parseInt( loadFile('vars/currentPage'+'?dc='+ new Date().getTime() ) ) - 1;
      
  }

  else if (splitIndex == "N") {


    
    var splitIndex = parseInt( loadFile('vars/currentPage'+'?dc='+new Date().getTime() ) ) + 1;
    

  }

  //The "+1" for PDF vs LiveSplit is baked into the manual split links.
  //Still need the manual offset (Notes don't start on page 1 of PDF, etc.)
  var offset = parseInt( loadFile('vars/pageOffset'+'?dc=' + new Date().getTime() ) );


  //pause automatic tracking
  var xhr = (window.XMLHttpRequest) ? new XMLHttpRequest() : new activeXObject("Microsoft.XMLHTTP");
  xhr.open( 'post', 'includes/playPause.php?p=pause&dc=' + new Date().getTime() );
  xhr.send();

  //updatePage
  var xhr = (window.XMLHttpRequest) ? new XMLHttpRequest() : new activeXObject("Microsoft.XMLHTTP");
  xhr.open( 'post', 'includes/updateDone.php?currentPage=' + parseInt(splitIndex + offset) + '&dc='+ new Date().getTime() );
  xhr.send();
  
  
  changePage(parseInt(splitIndex + offset));


}