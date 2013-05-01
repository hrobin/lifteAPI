// jQuery() is a function that returns an object


(function($){
 // Self executing function
 // variables created here will stay here.

 var drawMap,
 	 getLocations,
 	 drawLocations,
 	 addLocations,
 	 onClickVenue,
 	 venueTemplate = $('#venueTemplate').html(), // this gets the underscore template,
 	 weatherTemplate = $('#weatherTemplate').html(), // weather underscore template;
 	 geocoder = new google.maps.Geocoder(),
 	 map;

function codeAddress() {
  var address = document.getElementById('postal-code').value;
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      map.setZoom(6);
      var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

// this ends the geocode

 drawMap = function(){
   var markers = [],
   		bound = new google.maps.LatLngBounds();

   function initMap(){
   		var mapOptions = {
		  center: new google.maps.LatLng(39.164382,-120.2383553),
		  zoom: 10,
		  mapTypeId: google.maps.MapTypeId.TERRAIN
		};

		map = new google.maps.Map(document.getElementById("map"), mapOptions);
   };

   function initMarkers(){
		console.log(lifte.length);
		for(i=0; i<lifte.length; i+=1) {
			var myLatlng = new google.maps.LatLng( lifte[i].lat , lifte[i].lng);

			var myTitle = lifte[i].name;
			console.log(lifte[i].lat);
			var marker = new google.maps.Marker({
				position: myLatlng,
				map: map,
				title: myTitle
			});
			marker.id = i;
			google.maps.event.addListener(marker, 'click', function() {
				onClickVenue(this.id, marker);
			});

			markers.push(marker);
		}
   }

   initMap();
   initMarkers();

   for(var i in markers)
	  {
		bound.extend(markers[i].getPosition());
	  }
	  map.fitBounds(bound);

 }

 getLocations = function(){
 	drawLocations();
 }


 addLocations = function(){}

 onClickVenue = function(id, marker){
	var venue = lifte[id],
		compiledTmpl = _.template( venueTemplate, { venue: venue } ),
		latLongString = venue.lat + ',' + venue.lng;

	$('#info').html(compiledTmpl); // outputs venue info


	$.ajax({
        url: "http://api.wunderground.com/api/7eaec3b21b154448/conditions/q/" + latLongString + ".json",
        dataType: "jsonp",
        success: function(data) {
          var weather = data.current_observation

          weatherTmpl = _.template( weatherTemplate, { weather: weather })
		 $('#weather').html(weatherTmpl);
        }});


 }


 $(document).ready(function () {
 	drawMap();
 	$('#postal-form').on('click', '#postal-submit', function(e){
 		e.preventDefault();
 		codeAddress();
 	})
 });

})(jQuery);
