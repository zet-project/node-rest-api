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
    })
    // New item page that will use the ItemController
    .when('/new-item', {
      templateUrl: 'views/new-item.html',
      controller: 'ItemController'
    })
    // Edit item page that will use the ItemController
    .when('/items/:item_id', {
      templateUrl: 'views/edit-item.html',
      controller: 'ItemController'
    });
      
  $locationProvider.html5Mode(true);
}]);