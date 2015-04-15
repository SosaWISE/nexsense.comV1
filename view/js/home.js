app.controller("HomePage", ['$scope', '$http', 'Site', function($scope, $http, $site) {
    $scope.$site = $site;
}]);