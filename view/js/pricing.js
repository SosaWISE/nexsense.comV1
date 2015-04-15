app.controller("PricingPage", ['$scope', '$http', 'Site', 'Messaging', 'FormValidation', function($scope, $http, $site, $msg, validation) {
    $scope.validation = validation;
    $scope.$site = $site;
    $site.pageName = 'pricing';


    $scope.productList = [
        {id:'door-window-contact',name:'Door/window contact',points:1,qty:1},
        {id:'recessed-door-contact',name:'Recessed door contact',points:1,qty:1},
        {id:'medical-pendant',name:'Medical pendant',points:1,qty:1},
        {id:'key-fob',name:'Key fob',points:1,qty:1},
        {id:'firefighter',name:'Firefighter',points:1,qty:1},
        {id:'doorbell',name:'Wireless doorbell',points:1,qty:1},
        {id:'garage-door-receiver',name:'Garage door receiver',points:1,qty:1},
        {id:'light-bulb',name:'Z-wave light bulb',points:1,qty:1},
        {id:'appliance-module',name:'Z-wave appliance module',points:1,qty:1},
        {id:'dimmer',name:'Z-wave dimmer',points:1,qty:1},
        {id:'light-switch',name:'Z-wave light switch',points:1,qty:1},
        {id:'motion-detector',name:'Motion detector',points:1.5,qty:1},
        {id:'glass-break-detector',name:'Glass break detector',points:1.5,qty:1},
        {id:'smoke-detector',name:'Smoke detector',points:1.5,qty:1},
        {id:'co-detector',name:'CO detector',points:2,qty:1},
        {id:'thermostat',name:'Thermostat',points:2.5,qty:1},
        {id:'camera',name:'Security camera',points:4,qty:1},
        {id:'door-lock',name:'Kwikset door lock',points:4,qty:1},
    ];

    $scope.activationFee = 69;

    $scope.contractLength = 0;
    $scope.contractString = "Cancel anytime";

    $scope.downPayment = 200;
    $scope.getDownPayment = function() {
        var value = $scope.downPayment - 1;
        if (value < 0)
            value = 0;
        return value;
    }

    $scope.monthlyPayment = 49.99;
    $scope.dueToday = 0;
    $scope.previousPhase = 1;
    $scope.phase = 1;


    $scope.$watch('contractLength', function() {
        $scope.updatePricing();
    });
    $scope.$watch('downPayment', function() {
        $scope.updatePricing();
    });

    $scope.updatePricing = function() {

        var startingPrices = {
            '0':54.99,
            '100':52.99,
            '200':49.99,
            '300':47.99,
            '400':44.99,
            '500':42.99,
            '600':40.99,
        };
        var contractDiscount = {
            '0':0,
            '12':2,
            '24':4,
            '36':5,
            '48':6,
            '60':7,
        }
        var activationDiscount = {
            '0':0,
            '100':0,
            '200':0.10,
            '300':0.20,
            '400':0.25,
            '500':0.30,
            '600':0.30,
        }

        var mrate = startingPrices[$scope.downPayment];
        mrate -= contractDiscount[$scope.contractLength];

        var paytoday = Math.round($scope.activationFee * (1 - activationDiscount[$scope.downPayment])) + $scope.getDownPayment();

        $scope.monthlyPayment = mrate;
        $scope.dueToday = paytoday;
    }




    /*** Chose Equipment ***/
    $scope.carouselOffset = 0;
    $scope.scrollLeft = function() {
        $scope.carouselOffset -= 160;
        if ($scope.carouselOffset < 0)
            $scope.carouselOffset = 0;
    }
    $scope.scrollRight = function() {
        $scope.carouselOffset += 160;
        var viewportWidth = document.getElementById('product-scroll').offsetWidth;
        var contentWidth = document.getElementById('product-container').scrollWidth;
        if ($scope.carouselOffset > contentWidth - viewportWidth)
            $scope.carouselOffset = contentWidth - viewportWidth;
    }
    $scope.$watch('carouselOffset', function() {
        document.getElementById('product-scroll').scrollLeft = $scope.carouselOffset;
    });
    $scope.hoverProduct = function(item) {
        item.isHovered = true;
    }
    $scope.cancelHoverProduct = function(item) {
        item.isHovered = false;
    }
    $scope.updateQty = function(item, increment) {
        item.qty = makeInteger(item.qty);
        item.qty = Number(item.qty) + Number(increment);
        if (item.qty < 1)
            item.qty = 1;
    }
    $scope.orderItems = [
        {id:'control-panel',name:'Control panel',points:0,qty:1,canRemove:false},
        {id:'yard-sign',name:'Nexsense yard sign',points:0,qty:1,canRemove:false},
        {id:'window-sticker',name:'Nexsense window sticker',points:0,qty:5,canRemove:false},
    ];
    $scope.removeItemFromSystem = function(item) {
        for (var i=0; i<$scope.orderItems.length; i++) {
            if ($scope.orderItems[i] == item) {
                $scope.orderItems.splice(i, 1);
                break;
            }
        }
        $scope.calculate();
    }
    $scope.addItemToSystem = function(item) {
        for (var i=0; i<$scope.orderItems.length; i++) {
            if ($scope.orderItems[i].id == item.id) {
                $scope.orderItems[i].qty += item.qty;
                $scope.calculate();
                return;
            }
        }
        $scope.orderItems.push({
            id:item.id,
            name:item.name,
            points:item.points,
            qty:item.qty,
            canRemove:true,
        });
        $scope.calculate();
    }
    $scope.totalPoints = 0;
    $scope.upgradeCost = 0;

    $scope.calculate = function() {
        var points = 0;
        for (var i=0; i<$scope.orderItems.length; i++) {
            points += $scope.orderItems[i].points * $scope.orderItems[i].qty;
        }
        $scope.totalPoints = points;

        var upgradePts = points - 8;
        if (upgradePts < 0)
            upgradePts = 0;
        $scope.upgradeCost = upgradePts * 35.00;
    };



    $scope.previousStep = function() {
        if ($scope.phase > 0) {
            $scope.previousPhase = $scope.phase;
            $scope.phase -= 1;
        }
    }
    $scope.nextStep = function() {
        if ($scope.phase < 4) {
            $scope.previousPhase = $scope.phase;
            $scope.phase += 1;
        }
    }

    $scope.getPage = function() {
        var className = '';
        if ($scope.previousPhase == $scope.phase)
            className = 'page' + $scope.phase;
        else
            className = 'page' + $scope.previousPhase + 'to' + $scope.phase;
        return className;
    }



    $scope.customer = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        zip: '',
    }


    // Validate and submit the form
    $scope.submitForm = function() {
        $scope.submitAttempted = true;

        if (!$scope.apptForm.$valid) {
            $msg.displayMessage("There were some problems with your information.  Please check the marked fields and try again.", true);
            return;
        }

        // replace the submit button with a wait icon
        $scope.isSubmitting = true;

        // send the application
        $http({
            method: 'POST',
            url: 'ng/Contact/schedule_installation',
            data: {
                firstname: $scope.customer.firstName,
                lastname: $scope.customer.lastName,
                email: $scope.customer.email,
                phone: $scope.customer.phone,
                zip: $scope.customer.zip,
                equipmentlist: $scope.orderItems,
                contractlength: $scope.contractLength,
                downpayment: $scope.getDownPayment(),
                monthlypayment: $scope.monthlyPayment,
                duetoday: $scope.dueToday,
            }
        }).
        success(function(data, status, headers, config) {
            $scope.isSubmitting = false;
            document.body.scrollTop = 0;
            console.log(data);
            $msg.displayMessage("Your request was successfully sent to Nexsense.  We'll get back to you as soon as we can!", false, function() {
                $scope.$apply(function() {
                    $scope.nextStep();
                }); 
            });
        }).error(function(data, status, headers, config) {
            console.log("ERROR");
            $msg.displayMessage("There was a problem submitting your information.  Please ensure all fields are complete.", true);
            $scope.isSubmitting = false;
        });
    }

    // create a wait indicator for when the user presses the submit button
    angular.element(window).bind('load', function() {
        $scope.applicationWaitSpinner = new WaitIndicatorSpinner(document.getElementById('form-wait'), stdWaitIndicatorWidth, stdWaitIndicatorHeight, stdWaitIndicatorOpts);
    });

}]);