angular.module('ItemCtrl', ['ItemService']).controller('ItemController', ['$scope', '$rootScope', '$location', 'Item', function($scope, $rootScope, $location, Item) {
  $scope.tagline = 'Create, read, update and remove items.';
  $scope.items = [];
  $scope.item = { name: "" };
  // Get all items
  Item.all().then(function(resp) {
    $scope.items = resp.data;
  });
  // Add new item to database
  $scope.createNewItem = function() {
    
    Item.create(this.item).then(function() {
      $location.path('/items');
      $scope.item.name = "";
    });
  };
  
}]);