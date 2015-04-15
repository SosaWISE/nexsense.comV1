var app = angular.module("MySite", []);

app.factory("Site", ['$http', '$window', function($http, $window) {
    return {
        userid: 1,
        navigateTo: function(page) {
        	$window.location.href = page;
        },
    }
}]);

app.factory("Messaging", [function() {
	var screenBlocks = 0;
	var __notificationTimeout = null;
	
	return {
		blockScreen: function() {
			var shadowEl = document.getElementById('_shadowOverlay_');
			if (shadowEl == null) {
				shadowEl = document.createElement("DIV");
				shadowEl.id = "_shadowOverlay_";
				shadowEl.style.margin = "0px";
				shadowEl.style.padding = "0px";
				shadowEl.style.opacity = "0.6";
				shadowEl.style.filter = "alpha(opacity=60)";
				shadowEl.style.backgroundColor = "#808080";
				shadowEl.style.position = "fixed";
				shadowEl.style.top = "0";
				shadowEl.style.left = "0";
				shadowEl.style.right = "0";
				shadowEl.style.bottom = "0";
				shadowEl.style.width = "100%";
				shadowEl.style.height =  "100%";
				shadowEl.style.zIndex = "99";
				document.body.appendChild(shadowEl);
			}
			shadowEl.style.display = "block";
			screenBlocks++;
		},
		unblockScreen: function() {
		    screenBlocks--;
		    if (screenBlocks == 0) {
		        var shadowEl = document.getElementById('_shadowOverlay_');
		        if (shadowEl != null) {
		            shadowEl.style.display = "none";
		        }
		    }
		},
		blockForMessage: function() {
		    var shadowEl = document.getElementById('_shadowMessageOverlay_');
		    if (shadowEl == null) {
		        shadowEl = document.createElement("DIV");
		        shadowEl.id = "_shadowMessageOverlay_";
					shadowEl.style.height = "100%";
		        document.body.appendChild(shadowEl);
		    }
		    shadowEl.style.display = "block";
		},
		unblockForMessage: function() {
		    var shadowEl = document.getElementById('_shadowMessageOverlay_');
		    if (shadowEl != null)
		        shadowEl.style.display = "none";
		},
		displayMessage: function(msg, isWarning, callbackFunction, isCancellable) {
		    if (isCancellable == null)
		        isCancellable = false;
		    this.blockForMessage();
		    var dFromTop = document.body.scrollTop;
		    if (dFromTop == 0) {
		        if (document.documentElement.scrollTop != null)
		            dFromTop = document.documentElement.scrollTop;
		    }
		    var msgBox = document.getElementById('_messageBox_');
		    var msgContainer = document.getElementById('_messageContainer_');
		    var msgOkButton = document.getElementById('_messageOkayButton_');
		    var msgCancelButton = document.getElementById('_messageCancelButton_');
		    var msgElementContainer = document.getElementById('_messageElementContainer_');
		    if (msgBox == null) {
		        msgBox = document.createElement("DIV");
		        msgBox.id = "_messageBox_";
		        
		        msgContainer = document.createElement("DIV");
		        msgContainer.id = "_messageContainer_";
		        msgContainer.style.minHeight = "70px";
		        msgBox.appendChild(msgContainer);
		        
		        msgElementContainer = document.createElement("DIV");
		        msgElementContainer.id = "_messageElementContainer_";
		        msgElementContainer.style.display = "none";
		        msgBox.appendChild(msgElementContainer);
		        
		        var okDiv = document.createElement("DIV");
		        okDiv.className = "_messageBox_ok_div_";
		        
		        msgCancelButton = document.createElement("INPUT");
		        msgCancelButton.id = "_messageCancelButton_";
		        msgCancelButton.type = "button";
		        msgCancelButton.className = "button cancel";
		        msgCancelButton.name = "_messageCancelButton_";
		        msgCancelButton.value = "cancel";
		        msgCancelButton.onclick = new Function("hideMessage(null)");
		        okDiv.appendChild(msgCancelButton);
		        okDiv.appendChild(document.createTextNode(" "));
		        
		        msgOkButton = document.createElement("INPUT");
		        msgOkButton.id = "_messageOkayButton_";
		        msgOkButton.type = "button";
		        msgOkButton.className = "button";
		        msgOkButton.name = "_messageOkayButton_";
		        msgOkButton.value = "okay";
		        okDiv.appendChild(msgOkButton);
		        msgBox.appendChild(okDiv);
		        
		        document.body.appendChild(msgBox);
		    }
		    
		    var $site = this;
		    if (callbackFunction != null && callbackFunction != undefined) {
		        msgOkButton.onclick = function() {
		        	$site.hideMessage(callbackFunction);
		        };
			} else {
		        isCancellable = false;
		        msgOkButton.onclick = function() {
		        	$site.hideMessage();
		        };
		    }
		    
		    if (isCancellable)
		        msgCancelButton.style.display = "inline";
		    else
		        msgCancelButton.style.display = "none";
		    
		    msgContainer.innerHTML = "";
		    msgElementContainer.innerHTML = "";
		    msgElementContainer.style.display = "none";
		    msgContainer.appendChild(document.createTextNode(msg));
		    if (isWarning)
		        msgContainer.className = "warning";
		    else
		        msgContainer.className = "message";
		    msgBox.style.top = '20px';
		    msgBox.style.display = "block";
		},
		hideMessage: function(callbackFunction) {
		    var el = document.getElementById('_messageBox_');
		    var msgEl = document.getElementById('_messageContainer_');
		    if (el != null && msgEl != null) {
		        msgEl.innerHTML = "";
		        el.style.display = "none";
		    }
		    this.unblockForMessage();
		    
		    if (callbackFunction != null && callbackFunction != undefined) {
		    	
		        callbackFunction();
		    }
		},
		appendElementToMessage: function(el) {
		    var container = document.getElementById('_messageElementContainer_');
		    container.style.display = "block";
		    container.appendChild(el);
		},
		displayWaitMessage: function(msg) {
		    this.blockForMessage();
		    var msgBox = document.getElementById('_waitmessageBox_');
		    var msgContainer = document.getElementById('_waitmessageText_');
		    var msgButton = document.getElementById('_waitmessageOkayButton_');
		    var waitImg = document.getElementById('_waitImage_');
		    var waitImgContainer = document.getElementById('_waitImgContainer_');
		    if (msgBox == null) {
		        msgBox = document.createElement("DIV");
		        msgBox.id = "_waitmessageBox_";
		        msgBox.className = "_waitmessageBox_";

		        waitImgContainer = document.createElement("DIV");
		        waitImgContainer.id = "_waitImgContainer_";
		        waitImgContainer.style.textAlign = "center";
		        waitImgContainer.style.padding = "0px 0px 20px 0px";
				  
					var waiter = new WaitIndicatorSpinner(waitImgContainer, 40, 40, {
						 color:"#222",
						 type:WaitIndicators.RoundPetalFlower,
						 petals:12,
						 sizeDecay:1,
						 alphaDecay:0.82,
						 rotationSpeed:(Math.PI*2)/1700, // radians per ms
						 pulseInterval:350,
						 display: true
					});
		        msgBox.appendChild(waitImgContainer);
				  
		        
		        msgContainer = document.createElement("DIV");
		        msgContainer.id = "_waitmessageText_";
		        msgContainer.style.minHeight = "70px";
				  msgContainer.style.textAlign = "center";
		        msgBox.appendChild(msgContainer);
		        
		        document.body.appendChild(msgBox);
		    }
		    msgContainer.innerHTML = "";
			 if (msg)
				msgContainer.appendChild(document.createTextNode(msg));
		    msgContainer.className = "message";
		    msgBox.style.display = "block";
		},
		hideWaitMessage: function() {
		    var el = document.getElementById('_waitmessageBox_');
		    var msgEl = document.getElementById('_waitmessageText_');
		    if (el != null && msgEl != null) {
		        msgEl.innerHTML = "";
		        el.style.display = "none";
		    }
		    this.unblockForMessage();
		},
		/***
		* Displays a notification message to the user.  It disappears automatically after a few seconds or it can be clicked to dismiss
		* @@param {string} messageText - the text to display to the user 
		* @returns {}
		*/
		displayNotification: function(messageText) {
		    var msgBoxEl = document.getElementById('__notificationElement__');
		    var msgText = document.getElementById('__notificationTextElement__');
		    if (!msgBoxEl) {
		        msgBoxEl = document.createElement("DIV");
		        msgBoxEl.id = "__notificationElement__";
		        msgBoxEl.onclick = hideNotification;
		        
		        msgText = document.createElement("DIV");
		        msgText.id = "__notificationTextElement__";
		        msgBoxEl.appendChild(msgText);
		        
		        document.body.appendChild(msgBoxEl);
		    }
		    msgText.innerHTML = messageText;
		    msgBoxEl.style.display = "block";
		    __notificationTimeout = setTimeout(hideNotification, 5000);
		},
		/***
		 * Hides any displayed notification from the screen
		 * @returns {}
		 */
		hideNotification: function() {
		    var msgBoxEl = document.getElementById('__notificationElement__');
		    if (msgBoxEl) {
		        msgBoxEl.style.display = "none";
		    }
		},
    };
}]);

