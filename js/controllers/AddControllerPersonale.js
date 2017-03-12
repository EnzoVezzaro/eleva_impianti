app.controller('AddControllerPersonale', ['$scope', '$firebaseArray', '$location', "$filter",
  function($scope, $firebaseArray, $location, $filter ){

    var personaleSelected = new Firebase("https://eleva-7c284.firebaseio.com/personale/");
    $scope.personal = $firebaseArray(personaleSelected);

    var impianti = new Firebase("https://eleva-7c284.firebaseio.com/impianti/");
    $scope.impianti = $firebaseArray(impianti);

    // mask date
    $('.date').mask('00/00/0000');

    $scope.addPersonale = function() {

      var obj = $scope.personal.impianto;

      var keys = Object.keys(obj);

      var filtered = keys.filter(function(key) {
          return obj[key]
      });

      var array = $.map(filtered, function(value, index) {
          return [value];
      });

      var impiantoFormatted = array.join(" - ");

      $scope.personal.$add({
        nome: $scope.personal.nome,
        cognome: $scope.personal.cognome,
        email: $scope.personal.email,
        data_nascita : $scope.personal.data_nascita,
        ruolo: $scope.personal.ruolo,
        impianto: impiantoFormatted,
        impiantoCheckBox: $scope.personal.impianto
      });
      //
      $location.path('/dashboard');
  };

}]);
