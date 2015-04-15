app.controller("SellForNexsensePage", ['$scope', '$http', '$location', 'FormValidation', function($scope, $http, $location, validation) {
	$scope.validation = validation;
	$scope.salesArea = '84097';

	console.log($location.path());

	var state = $location.path().substring($location.path().lastIndexOf('/')+1);
	$scope.areas = "";
	var states = {
		'CO':'Denver',
		'IN':'Indianapolis and Fort Wayne or Gary',
		'FL':'Miami, Orlando and Jacksonville',
		'TX':'Dallas/Ft Worth and Houston or San Antonio',
		'AZ':'Phoenix, Mesa or Gilbert',
		'PA':'Pittsburgh and Philadelphia',
		'MO':'St Louis, Kansas City and Columbia or Springfield',
		'VA':'Richmond and Virginia Beach or Norfolk',
	};
	$scope.areas = states[state];

	// submit this conversion to facebook
	trackFBfunnel('6022829503819');
	
	$scope.resetvars = function() {
		$scope.hasExperience = 'yes';
		$scope.firstName = '';
		$scope.lastName = '';
		$scope.phone = '';
		$scope.email = '';
		$scope.zip = '';

		$scope.salesExperience = '';
		$scope.sellYourself = '';

		$scope.resumeData = '';
		$scope.resumeFilename = '';

		$scope.step = 2;
		$scope.isSubmitting = false;

		$scope.submitAttempted = false;

		$scope.workHistory = [
			{companyName: '', yearsWorked:0, annualSales: 0}
		];
	}
	$scope.resetvars();

	$scope.addWorkHistory = function() {
		$scope.workHistory.push({companyName: '', yearsWorked:0, annualSales: 0});
	}

	$scope.removeWorkHistory = function(idx) {
		$scope.workHistory.splice(idx, 1);
	}

	// Count the characters used in the Sell Yourself textarea and report to the user how many he has left
	$scope.updateCharsRemaining = function() {
		var allowedChars = 140;
		var chars = $scope.sellYourself ? $scope.sellYourself.length : 0;
		var availableChars = allowedChars - chars;

		var text = availableChars + " characters remaining";
		if (Math.abs(availableChars) == 1)
			text = availableChars + " character remaining";
		document.getElementById('chars-remaining').innerHTML = text;
		if (availableChars < 0)
			document.getElementById('chars-remaining').className = "warning";
		else
			document.getElementById('chars-remaining').className = null;
	}

	$scope.chooseResume = function(elId) {
		document.getElementById(elId).click();
	}

	$scope.useResume = function(fileInput) {
		if (fileInput.files.length) {
			console.log('got resume');
			var reader = new FileReader();
			reader.onload = function(e) {
				$scope.resumeData = e.target.result;
				$scope.$apply(function() {
					$scope.resumeFilename = fileInput.value;
				});
			}
			reader.readAsDataURL(fileInput.files[0]);
		}
	}


	// Validate and submit the application
	$scope.submitApplication = function() {
		$scope.submitAttempted = true;

		if (!$scope.appForm.$valid) {
			displayMessage("There were some problems with your application.  Please check your information and try again.", true);
			return;
		}

		var postData = {
			firstName: $scope.firstName,
			lastName: $scope.lastName,
			phone: $scope.phone,
			email: $scope.email,
			resume: $scope.resumeData,
			zip: $scope.zip,
			sellYourself: $scope.sellYourself,
			position: 'sales-mgr',
			office: state+'-',
		}
		if ($scope.hasExperience == 'yes') {
			postData.workHistory = $scope.workHistory;
		}
		else {
			postData.salesExperience = $scope.salesExperience;
		}

		// replace the submit button with a wait icon
		$scope.isSubmitting = true;

		// submit this conversion to facebook
		trackFBfunnel('6022829915219');

		// send the application
		$http({
			method: 'POST',
			url: '/model/upload-resume.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: postData
		}).
		success(function(data, status, headers, config) {
			console.log("success");
			console.log(data);
			displayMessage("Your application was successfully sent to Nexsense.  Thanks for applying.");
			$scope.isSubmitting = false;
			$scope.resetvars();
			$scope.appForm.$setPristine();
		}).error(function(data, status, headers, config) {
			console.log("ERROR");
			console.log(data);
			displayMessage("There was a problem submitting your application.  Please ensure all fields are complete.", true);
			$scope.isSubmitting = false;
		});
	}

	// create a wait indicator for when the user presses the submit button
	angular.element(window).bind('load', function() {
        $scope.applicationWaitSpinner = new WaitIndicatorSpinner(document.getElementById('application-wait'), stdWaitIndicatorWidth, stdWaitIndicatorHeight, stdWaitIndicatorOpts);
    });
}]);
