angular.module('ItemService', []).factory('Item', ['$http', function($http) {
  return {
    // Call to get all items
    all : function() {
      return $http.get('/api/items');
    },
    // Call to POST and create a new item
    create : function(itemData) {
        return $http.post('/api/items', itemData);
    },
    // Call to DELETE an item
    delete : function(itemId) {
      return $http.delete('/api/items/' + itemId);
    },
    // Call to GET an item
    get : function(itemId) {
      return $http.get('/api/items/' + itemId);
    },
    // Call to update an item
    update : function(itemId, itemData) {
      return $http.put('/api/items/' + itemId, itemData);
    }
  }
}]);