app.controller('HomeController', ['$scope', '$firebaseObject', '$firebaseArray',
  function($scope,$firebaseObject,$firebaseArray){

  var impiantiL = new Firebase("https://eleva-7c284.firebaseio.com/impianti/");
  var impianti = $firebaseArray(impiantiL);

  var mapOptions = {
      zoom: 4,
      center: new google.maps.LatLng(41.8719,12.5674),
      mapTypeId: google.maps.MapTypeId.ROADMAP
  }

  $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

  $scope.markers = [];

  var infoWindow = new google.maps.InfoWindow();

  var createMarker = function (info){

      var marker = new google.maps.Marker({
          map: $scope.map,
          animation: google.maps.Animation.DROP,
          position: new google.maps.LatLng(info.latt, info.long),
          title: info.nome_impianto
      });
      marker.content = info.latt + ' E,' + info.long +  ' N, </div>';

      google.maps.event.addListener(marker, 'click', function(){
          infoWindow.setContent('<h2>' + marker.title + '</h2>' +
            marker.content);
          infoWindow.open($scope.map, marker);
      });

      $scope.markers.push(marker);

  }

  impianti.$loaded()
    .then(function(impianti) {
      var impiantiCount = impianti.length;
      for (i = 0; i < impiantiCount; i++){
        var impiantiLoop = impianti[i];
        createMarker(impiantiLoop);
      }
  });


  $scope.openInfoWindow = function(e, selectedMarker){
      e.preventDefault();
      google.maps.event.trigger(selectedMarker, 'click');
  }


}]);
