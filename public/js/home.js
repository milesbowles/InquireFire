// JavaScript function that wraps everything
$(document).ready(function() {
    var userId = 0
    var numberOfGamesPlayed = [];
    // THIS IS FOR DISCERNING WHICH USER WE SHOULD DISPLAY THE STATS OF AND THEN SENDING A REQUEST AT THE APPOROPRIATE ROUTE
    var parseUrlforStats = function(url) {
      var urlArr = url.split('?')
      var searchParams = new URLSearchParams(urlArr[1])
      if (searchParams.has("usr") === true) {
        userId = searchParams.get('usr');
        var xhttp = new XMLHttpRequest()
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200)  {
                var statsObj = JSON.parse(this.responseText)
                for (var i = 0; i < statsObj.length; i++) {
                    var gamesPlayed = document.getElementsByClassName(statsObj[i].category+' gamesPlayed')
                    var perfectGames = document.getElementsByClassName(statsObj[i].category+' perfectGames')
                    gamesPlayed[0].innerHTML = statsObj[i].gamesPlayed;
                    numberOfGamesPlayed.push(statsObj[i].gamesPlayed);
                    perfectGames[0].innerHTML = statsObj[i].perfectGames
                }
                console.log(numberOfGamesPlayed);
                updateGameLinks(userId);
            }
        }
        xhttp.open("GET", "/api/user/"+searchParams.get('usr'), true)
        xhttp.send()
      }
    }
    parseUrlforStats(window.location.href)    
    // ***********************************************************************************************************************
    // THIS IS FOR ASSIGNING APPROPRIATE LINKS TO CATEGORIES, APPROPRIATE IN THE SENSE THAT THERE UNIQUE USER ID IS ATTACHED TO THE LINK
    var updateGameLinks = function(userId) {
        var links = document.getElementsByTagName('a')
        for (var i = 0; i < links.length; i++) {
            links[i].setAttribute('href', '/game/usr='+userId+'&category='+links[i].attributes[0].value+'&round=1&numberOfGamesPlayed='+numberOfGamesPlayed[i]);
        }
    }
});