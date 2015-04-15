app.controller("ProductPage", ['$scope', '$http', '$location', 'Site', '$sce', function($scope, $http, $location, $site, $sce) {
    $scope.$site = $site;
    $site.pageName = 'products';

	var qs = $location.absUrl();
	var id = qs.substring(qs.lastIndexOf('/')+1);

	$scope.products = [
		{
			id: 'control-panel',
			name: 'Control panel',
			shortDescription: 'The brains of the operation.',
			description: $sce.trustAsHtml("The control panel is the central hub that communicates between all the devices in your home.  It's also your 2-way voice connection to the central monitoring station.  Whenever something goes wrong, the monitoring station will be able to talk with you through the speaker in the panel.  You can let them know if you're okay or if you need assistance.  You'll also use this panel to arm/disarm your system when you come and go.<br/><br/>Includes a 2-way speaker and touchscreen panel."),
			points: 0,
			price: 0,
			howToImage: '',
			howToText: '',
		},
		{
			id: 'door-window-contact',
			name: 'Door/window contact',
			shortDescription: 'Thin and wireless, this adhesive sensor notifies you whenever your door/window opens or closes.',
			description: $sce.trustAsHtml("Place one of these wireless sensors on every entrance to your home so you can know when a door opens or closes.  If a stranger opens your door while your system’s armed, the control panel will notify the monitoring station.  This specific contact can be adhered to sliding doors and windows as well.  That way you can know if someone’s left the window open, is trying to sneak out, or is trying to sneak in.  The door/window contact is one of the most fundamental pieces of any home security system.  The batteries in each sensor generally last a few years and your security system will even warn you when they’re getting low.<br/><br/>The <a href='product/recessed-door-contact'>recessed door contact</a> is a great lower-profile option for most doors."),
			points: 1,
			price: 35.00,
			howToImage: '',
			howToText: '',
		},
		{
			id: 'recessed-door-contact',
			name: 'Recessed door contact',
			shortDescription: 'Concealed inside your door, the recessed door contact is the ideal way to keep track of your most-used doorways.',
			description: $sce.trustAsHtml("These wireless sensors can be installed inside the door and jamb on the entrances to your home so you can know when a door opens or closes.  If a stranger opens your door while your system’s armed, the control panel will notify the monitoring station.  Door contacts are one of the most fundamental pieces of any home security system.  The batteries in each sensor generally last a few years and your security system will even warn you when they’re getting low.<br/><br/>The standard <a href='door-window-contact'>door/window contact</a> is a great option for sliding doors."),
			points: 1,
			price: 35.00,
			howToImage: '',
			howToText: '',
		},
		{
			id: 'medical-pendant',
			name: 'Medical pendant',
			shortDescription: 'Keep emergency personnel at the press of a finger with a medical pendant.',
			description: $sce.trustAsHtml("Ideal for elderly individuals, the medical pendant keeps you within reach of emergency medical attention.  Just press and hold the button to contact authorities.  The device works anywhere within range of your home control panel and is even water-resistant.  Attaches to a lanyard, wristband, wall mount, or a belt."),
			points: 1,
			price: 35.00,
			howToImage: '',
			howToText: '',
		},
		{
			id: 'key-fob',
			name: 'Key fob',
			shortDescription: 'Put your house on a remote control.',
			description: $sce.trustAsHtml("A key fob allows you to arm and disarm your home security system with the simple press of a button.  Making home security even more convenient, you can use the key fob when your hands are full or when you don't feel like typing your code to disarm your system."),
			points: 1,
			price: 35.00,
			howToImage: '',
			howToText: '',
		},
		{
			id: 'firefighter',
			name: 'Firefighter',
			shortDescription: 'Let your home contact the fire department for you.',
			description: $sce.trustAsHtml("We all hope that our homes will never suffer the loss caused by fire, but in the event that your home smoke alarms do detect something, the firefighter captures their alarm sound and relays an alert to the local fire authorities via our central monitoring station.  That way you can focus on the safety of your family and we'll take care of the house."),
			points: 1,
			price: 35.00,
			howToImage: '',
			howToText: '',
		},
		{
			id: 'doorbell',
			name: 'Wireless doorbell',
			shortDescription: "Connect your doorbell to your control panel so you can know when someone arrives.",
			description: $sce.trustAsHtml("A wireless doorbell can be added to your home security and automation system to notify you whenever it's pressed.  You can set custom actions to perform when the button is pressed so you can be in control of your home even when you're not there."),
			points: 1,
			price: 35.00,
			howToImage: '',
			howToText: '',
		},
		{
			id: 'garage-door-receiver',
			name: 'Garage door receiver',
			shortDescription: 'Control your garage door openers from your smart phone.',
			description: $sce.trustAsHtml("Compatible with most garage door openers, this receiver allows you to connect to and control them straight from your smart phone.  With this receiver you can also include your garage doors in your home automation actions."),
			points: 1,
			price: 35.00,
			howToImage: '',
			howToText: '',
		},
		{
			id: 'light-bulb',
			name: 'Z-wave light bulb',
			shortDescription: 'Turn any light on or off without changing any light switches.',
			description: $sce.trustAsHtml("If you're not keen on doing the electrical work to change your light switches, you can just screw in a z-wave light bulb and control it from your phone and control panel.  Set up your home automation actions to turn the bulb on or off on a schedule or whenever you like.<br/><br/>If you want to keep control of the bulb with the switch as well as your phone, you'll want to install a <a href='/product/light-switch'>z-wave light switch</a> instead."),
			points: 1,
			price: 35.00,
			howToImage: '',
			howToText: '',
		},
		{
			id: 'appliance-module',
			name: 'Z-wave appliance module',
			shortDescription: 'Keep track of important appliances on the go.',
			description: $sce.trustAsHtml("Plug this small module into the wall in between your lamp or small appliance and the outlet and you'll be able to turn it on or off from your smart phone.  Set the appliance module to any custom action in your home automation system."),
			points: 1,
			price: 35.00,
			howToImage: '',
			howToText: '',
		},
		{
			id: 'dimmer',
			name: 'Z-wave dimmer',
			shortDescription: 'Easily dim or brighten the lights without installing a new switch.',
			description: $sce.trustAsHtml("With a z-wave dimmer module, you can add a dimming effect to lamps in your home.  Just plug the dimmer into the wall between your lamp and the outlet.  You'll be able to control the brightness of your lamps from the app on your smart phone."),
			points: 1,
			price: 35.00,
			howToImage: '',
			howToText: '',
		},
		{
			id: 'light-switch',
			name: 'Z-wave light switch',
			shortDescription: 'Control your home lighting from your smart phone or on an automatic schedule.',
			description: $sce.trustAsHtml("Want the porch lights to turn on automatically at dark?  Maybe you'd like the hall light to come on when you get home?  Maybe you just want to check on your home and turn the lights off when you're not home.  Swap out any standard light switch with a z-wave switch and you'll be able to control it from your smart phone and set up home automation actions to happen whenever you like.<br/><br/>Requires a licensed electrician or a confident do-it-yourselfer to install."),
			points: 1,
			price: 35.00,
			howToImage: '',
			howToText: '',
		},
		{
			id: 'motion-detector',
			name: 'Motion detector',
			shortDescription: "Know what's going on in your home when you're not there.",
			description: $sce.trustAsHtml("One of the most traditional pieces of home security equipment, the motion sensor knows when something's going on in your home.  The sensor we install is capable of ignoring small pets so you don't have to worry about Fido or Mittens setting off the alarm when you're away.  The sensor has a visible range of 30 ft by 50 ft and has a 90-degree look down angle."),
			points: 1.5,
			price: 52.50,
			howToImage: '',
			howToText: '',
		},
		{
			id: 'glass-break-detector',
			name: 'Glass break detector',
			shortDescription: 'Monitor multiple windows at once with a glass break detector.',
			description: $sce.trustAsHtml("A glass break detector can sense the sound of breaking glass within a 30-foot distance.  A strategically placed glass break sensor can monitor several windows at once.  If one of them breaks you can get an alert and have the monitoring station check in on your home."),
			points: 1.5,
			price: 52.50,
			howToImage: '',
			howToText: '',
		},
		{
			id: 'smoke-detector',
			name: 'Smoke detector',
			shortDescription: 'Automatically contact the fire department in case of emergency.',
			description: $sce.trustAsHtml("Smoke detectors connected to your home control panel can automatically contact the monitoring station whenever there's a problem - whether you're home or not.  Most importantly, this smoke detector can be coupled with a <a href='/product/thermostat'>thermostat</a> to turn off the furnace when a fire does start, protecting your home even more.  With that automation in place, most homeowner's insurance companies will offer a discount on yoru monthly premiums- sometimes up to 20% off.<br/><br/>This detector can sense smoke, heat, and freezing temperatures and warn you about each one separately."),
			points: 1.5,
			price: 52.50,
			howToImage: '',
			howToText: '',
		},
		{
			id: 'co-detector',
			name: 'CO detector',
			shortDescription: 'Keep an eye out for carbon monoxide poisoning in your home.',
			description: $sce.trustAsHtml("With this simple device connected into your home security system, you'll always know if there's a carbon monoxide threat.  Get alerts automatically if CO levels ever reach an unsafe threshold."),
			points: 2,
			price: 70.00,
			howToImage: '',
			howToText: '',
		},
		{
			id: 'thermostat',
			name: 'Thermostat',
			shortDescription: 'Control your home temperature from your smart phone.',
			description: $sce.trustAsHtml("Save some money by controlling your home temperature when you're away.  It's easy to turn the dial down a few degrees when you're at work or while you're asleep when you can do it with a few taps on your smart phone.<br/><br/>Thermostat has an easy-to-read LED backlit display and a sleek, thin design."),
			points: 2.5,
			price: 87.50,
			howToImage: '',
			howToText: '',
		},
		{
			id: 'camera',
			name: 'Security camera',
			shortDescription: "Keep watch on your home even when you're away.",
			description: $sce.trustAsHtml("This HD security camera can take still photos or live video whenever you need it.  Set a home automation action to snap a photo when someone rings the <a href='/product/doorbell'>doorbell</a>, or just use it to check in from time to time.  The camera's wireless and Ethernet options allow you to watch live video from your smart phone anytime, anywhere."),
			points: 4,
			price: 140.00,
			howToImage: '',
			howToText: '',
		},
		{
			id: 'door-lock',
			name: 'Kwikset door lock',
			shortDescription: 'Never get locked out of your home again with a programmable door lock',
			description: $sce.trustAsHtml("You won't need a key to enter your house ever again.  In addition to controlling your door lock from your smart phone, you can program up to 12 PINs to open it.  That way you can always feel confident locking the house up, knowing you'll be able to get back in with the press of a few buttons.  If you ever get locked out and can't remember your PIN, just open the lock through the smart phone app.  Easy peasy."),
			points: 4,
			price: 140.00,
			howToImage: '',
			howToText: '',
		},
	];

	for (var i=0; i<$scope.products.length; i++) {
		if ($scope.products[i].id == id) {
			$scope.productInfo = $scope.products[i];
			break;
		}
	}

}]);