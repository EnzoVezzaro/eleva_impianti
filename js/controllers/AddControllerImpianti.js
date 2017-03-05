app.controller('AddControllerImpianti', ['$scope', '$firebaseArray', '$location',
function($scope, $firebaseArray, $location){

  $scope.addImpianto = function() {
    var impiantiSelected = new Firebase("https://eleva-7c284.firebaseio.com/impianti/");
    var impianti = $firebaseArray(impiantiSelected);

    var indirizzo = $("#autocomplete").val();
    console.log(indirizzo);
    var street_number =  $("#street_number").val();
    console.log(street_number);
    var route =  $("#route").val();
    console.log(route);
    var citta =  $("#locality").val();
    console.log(citta);
    var regione =  $("#administrative_area_level_1").val();
    console.log(regione);
    var cap =  $("#postal_code").val();
    console.log(cap);
    var paese = $('#country').val();
    console.log(paese);
    var latt =  $("#latt").val();
    console.log(latt);
    var long =  $("#long").val();
    console.log(long);

    impianti.$add({
      nome_impianto: $scope.impianti.nome_impianto,
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
