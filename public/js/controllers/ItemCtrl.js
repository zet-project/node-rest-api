angular.module('ItemCtrl', ['ItemService']).controller('ItemController', ['$scope', 'Item', function($scope, Item) {
  $scope.tagline = 'Create, read, update and remove items.';
  $scope.items = [];
  Item.all().then(function(resp) {0
    $scope.items = resp.data;
  });
}]);