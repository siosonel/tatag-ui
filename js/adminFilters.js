function adminFilters(api) {
	var currBrand, currResource, currCollection;
	
	function main(brand) {
		if (brand) currBrand = brand; 
		if (!currBrand || app.currView != 'filters') return;
		app.currView = 'filters';
		
		var url = currBrand.links.budgetFilters;
		$('#filtersWrapper').children().remove();
		$('#filtersWrapper').append(setTitle(currBrand))
		
		$('#brandsWrapper').animate({left: '-100%'});
		$('#filtersWrapper').animate({left: '0'});

		//refresh info as needed using second argument to loadId
		api.loadId(url, app.refresh()).then(renderFilters, app.errHandler)
	}
	
	function setTitle() {
		$('#filtersWrapper').append(
			"<div class='row subLabel'>"
			+	"<div class='columns small-8'>"
			+  	"<span style='vertical-align:top; font-weight: 700;'>&#9668; "+currBrand.name+" filters, </span>"
			+  	"<span style='font-weight:normal;'>&nbsp; brand#"+ currBrand.brand_id +"</span>"
			+	"</div>"
			+	"<div class='columns small-4'>"
			+	 	"<button id='addFilter' class='right tiny' style='margin:0;'>+New Filters</button>"
			+ "</div>"
			+"</div>"
			+"<div id='brandItemsHeading' class='row acctItem' style='margin: 0 5px;'>"
			+		"<div class='small-2 columns'>Created</div>"
			+ 	"<div class='small-10 columns' style='margin-bottom:10px;'>"
			+ 		"Filter Information"
			+		"</div>"
			+'</div>'
		);
	}
	
	function renderFilters(filters) { 
		currCollection = filters;
		filters.items.map(renderItem);
	}
	
	function renderItem(filter) {
		var date = filter.created.split(' ')[0].split('-');
		var divId = 'filters-'+ filter.filter_id;
		app.resources[divId] = filter;
		
		$('#filtersWrapper').append(
			"<div id='"+divId+"' class='row brandItem' style='margin: 5px;'>"
			+		"<div class='small-2 columns'>"+ date[1] +'/'+ date[2] +"<br/>"+ date[0] +"</div>"
			+ 	"<div class='small-10 columns' style='text-align: left; margin-bottom:10px;'>"
			+ 		"Filter #"+filter.filter_id +" <span class='fi-pencil small'>&nbsp;</span><br />"
			+			"Other Brand: "+ filter.other_id +"</br >"
			+			"Accept: "+ filter.accept +"</br >"
			+			"Reason: "+ filter.reason 
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
		} console.log([lat,lon]);
		
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
		
		var input =  document.getElementById('filters-other_id');
		
		var circle = new google.maps.Circle({
			center: loc,
			radius: 2000
		}); 
		
		var options = {
			bounds: circle.getBounds(),
			//types: ['establishment']
		}; console.log(options);
		
		var autocomplete = new google.maps.places.Autocomplete(input, options);
	}
	
	main.clickHandler = function (e) {
		if (e.target.id=='addFilter') { 
			$('#filters-other_id').prop('disabled',false).val('');
			app.forms(currCollection, 'filters', '/forms#filter-add');
			initPlaces();
			return;
		}		
		
		if (app.getCls(e).indexOf('subLabel') != -1) {
			app('filtersWrapper');
		}
	
		var divId = app.getDivId(e, 'filters');
		if (!divId) return;
		
		$('#filters-other_id').prop('disabled',true);
		app.forms(divId, 'filters', '/forms#filter-edit');
	}
	
	return main;
}