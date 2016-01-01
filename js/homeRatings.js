function homeRatings(api) {
	var currUser, currResource, currCollection;
	var postRenderFxn;
	
	function main(user) {
		if (user) currUser = user; 
		if (!currUser || app.currView != 'ratings') return;
		app.currView = 'ratings';
		
		var url = currUser.ratings;
		$('#ratingsWrapper').children().remove();
		$('#ratingsWrapper').append(setTitle(currUser));

		//refresh info as needed using second argument to loadId
		api.loadId(url, app.refresh()).then(renderRatings, app.errHandler);
	}
	
	function setTitle() {
		$('#ratingsWrapper').append(
			"<div class='row'>"
			+	"<div class='columns small-8'>"
			+  	"<a href=''>Help</a>"
			+	"</div>"
			+	"<div class='columns small-4'>"
			+	 	"<button id='addRating' class='right tiny' style='margin:0;'>+New Rating</button>"
			+ "</div>"
			+"</div>"
		);
	}
	
	function renderRatings(ratings) { 
		currCollection = ratings;
		ratings.items.map(renderItem);
		if (main.postRenderFxn) {
			main.postRenderFxn();
			main.postRenderFxn = null;
		}
		
		app.adjustHeight();
	}
	
	function renderItem(rating) {
		var date = rating.created.split(' ')[0].split('-');
		var divId = 'ratings-'+ rating.rating_id;
		app.resources[divId] = rating;
		
		$('#ratingsWrapper').append(
			"<div id='"+divId+"' class='row brandItem' style='margin: 5px;'>"
			+ 	"<div class='small-12 columns' style='text-align: left; margin-bottom:10px;'>"
			+ 		"<span class='fi-pencil small right'>&nbsp;</span>"
			+			rating.brand_name +"</br >"
			+			"Rating: "+ rating.score +"</br >"
			+			"Reason: "+ rating.reason 
			//+ 	date[1] +'/'+ date[2] +"<br/>"+ date[0]
			+		"</div>"
			+'</div>'
		)
	}
	
	function initPlaces() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(setPlacesAutocomplete);
		} else {
			loc.html("Geolocation is not supported by this browser.");
		}
	}
	
	function setPlacesAutocomplete(position) {
		if (arguments.length) {
			var lat = position.coords.latitude, lon = position.coords.longitude
		}
		else {
			var lat = -33.8665433, lon = 151.1956316;
		} //console.log([lat,lon]);
		
		var loc = new google.maps.LatLng(lat, lon); 

		/*map = new google.maps.Map(document.getElementById('map-canvas'), {
			center: pyrmont,
			zoom: 15
		});*/

		var request = {
			location: loc,
			radius: 500,
			types: ['store']
		};
		
		//infowindow = new google.maps.InfoWindow();
		//var service = new google.maps.places.PlacesService(document.getElementById('nearbyList'));
		//service.nearbySearch(request, callback);
		
		var input =  document.getElementById('ratings-brand_id');
		
		var circle = new google.maps.Circle({
			center: loc,
			radius: 2000
		}); 
		
		var options = {
			bounds: circle.getBounds(),
			//types: ['establishment']
		}; //console.log(options);
		
		var autocomplete = new google.maps.places.Autocomplete(input, options);
	}
	
	main.clickHandler = function (e) {
		if (e.target.id=='addRating') {
			app.completer.reset();
			$('#ratings-brand_id').prop('disabled',false).val('');
			app.forms(currCollection, 'ratings', '/form/rating-add');
			initPlaces();
			return;
		}
		
		if (app.getCls(e).indexOf('subLabel') != -1) {
			app('ratingsWrapper');
		}
	
		var divId = app.getDivId(e, 'ratings');
		if (!divId) return;
		
		var rating = app.resources[divId];
		
		$('#ratings-brand_id').prop('disabled',true).val(rating.brand_name);
		app.forms(divId, 'ratings', '/form/rating-edit');
	}
	
	main.findRenderedItem = function (brand_id) {
		var clickedElemId;
		currCollection.items.map(function (d) {
			if (d.brand_id==brand_id) clickedElemId = 'ratings-'+d.rating_id;
		});
		return clickedElemId;
	} 
	
	main.setRatingBySlider = function (e) {
		$('#ratings-score').val($('#ratings-slider').val());
	}
	
	main.setSliderByText = function (e) {
		$('#ratings-slider').val($('#ratings-score').val());
	}
	
	return main;
}