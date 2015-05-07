app.controller("ContactPage", ['$scope', '$http', 'Site', 'Messaging', 'FormValidation', function($scope, $http, $site, $msg, validation) {
    $scope.$site = $site;
    $site.pageName = 'contact';
    $scope.validation = validation;

    $scope.departmentList = [
  //  	{ name:'Billing', email:'billing' },
  //  	{ name:'Sales', email:'sales' },
  //  	{ name:'Customer service and Technical support', email:'support' },
    	{ name:'Affiliate and B2B Sales', email:'b2b' },
    ];

    $scope.message = {
    	name: '',
    	email: '',
    	department: 'b2b',
    	message: '',
    };


    $scope.resetvars = function() {
    	$scope.message.name = '';
    	$scope.message.email = '';
    	$scope.department = 'b2b';
    	$scope.message = '';
		$scope.submitAttempted = false;
    }

    $scope.sendMessage = function() {
        $scope.submitAttempted = true;
        console.log('submitAttempted');

        if (!$scope.messageForm.$valid) {
            $msg.displayMessage("There were some problems with your information.  Please check the marked fields and try again.", true);
            return;
        }

        // replace the submit button with a wait icon
        $scope.isSubmitting = true;

        // send the application
        $http({
            method: 'POST',
            url: 'ng/Contact/send_message',
            data: {
                name: $scope.message.name,
                email: $scope.message.email,
                department: $scope.message.department,
                message: $scope.message.message,
            }
        }).success(function(data, status, headers, config) {
            $scope.isSubmitting = false;
            console.log(data);
            $msg.displayMessage("Your message was successfully sent to Nexsense.  We'll get back to you as soon as we can!");
            $scope.resetvars();
            $scope.messageForm.$setPristine();
        }).error(function(data, status, headers, config) {
            console.log("ERROR");
            $msg.displayMessage("There was a problem submitting your message.  Please ensure all fields are complete or call customer service.", true);
            $scope.isSubmitting = false;
        });
    }

    // create a wait indicator for when the user presses the submit button
    angular.element(window).bind('load', function() {
        $scope.applicationWaitSpinner = new WaitIndicatorSpinner(document.getElementById('form-wait'), stdWaitIndicatorWidth, stdWaitIndicatorHeight, stdWaitIndicatorOpts);
    });

}]);