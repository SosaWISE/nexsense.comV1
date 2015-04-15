app.controller("SupportPage", ['$scope', '$http', 'Site', '$sce', function($scope, $http, $site, $sce) {
    $scope.$site = $site;
    $site.pageName = 'support';


    $scope.faqList = [
    	{
    		question: $sce.trustAsHtml("Can I really get a discount for my homeowner’s insurance?"),
    		answer: $sce.trustAsHtml("Most likely. Many insurance companies provide a discount on home security systems that can be up to 20%. Call up your insurance provider to find out how much you can save."),
    	},
    	{
    		question: $sce.trustAsHtml("How do I adjust my contact list?"),
    		answer: $sce.trustAsHtml("Simply contact customer service at 385-375-8100. Have your verbal passcode handy."),
    	},
    	{
    		question: $sce.trustAsHtml("Why do I have a verbal passcode and a master user code?"),
    		answer: $sce.trustAsHtml("Good question. Your verbal passcode is used to verify ownership during an alarm and should only be shared with members of your household. The master user code is for administration of the system. Stuff like setting user codes and managing setting."),
    	},
    	{
    		question: $sce.trustAsHtml("How often should my system be tested?"),
    		answer: $sce.trustAsHtml("To make sure your system is doing its job, it should be tested at least once a month."),
    	},
    	{
    		question: $sce.trustAsHtml("Can I move my system equipment myself?"),
    		answer: $sce.trustAsHtml("If you want to move a sensor within your home just give us a call at 385.375.8100 and we’ll walk you through the simple process.<br/>If you’re moving to a new address, leave your system. It’s tied to your current address and could cause some serious issues if moved. Check out our moving warrant, or contact us at 385.375.8150 or support@nexsense.com so we can talk about your options."),
    	},
    	{
    		question: $sce.trustAsHtml("What happens when my security system is triggered?"),
    		answer: $sce.trustAsHtml("When a sensor is triggered, it sends a signal to the wall panel. The panel then signals the central monitoring station where an operator will attempt to make a contact either through your panel or your emergency contact number. If no one responds or the verbal passcode is not provided, the appropriate emergency contact will be dispatched depending on the sensor triggered."),
    	},
    	{
    		question: $sce.trustAsHtml("Can I change my billing date?"),
    		answer: $sce.trustAsHtml("Sure you can. Give us a call at 385.375.8100 and we’ll help you out."),
    	},
    	{
    		question: $sce.trustAsHtml("How do I pay for my monitoring service?"),
    		answer: $sce.trustAsHtml("There are a few ways. You can provide us with a credit card number, or set up auto payment with a Nexsense sales representative or technician on the date of installation.  Oops! You missed a payment? No big deal, just contact us as soon as possible at 385.375.8150 or <a href='mailto:billing@nexsense.com'>billing@nexsense.com</a>.<br/><br/>Checks can be mailed to:<br/>722 East Technology Ave<br/>Building E, Ste. 1100<br/>Orem, UT 84097"),
    	},
    	{
    		question: $sce.trustAsHtml("What is a false alarm fee?"),
    		answer: $sce.trustAsHtml("A false alarm signals for help where none is needed, and fees for this are determined by the individual cities/municipalities where the monitoring system is located. Nexsense does not charge or collect these fees.  Contact your local government facility for more information about your area's policies."),
    	},
    	{
    		question: $sce.trustAsHtml("What is the cancellation policy?"),
    		answer: $sce.trustAsHtml("Generally, you have three days from the moment you sign to cancel your home security agreement.  However, if you have a special circumstance don’t hesitate to give us a call.  We’d be happy to see what we can do to help."),
    	},
    	{
    		question: $sce.trustAsHtml("I’m planning to move to a new home.  What do I do with the security system?"),
    		answer: $sce.trustAsHtml("Nexsense customers who are in good standing and moving to an area we service are eligible to receive a new 8-point system for their new home. Just give us a call at 385.375.8130 or email us at <a href='mailto:support@nexsense.com'>support@nexsense.com</a> 30 days prior to your move."),
    	},
    ];

}]);