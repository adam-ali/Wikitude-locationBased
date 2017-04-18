// implementation of AR-Experience (aka "World")
var World = {
	// true once data was fetched
	initiallyLoadedData: false,
	shrek: null,
	sun: null,
	images: new Map([
		['funky-chicken', new AR.ImageResource("assets/vegan.png", {
			onLoaded: function (params) {
				AR.logger.info("IMAGE HAS BEEN LOADED")
			},
			onError: function (err) {
				AR.logger.error(err);
			}
		})],
		['printworks', new AR.ImageResource("assets/arrow.png", {
			onLoaded: function (params) {
				AR.logger.info("IMAGE HAS BEEN LOADED")
			},
			onError: function (err) {
				AR.logger.error(err);
			}
		})],
		['basil-chambers', new AR.ImageResource("assets/mcdonalds.png", {
			onLoaded: function (params) {
				AR.logger.info("IMAGE HAS BEEN LOADED")
			},
			onError: function (err) {
				AR.logger.error(err);
			}
		})],
		['picadilly-gardens', new AR.ImageResource("assets/bigwheel.png", {
			onLoaded: function (params) {
				AR.logger.info("IMAGE HAS BEEN LOADED")
			},
			onError: function (err) {
				AR.logger.error(err);
			}
		})],
		['copperaSt', new AR.ImageResource("assets/statham.png", {
			onLoaded: function (params) {
				AR.logger.info("IMAGE HAS BEEN LOADED")
			},
			onError: function (err) {
				AR.logger.error(err);
			}
		})],
		['bar-left', new AR.ImageResource("assets/dancer-left.png", {
			onLoaded: function (params) {
				AR.logger.info("IMAGE HAS BEEN LOADED")
			},
			onError: function (err) {
				AR.logger.error(err);
			}
		})],
		['bar-right', new AR.ImageResource("assets/dancer-right.png", {
			onLoaded: function (params) {
				AR.logger.info("IMAGE HAS BEEN LOADED")
			},
			onError: function (err) {
				AR.logger.error(err);
			}
		})],
	]),

	//     let home = new AR.GeoLocation(53.522852, -2.264962);
	//     let backdoor = new AR.GeoLocation(53.522713, -2.264927);
	//(53.484871, -2.238659) (53.485218, -2.239841) ] ]),

	locations: new Map([
		['funky-chicken', new AR.GeoLocation(53.484598, -2.240814)],
		['printworks', new AR.GeoLocation(53.485107, -2.240025)],
		['basil-chambers', new AR.GeoLocation(53.484125, -2.238436)],
		//
		['picadilly-gardens', new AR.GeoLocation(53.480586, -2.236534)],
		['copperaSt', new AR.GeoLocation(53.484618, -2.236144)],
		['bar-left', new AR.GeoLocation(53.483982, -2.236485)],
		['bar-right', new AR.GeoLocation(53.483966, -2.236443)]
		
		]),

		
	drawables: new Map(),
	geoObjects: new Map(),

	// called to inject new POI data
	loadPoisFromJsonData: function loadPoisFromJsonDataFn(poiData) {
		World.drawables.set('funky-chicken', new AR.ImageDrawable(World.images.get('funky-chicken'), 4));
		World.drawables.set('printworks', new AR.ImageDrawable(World.images.get('printworks'), 4));
		World.drawables.set('basil-chambers', new AR.ImageDrawable(World.images.get('basil-chambers'), 4));
		//
		World.drawables.set('picadilly-gardens', new AR.ImageDrawable(World.images.get('picadilly-gardens'), 4));
		World.drawables.set('copperaSt', new AR.ImageDrawable(World.images.get('copperaSt'), 4));
		World.drawables.set('bar-left', new AR.ImageDrawable(World.images.get('bar-left'), 4));
		World.drawables.set('bar-right', new AR.ImageDrawable(World.images.get('bar-right'), 4));

		// create GeoObject
		World.drawables.forEach((item, index, map) => {
			if (World.locations.has(index)) {
				World.geoObjects.set(index, new AR.GeoObject(World.locations.get(index), {
					drawables: {
						cam: [item]
					}
				}))
			} else {
				alert(`attempt to load ${index} failed`);
			}
		});
		// World.geoObjects.push(markerObject);
	},
	// updates status message shon in small "i"-button aligned bottom center
	updateStatusMessage: function updateStatusMessageFn(message, isWarning) {

		var themeToUse = isWarning ? "e" : "c";
		var iconToUse = isWarning ? "alert" : "info";

		$("#status-message").html(message);
		$("#popupInfoButton").buttonMarkup({
			theme: themeToUse
		});
		$("#popupInfoButton").buttonMarkup({
			icon: iconToUse
		});
	},

	// location updates, fired every time you call architectView.setLocation() in native environment
	locationChanged: function locationChangedFn(lat, lng, alt, acc) {

		World.updateStatusMessage(`Your current Location: lat: ${lat}  lng: ${lng}`);

		if (!World.initiallyLoadedData) {
			AR.logger.debug(`received co-ords: ${lat}, ${lng}, ${alt}`);
			World.initiallyLoadedData = true;
			// creates a poi object with a random location near the user's location
			var poiData = {
				"id": 1,
				"longitude": lng,
				"latitude": lat,
				"altitude": 100.0
			};
			World.loadPoisFromJsonData(poiData);

		}
	},
};
// AR.radar.container = document.getElementById("radarContainer");
AR.logger.activateDebugMode();
AR.context.onLocationChanged = World.locationChanged;
