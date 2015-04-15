app.controller("HomeAutomationPage", ['$scope', '$http', 'Site', function($scope, $http, $site) {
    $scope.$site = $site;
    $site.pageName = 'home-automation';

}]);