angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

  $routeProvider
    // Home page
    .when('/', {
      templateUrl: 'views/home.html',
      controller: 'MainController'
    })
    // Items page that will use the ItemController
    .when('/items', {
      templateUrl: 'views/item.html',
      controller: 'ItemController'
    });
      
  $locationProvider.html5Mode(true);
}]);