getLiftieData = function(){
	/*
	var getLocations = "http://liftie.info/api/resort/";
	var query = "telluride";
	
	var request = $.ajax ({
	url: getLocations,
	type: "GET",
	dataType: "jsonp",
	});
	
	request.done (function(data){
	console.log(data)
	})
	*/
	for (i=0; i< 1; i+=1) {
		
		console.log(i);

		var name = lifte[i].name + " ski resort";
		var geourl = "http://maps.googleapis.com/maps/api/geocode/json?address=" + encodeURIComponent(name) + "&sensor=false";
		
		var req = $.ajax ({
			url: geourl,
			type: "GET",
			dataType: "json",
			async: false
		});
		
		req.fail(function(request, status, error){
			console.log(request, status, error);
		});
		
		req.done(function(data){
			console.log(lifte[i].name);
			console.log(data);
			// lifte[0].lat = data.results[0].geometry.location.lat;
			// lifte[0].lng = data.results[0].geometry.location.lng;
			// console.log(lifte[i]);
		});
	}
 }