app.factory("States", function() {
	return {
		statelist: [
			{ code:'AL', name:'Alabama' },
			{ code:'AK', name:'Alaska' },
			{ code:'AZ', name:'Arizona' },
			{ code:'AR', name:'Arkansas' },
			{ code:'CA', name:'California' },
			{ code:'CO', name:'Colorado' },
			{ code:'CT', name:'Connecticut' },
			{ code:'DE', name:'Delaware' },
			{ code:'FL', name:'Florida' },
			{ code:'GA', name:'Georgia' },

			{ code:'HI', name:'Hawaii' },
			{ code:'ID', name:'Idaho' },
			{ code:'IL', name:'Illinois' },
			{ code:'IN', name:'Indiana' },
			{ code:'IA', name:'Iowa' },
			{ code:'KS', name:'Kansas' },
			{ code:'KY', name:'Kentucky' },
			{ code:'LA', name:'Louisiana' },
			{ code:'ME', name:'Maine' },
			{ code:'MD', name:'Maryland' },

			{ code:'MA', name:'Massachusetts' },
			{ code:'MI', name:'Michigan' },
			{ code:'MN', name:'Minnesota' },
			{ code:'MS', name:'Mississippi' },
			{ code:'MO', name:'Missouri' },
			{ code:'MT', name:'Montana' },
			{ code:'NE', name:'Nebraska' },
			{ code:'NV', name:'Nevada' },
			{ code:'NH', name:'New Hampshire' },
			{ code:'NJ', name:'New Jersey' },

			{ code:'NM', name:'New Mexico' },
			{ code:'NY', name:'New York' },
			{ code:'NC', name:'North Carolina' },
			{ code:'ND', name:'North Dakota' },
			{ code:'OH', name:'Ohio' },
			{ code:'OK', name:'Oklahoma' },
			{ code:'OR', name:'Oregon' },
			{ code:'PA', name:'Pennsylvania' },
			{ code:'RI', name:'Rhode Island' },
			{ code:'SC', name:'South Carolina' },

			{ code:'SD', name:'South Dakota' },
			{ code:'TN', name:'Tennessee' },
			{ code:'TX', name:'Texas' },
			{ code:'UT', name:'Utah' },
			{ code:'VT', name:'Vermont' },
			{ code:'VA', name:'Virginia' },
			{ code:'WA', name:'Washington' },
			{ code:'WV', name:'West Virginia' },
			{ code:'WI', name:'Wisconsin' },
			{ code:'WY', name:'Wyoming' },
		]
	}
});



