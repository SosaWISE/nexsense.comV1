app.controller("ProductsPage", ['$scope', '$http', 'Site', function($scope, $http, $site) {
    $scope.$site = $site;
    $site.pageName = 'products';

    $scope.productList = [
    	{id:'control-panel',name:'Control panel',points:0,},
    	{id:'door-window-contact',name:'Door/window contact',points:1,},
    	{id:'recessed-door-contact',name:'Recessed door contact',points:1,},
    	{id:'medical-pendant',name:'Medical pendant',points:1,},
    	{id:'key-fob',name:'Key fob',points:1,},
    	{id:'firefighter',name:'Firefighter',points:1,},
    	{id:'doorbell',name:'Wireless doorbell',points:1,},
    	{id:'garage-door-receiver',name:'Garage door receiver',points:1,},
    	{id:'light-bulb',name:'Z-wave light bulb',points:1,},
    	{id:'appliance-module',name:'Z-wave appliance module',points:1,},
    	{id:'dimmer',name:'Z-wave dimmer',points:1,},
    	{id:'light-switch',name:'Z-wave light switch',points:1,},
    	{id:'motion-detector',name:'Motion detector',points:1.5,},
    	{id:'glass-break-detector',name:'Glass break detector',points:1.5,},
    	{id:'smoke-detector',name:'Smoke detector',points:1.5,},
    	{id:'co-detector',name:'CO detector',points:2,},
    	{id:'thermostat',name:'Thermostat',points:2.5,},
    	{id:'camera',name:'Security camera',points:4,},
    	{id:'door-lock',name:'Kwikset door lock',points:4,},
    ];
}]);