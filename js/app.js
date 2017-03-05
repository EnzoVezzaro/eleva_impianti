var app = angular.module('myApp', ['ngRoute', 'firebase']);


app.config(function($routeProvider){
  $routeProvider
  .when('/', {
    controller: 'HomeController',
    templateUrl: 'views/home.html'
  })
  .when('/dashboard', {
    controller: 'ListController',
    templateUrl: 'views/list.html'
  })
  .when('/addPersonale', {
    controller: 'AddControllerPersonale',
    templateUrl: 'views/addPersonale.html'
  })
  .when('/editPersonale/:id', {
    controller: 'EditControllerPersonale',
    templateUrl: 'views/editPersonale.html'

  })
  .when('/addImpianti', {
    controller: 'AddControllerImpianti',
    templateUrl: 'views/addImpianti.html'
  })
  .when('/editImpianti/:id', {
    controller: 'EditControllerImpianti',
    templateUrl: 'views/editImpianti.html'

  })
  .otherwise({
    redirectTo: '/'
  });
});



app.constant('FBURL',
  'https://eleva-7c284.firebaseio.com/'
  //Use the URL of your project here with the trailing slash
);
