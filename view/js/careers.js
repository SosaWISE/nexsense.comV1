app.controller("CareersPage", ['$scope', '$http', '$sce', '$window', 'FormValidation', function($scope, $http, $sce, $window, validation) {
	$scope.validation = validation;

	$scope.jobs = [
		/*{
			id: 'office-manager',
			title: 'Office Manager',
			blurb: "Nexsense is looking for an Office Manager to work in the Phoenix, Arizona office to coordinate tasks between the corporate office and local Sales Manager",
			url: 'https://nexsense.applicantpro.com/jobs/175784-37067.html',
			location: 'Phoenix, AZ',
			description: null,
		},
		{
			id: 'lead-technician',
			title: 'Lead Technician',
			blurb: "We're looking for a Lead Technician for our Phoenix, Arizona office who can manage and direct the Installation and Service Technicians in that area.",
			url: 'https://nexsense.applicantpro.com/jobs/175732-37067.html',
			location: 'Phoenix, AZ',
			description: null,
		},
		{
			id: 'lead-technician',
			title: 'Lead Technician',
			blurb: "We're looking for a Lead Technician for our Phoenix, Arizona office who can manage and direct the Installation and Service Technicians in that area.",
			url: 'https://nexsense.applicantpro.com/jobs/175564-37067.html',
			location: 'Orem, UT',
			description: null,
		},
		*/{
			id: 'outside-sales-rep',
			title: 'Outside Sales Rep',
			blurb: "Now searching for Outside Sales reps who are ready to do more than just be an Outside Sales Rep.",
			url: 'sell-for-nexsense#/UT/orem',
			location: 'Orem, UT',
			description: null,
		},
		{
			id: 'outside-sales-rep',
			title: 'Outside Sales Rep',
			blurb: "Now searching for Outside Sales reps who are ready to do more than just be an Outside Sales Rep.",
			url: 'sell-for-nexsense#/FL/tampa',
			location: 'Tampa, FL',
			description: null,
		},
		{
			id: 'outside-sales-mgr',
			title: 'Sales Manager',
			blurb: "Now searching for an excellent Sales Manager who's ready to change the world.",
			url: 'sales-manager#/CO',
			location: 'Colorado',
			description: null,
		},
		{
			id: 'outside-sales-mgr',
			title: 'Sales Manager',
			blurb: "Now searching for an excellent Sales Manager who's ready to change the world.",
			url: 'sales-manager#/IN',
			location: 'Indiana',
			description: null,
		},
		{
			id: 'outside-sales-mgr',
			title: 'Sales Manager',
			blurb: "Now searching for an excellent Sales Manager who's ready to change the world.",
			url: 'sales-manager#/FL',
			location: 'Florida',
			description: null,
		},
		{
			id: 'outside-sales-mgr',
			title: 'Sales Manager',
			blurb: "Now searching for an excellent Sales Manager who's ready to change the world.",
			url: 'sales-manager#/TX',
			location: 'Texas',
			description: null,
		},
		{
			id: 'outside-sales-mgr',
			title: 'Sales Manager',
			blurb: "Now searching for an excellent Sales Manager who's ready to change the world.",
			url: 'sales-manager#/AZ',
			location: 'Arizona',
			description: null,
		},
		{
			id: 'outside-sales-mgr',
			title: 'Sales Manager',
			blurb: "Now searching for an excellent Sales Manager who's ready to change the world.",
			url: 'sales-manager#/PA',
			location: 'Pennsylvania',
			description: null,
		},
		{
			id: 'outside-sales-mgr',
			title: 'Sales Manager',
			blurb: "Now searching for an excellent Sales Manager who's ready to change the world.",
			url: 'sales-manager#/MO',
			location: 'Missouri',
			description: null,
		},
		{
			id: 'outside-sales-mgr',
			title: 'Sales Manager',
			blurb: "Now searching for an excellent Sales Manager who's ready to change the world.",
			url: 'sales-manager#/VA',
			location: 'Virginia',
			description: null,
		},
		/*
		{
			id: 'customer-service-rep',
			title: 'Customer Service Rep',
			blurb: "Now looking for outgoing personalities who can think on their feet and make someone say, \"wow\" every single day.",
			url: 'https://nexsense.applicantpro.com/jobs/148967-37068.html',
			location: 'Orem, UT',
			description: null,
		},
		{
			id: 'inside-sales-rep',
			title: 'Inside Sales Rep',
			blurb: "If you can close a deal and have a fun personality that matches with our family culture, we’d like to learn more about you.",
			url: 'https://nexsense.applicantpro.com/jobs/172876-37067.html',
			location: 'Orem, UT',
			description: null,
		},*/
	];
	$scope.activejob = null;

	$scope.setActiveJob = function(job) {
		if ($scope.activejob == job) {
			$scope.activejob = null;
			return;
		}
		$scope.activejob = job;
		if (!$scope.activejob.description) {
			$http.get("/view/jobs/" + $scope.activejob.id + ".html", {}).
			success(function(data) {
				$scope.activejob.description = $sce.trustAsHtml(data);
			}).error(function(data) {
				console.log("error getting job description");
			});
		}
	}

	$scope.navigateTo = function(url) {
		$window.location = url;
	}

}]);

