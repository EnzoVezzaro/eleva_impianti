app.controller('ListController', ['$scope', '$firebaseArray', '$firebaseObject',
  function($scope,$firebaseArray,$firebaseObject){

    var personale = new Firebase("https://eleva-7c284.firebaseio.com/personale/");
    $scope.personale = $firebaseArray(personale);

    var impianti = new Firebase("https://eleva-7c284.firebaseio.com/impianti/");
    $scope.impianti = $firebaseArray(impianti);

    $scope.removePersonale = function(id) {
      console.log(id);
      var ref = new Firebase("https://eleva-7c284.firebaseio.com/personale/" + id);
      var personal = $firebaseObject(ref);
      personal.$remove();
    };

     $scope.removeImpianti = function(id) {
       var ref = new Firebase("https://eleva-7c284.firebaseio.com/impianti/" + id);
       var impiantiRem = $firebaseObject(ref);
       impiantiRem.$remove();
    };


  }
]);