var stdWaitIndicatorWidth = 40;
var stdWaitIndicatorHeight = 40;
var stdWaitIndicatorOpts = {
	color:"#fff",
	type:WaitIndicators.RoundPetalFlower,
	petals:12,
	sizeDecay:1,
	alphaDecay:0.82,
	rotationSpeed:(Math.PI*2)/1700, // radians per ms
	pulseInterval:350,
	display: true
};

app.factory("FormValidation", function() {
	return {
		phone: /^([0-9]{3}|\([0-9]{3}\))[\-\.\s]?[0-9]{3}[\-\.\s]?[0-9]{4}$/,
		email: /^[a-zA-Z0-9\-_\.]+@[a-zA-Z0-9\-_\.]+\.[a-zA-Z]+$/,
		zip: /^[0-9]{5}$/,
	}
});

app.filter('dollars', function() {
    return function(input) {
        var prefix = String(Math.floor(Math.abs(input)));
        for (var i = prefix.length - 3; i > 0; i -= 3) {
            prefix = prefix.substring(0, i) + ',' + prefix.substring(i);
            i--;
        }

        var retval = input < 0 ? '-$' + prefix : '$' + prefix;
        return retval;
    }
});
app.filter('cents', function() {
    return function(input) {
        var dolly = Math.floor(Math.abs(input));
        var dolly = Math.abs(input) - dolly;
        if (dolly == 0)
            return '.00';
        cents = String(Math.round(dolly * 100));
        while (cents.length < 2) {
            if (dolly < 10)
                cents = '0' + cents;
            else
                cents += '0';
        }
        return '.' + cents;
    }
});

app.directive("header", ['Site', '$window', function($site, $window) {
	return {
		restrict: 'E',
		templateUrl: '/view/templates/header.html',
		link: function($scope, element, attrs) {
			$scope.$site = $site;
			$scope.getMenuIsDisplayed = function() {
				if (window.innerWidth >= 768)
					$scope.menuIsDisplayed = true;
				return $scope.menuIsDisplayed;
			};

			$scope.toggleMenu = function() {
				$scope.menuIsDisplayed = !$scope.menuIsDisplayed;
			}

			angular.element($window).bind('resize', function() {
				$scope.$apply(function() {
					if (window.innerWidth >= 768)
						$scope.menuIsDisplayed = true;
					else
						$scope.menuIsDisplayed = false;
				});
			});
			angular.element($window).bind('load', function() {
				if (window.innerWidth >= 768)
					$scope.menuIsDisplayed = true;
				else
					$scope.menuIsDisplayed = false;
			});
		},
	};
}]);

app.directive("footer", ['Site', function($site) {
	return {
		restrict: 'E',
		templateUrl: '/view/templates/footer.html',
	};
}]);





/*** Google Analytics ***/
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-53740805-1', 'auto');
ga('send', 'pageview');

/*** Facebook Ad tracking ***/
(function() {
	var _fbq = window._fbq || (window._fbq = []);
	if (!_fbq.loaded) {
		var fbds = document.createElement('script');
		fbds.async = true;
		fbds.src = '//connect.facebook.net/en_US/fbds.js';
		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(fbds, s);
		_fbq.loaded = true;
	}
})();
// Simplified method for tracking facebook traffic
function trackFBfunnel(trackingCode) {
	//console.log('track FB funnel');
	window._fbq = window._fbq || [];
	window._fbq.push(['track', trackingCode, {'value':'0.00','currency':'USD'}]);
}

