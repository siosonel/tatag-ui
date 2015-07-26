function homeRatings(api) {
	var currUser, currResource, currCollection;
	
	function main(user) {
		if (user) currUser = user; 
		if (!currUser || app.currView != 'ratings') return;
		app.currView = 'ratings';
		
		var url = currUser.links.userRatings;
		$('#ratingsWrapper').children().remove();
		$('#ratingsWrapper').append(setTitle(currUser));
		
		$('#homeWrapper').animate({left: '-100%'});
		$('#ratingsWrapper').animate({left: '0'});

		//refresh info as needed using second argument to loadId
		api.loadId(url, app.refresh()).then(renderRatings, app.errHandler);
	}
	
	function setTitle() {
		$('#ratingsWrapper').append(
			"<div class='row subLabel'>"
			+	"<div class='columns small-8'>"
			+  	"<span style='vertical-align:top; font-weight: 700;'>&#9668; "+currUser.name+" ratings, </span>"
			+  	"<span style='font-weight:normal;'>&nbsp; user#"+ currUser.user_id +"</span>"
			+	"</div>"
			+	"<div class='columns small-4'>"
			+	 	"<button id='addRating' class='right tiny' style='margin:0;'>+New Rating</button>"
			+ "</div>"
			+"</div>"
			+"<div id='brandItemsHeading' class='row acctItem' style='margin: 0 5px;'>"
			+		"<div class='small-2 columns'>Created</div>"
			+ 	"<div class='small-10 columns' style='margin-bottom:10px;'>"
			+ 		"Rating Information"
			+		"</div>"
			+'</div>'
		);
	}
	
	function renderRatings(ratings) { 
		currCollection = ratings;
		ratings.items.map(renderItem);
	}
	
	function renderItem(rating) {
		var date = rating.created.split(' ')[0].split('-');
		var divId = 'ratings-'+ rating.rating_id;
		app.resources[divId] = rating;
		
		$('#ratingsWrapper').append(
			"<div id='"+divId+"' class='row brandItem' style='margin: 5px;'>"
			+		"<div class='small-2 columns'>"+ date[1] +'/'+ date[2] +"<br/>"+ date[0] +"</div>"
			+ 	"<div class='small-10 columns' style='text-align: left; margin-bottom:10px;'>"
			+ 		"rating #"+rating.rating_id +" <span class='fi-pencil small'>&nbsp;</span><br />"
			+			"Brand: "+ rating.brand_name +"</br >"
			+			"Rating: "+ rating.rating +"</br >"
			+			"Reason: "+ rating.reason 
			+		"</div>"
			//+ 	"<div id='"+divId+"-toggle' class='acctDivToggle'>&#9660;&#9660;&#9660;</div>"
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
			$('#ratings-brand_id').prop('disabled',false).val('');
			app.forms(currCollection, 'ratings', '/forms#rating-add');
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
		app.forms(divId, 'ratings', '/forms#rating-edit');
	}
	
	return main;
}