// JavaScript function that wraps everything
$(document).ready(function() {
    var userId = 0
    // THIS IS FOR DISCERNING WHICH USER WE SHOULD DISPLAY THE STATS OF AND THEN SENDING A REQUEST AT THE APPOROPRIATE ROUTE
    var parseUrlforStats = function(url) {
      var urlArr = url.split('?')
      var searchParams = new URLSearchParams(urlArr[1])
      if (searchParams.has("usr") === true) {
        userId = searchParams.get('usr')
        var xhttp = new XMLHttpRequest()
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200)  {
                var statsObj = JSON.parse(this.responseText)
                console.log(statsObj)
            }
        }
        xhttp.open("GET", "/api/user/"+searchParams.get('usr'), true)
        xhttp.send()
      }
    }
    parseUrlforStats(window.location.href)    
    // ***********************************************************************************************************************
    // THIS IS FOR ASSIGNING APPROPRIATE LINKS TO CATEGORIES, APPROPRIATE IN THE SENSE THAT THERE UNIQUE USER ID IS ATTACHED TO THE LINK
    var updateGameLinks = function() {
        var links = document.getElementsByTagName('a')
        for (var i = 0; i < links.length; i++) {
            links[i].setAttribute('href', '/game/usr='+userId+'&category='+links[i].attributes[0].value+'&round=1')
        }
    }
    updateGameLinks()
    // ************************************************************************************************************************


    function createInfoGraphics() {
        
    }


    // TODO: add jquery for hiding and displaying categories

    function showSubCategories() {
        // display modal
        
    }

    function hideSubCategories() {
        // hide modal

    }

// TODO: add input fields for custom questions
    
});

function setup() {
    getUserStats();

}