app.controller('HomeController', ['$scope', '$firebaseObject', '$firebaseArray',
  function($scope,$firebaseObject,$firebaseArray){

  var impiantiL = new Firebase("https://eleva-7c284.firebaseio.com/impianti/");
  var impianti = $firebaseArray(impiantiL);

  var personaleL = new Firebase("https://eleva-7c284.firebaseio.com/personale/");
  var personale = $firebaseArray(personaleL);

  var mapOptions = {
      zoom: 4,
      center: new google.maps.LatLng(41.8719,12.5674),
      mapTypeId: google.maps.MapTypeId.ROADMAP
  }

  $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

  $scope.markers = [];

  var infoWindow = new google.maps.InfoWindow();

  var createMarker = function (impiantiLoop, personaleSelectedLoop){

      var marker = new google.maps.Marker({
          map: $scope.map,
          animation: google.maps.Animation.DROP,
          position: new google.maps.LatLng(impiantiLoop.latt, impiantiLoop.long),
          title: impiantiLoop.nome_impianto + " "
      });

      marker.content = impiantiLoop.route + ", " + impiantiLoop.street_number + " - " + impiantiLoop.citta + ", " + impiantiLoop.regione + ". " + '<div class=\'personaleList\'>' + '<div class=\'personale_caption\'>' + '<h5>Personale Disponibile</h5>' + '</div>' + '<ul>' + personaleSelectedLoop  + '</ul>' + '</div>';
      marker.subtitle = "Personale";

      google.maps.event.addListener(marker, 'click', function(){
          infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
          infoWindow.open($scope.map, marker);
      });

      $scope.markers.push(marker);

  }

  impianti.$loaded()
    .then(function(impianti) {

      var impiantiCount = impianti.length;

      for (i = 0; i < impiantiCount; i++){

        var impiantiLoop = impianti[i];

        var personaleSelectedLoop = createList(impiantiLoop, personaleSelectedLoop);


      };

  });

  function createList(impiantiLoop, personaleSelectedLoop) {

      var personaleSelectedLoop = "";

      var personaleCount = personale.length;

      console.log(personaleCount);

      for (e = 0; e < personaleCount; e++){

        var personaleLoop = personale[e].impiantoCheckBox;

        console.log(personale[e].nome);

        for (var key in personaleLoop){

          console.log(key);
          console.log(impiantiLoop.nome_impianto);

          if (key == impiantiLoop.nome_impianto){
            console.log("bingo!");
            personaleSelectedLoop = personaleSelectedLoop + '<li>' + personale[e].nome + " " + personale[e].cognome + '</li>';
            console.log(personaleSelectedLoop);

            createMarker(impiantiLoop, personaleSelectedLoop);

          }

        };

      };

      console.log(impiantiLoop);


  };






  $scope.openInfoWindow = function(e, selectedMarker){
      e.preventDefault();
      google.maps.event.trigger(selectedMarker, 'click');
  }


}]);
