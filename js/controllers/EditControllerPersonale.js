app.controller('EditControllerPersonale', ['$scope','$location', '$routeParams', '$firebaseObject',
  function($scope, $location, $routeParams, $firebaseObject){

    var refEdit = new Firebase("https://eleva-7c284.firebaseio.com/personale/" + $routeParams.id);
    $scope.personal = $firebaseObject(refEdit);

    var impianti = new Firebase("https://eleva-7c284.firebaseio.com/impianti/");
    $scope.impianti = $firebaseObject(impianti);

    $('.date').mask('00/00/0000');

    $scope.editPersonale = function() {

      console.log($scope.personal.impianto);

      $scope.personal.$save({
        nome: $scope.personal.nome,
        cognome: $scope.personal.cognome,
        email: $scope.personal.email,
        data_nascita : $scope.personal.data_nascita,
        ruolo: $scope.personal.ruolo,
        impianto: $scope.personal.impianto
      });

      $scope.edit_form.$setPristine();
      $scope.personal = {};
      $location.path('/dashboard');

    };

  }
]);
