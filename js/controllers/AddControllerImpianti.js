app.controller('AddControllerImpianti', ['$scope', '$firebaseArray', '$location',
function($scope, $firebaseArray, $location){

  $scope.addImpianto = function() {
    var impiantiSelected = new Firebase("https://eleva-7c284.firebaseio.com/impianti/");
    var impianti = $firebaseArray(impiantiSelected);

    var nome_impianto = $scope.impianti.nome_impianto;
    var nome_impianto_formatted = nome_impianto.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&\;\:\'\"])/g, " ");
    var indirizzo = $("#autocomplete").val();
    var street_number =  $("#street_number").val();
    var route =  $("#route").val();
    var citta =  $("#locality").val();
    var regione =  $("#administrative_area_level_1").val();
    var cap =  $("#postal_code").val();
    var paese = $('#country').val();
    var latt =  $("#latt").val();
    var long =  $("#long").val();

    impianti.$add({
      nome_impianto: nome_impianto_formatted,
      indirizzo: indirizzo,
      street_number: street_number,
      route: route,
      citta: citta,
      regione: regione,
      paese: paese,
      cap: cap,
      long: long,
      latt: latt
    });

    $location.path('/dashboard');
  };

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
          nome: info.nome_impianto,
          indirizzo: info.indirizzo,
          street_number: info.street_number,
          route: info.route,
          citta: info.citta,
          regione: info.regione,
          cap: info.cap,
          paese: info.paese
      });

      marker.content = info.latt + ' E,' + info.long +  ' N, </div>';

      google.maps.event.addListener(marker, 'click', function(){
          infoWindow.setContent('<h2>' + marker.nome + '</h2>' + marker.indirizzo);
          infoWindow.open($scope.map, marker);

          document.getElementById("nome_impianto").value = marker.nome;
          document.getElementById("autocomplete").value = marker.indirizzo;
          document.getElementById("street_number").value = marker.street_number;
          document.getElementById("route").value = marker.route;
          document.getElementById("locality").value = marker.citta;
          document.getElementById("administrative_area_level_1").value = marker.regione;
          document.getElementById("postal_code").value = marker.cap;
          document.getElementById("country").value = marker.paese;

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

  // Google Maps Autocomplete
  // This example displays an address form, using the autocomplete feature
  // of the Google Places API to help users fill in the information.

  // This example requires the Places library. Include the libraries=places
  // parameter when you first load the API. For example:
  // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

  var placeSearch, autocomplete;
  var componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name',
    postal_code: 'short_name'
  };

  $("#autocomplete").focus(function(){
    initAutocomplete();
    geolocate();
  });

  function initAutocomplete() {
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
        {
          types: ['geocode'],
          componentRestrictions: {country: 'it'}
        });

    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    autocomplete.addListener('place_changed', fillInAddress);
  }

  function fillInAddress() {
    // Get the place details from the autocomplete object.
    var place = autocomplete.getPlace();

    document.getElementById("latt").value = (place.geometry.location.lat()).toFixed(3);
    document.getElementById("long").value = (place.geometry.location.lng()).toFixed(3);


    for (var component in componentForm) {
      document.getElementById(component).value = '';
      document.getElementById(component).disabled = true;
    }

    // Get each component of the address from the place details
    // and fill the corresponding field on the form.
    for (var i = 0; i < place.address_components.length; i++) {
      var addressType = place.address_components[i].types[0];
      if (componentForm[addressType]) {
        var val = place.address_components[i][componentForm[addressType]];
        document.getElementById(addressType).value = val;
      }
    }
  }

  // Bias the autocomplete object to the user's geographical location,
  // as supplied by the browser's 'navigator.geolocation' object.
  function geolocate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        var circle = new google.maps.Circle({
          center: geolocation,
          radius: position.coords.accuracy
        });
        autocomplete.setBounds(circle.getBounds());
      });
    }
  }

}]);
