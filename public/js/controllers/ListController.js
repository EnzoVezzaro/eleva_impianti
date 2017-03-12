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
      // $scope.closeDialogPersonale();
    };

     $scope.removeImpianti = function(id) {
       var ref = new Firebase("https://eleva-7c284.firebaseio.com/impianti/" + id);
       var impiantiRem = $firebaseObject(ref);
       impiantiRem.$remove();
      //  $scope.closeDialogImpianti();
    };

    $scope.openDialogPersonale = function() {

      $(".delete-personale").css("display","flex");
      $(".delete-personale").css("transform","translateY: 0px");

   };

    $scope.closeDialogPersonale = function() {

     $(".delete-personale").css("transform","translateY: -500px");
     $(".delete-personale").css("display","none");

    };

    $scope.openDialogImpianti = function() {

      $(".delete-impianti").css("display","flex");
      $(".delete-impianti").css("transform","translateY: 0px");

   };

    $scope.closeDialogImpianti = function() {

     $(".delete-impianti").css("transform","translateY: -500px");
     $(".delete-impianti").css("display","none");

    };

  }
]);
