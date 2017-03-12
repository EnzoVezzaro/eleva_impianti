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

  var createMarker = function (impiantiLoop, personaleList){

      var marker = new google.maps.Marker({
          map: $scope.map,
          animation: google.maps.Animation.DROP,
          position: new google.maps.LatLng(impiantiLoop.latt, impiantiLoop.long),
          title: impiantiLoop.nome_impianto + " "
      });
      marker.content = impiantiLoop.route + ", " + impiantiLoop.street_number + " - " + impiantiLoop.citta + ", " + impiantiLoop.regione;

      google.maps.event.addListener(marker, 'click', function(){
          infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
          infoWindow.open($scope.map, marker);
      });

      $scope.markers.push(marker);

  }

  impianti.$loaded()
    .then(function(impianti) {
      personale.$loaded()
        .then(function(personale) {

          var impiantiCount = impianti.length;

          for (i = 0; i < impiantiCount; i++){

            var impiantiLoop = impianti[i];

            var personaleCount = personale.length;

            for (e = 0; e < personaleCount; e++){

              var personaleL = new Firebase("https://eleva-7c284.firebaseio.com/personale/");
              var personale = $firebaseArray(personaleL);

              var personaleArray = personale;

              console.log(personaleArray);

              // var personaleLoop = personale[e].impiantoCheckBox;
              //
              // for (var key in personaleLoop){
              //
              //   if (key == impianti[i].nome_impianto){
              //     var personaleList = personale[i].nome + " " + personale[i].cognome;
              //     var personaleListArray = personaleList;
              //
              //     console.log(key);
              //     console.log(impianti[i].nome_impianto);
              //     console.log(personaleListArray);
              //   };
              //
              // };

            };

            // createMarker(impiantiLoop, personaleList);
            createMarker(impiantiLoop);

          };

      });


  });




  $scope.openInfoWindow = function(e, selectedMarker){
      e.preventDefault();
      google.maps.event.trigger(selectedMarker, 'click');
  }


}]);
