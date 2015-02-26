function teamThrottles(api) {
	var currBrand, currResource, currCollection;
	
	function main(brand) {
		if (brand) currBrand = brand; 
		if (!currBrand || app.currView != 'throttles') return;
		app.currView = 'throttles';
		
		var url = currBrand.links.teamThrottles;		
		$('#throttlesWrapper').children().remove();
		$('#throttlesWrapper').append(setTitle(currBrand))
		
		$('#brandsWrapper').animate({left: '-100%'});
		$('#throttlesWrapper').animate({left: '0'});

		//refresh info as needed using second argument to loadId
		api.loadId(url, app.refresh()).then(renderThrottles, app.errHandler)
	}
	
	function setTitle() {
		$('#throttlesWrapper').append(
			"<div class='row subLabel'>"
			+	"<div class='columns small-12'>"
			+  	"<span style='vertical-align:top; font-weight: 700;'>&#9668; "+currBrand.name+" throttles, </span>"
			+  	"<span style='font-weight:normal;'>&nbsp; brand#"+ currBrand.brand_id +"</span>"
			+	"</div>"
			+"</div>"
			+"<div id='brandItemsHeading' class='row acctItem' style='margin: 0 5px;'>"
			+		"<div class='small-2 columns'>Created</div>"
			+ 	"<div class='small-10 columns'>"
			+ 		"Throttle Information"
			+		"</div>"
			+'</div>'
		);
	}
	
	function renderThrottles(throttles) { 
		currCollection = throttles;
		throttles.items.map(renderItem);
	}
	
	function renderItem(throttle) {
		var date = throttle.created.split(' ')[0].split('-');
		var divId = 'throttles-'+ throttle.throttle_id;
		app.resources[divId] = throttle;
		
		$('#throttlesWrapper').append(
			"<div id='"+divId+"' class='row brandItem' style='margin: 5px;'>"
			+		"<div class='small-2 columns'>"+ date[1] +'/'+ date[2] +"<br/>"+ date[0] +"</div>"
			+ 	"<div class='small-10 columns' style='text-align: left; margin-bottom:10px;'>"
			+ 		"Throttle #"+throttle.throttle_id +"<br />"
			+			"Applies to the last "+ throttle.period +" seconds</br >"
			+			"("+ Math.round(throttle.period/60) +" min. || "
			+ 		(throttle.period/3600).toFixed(1) +" hours || "
			+ 		(throttle.period/86400).toFixed(2) +" days)<br />"
			+			"Total Limit: "+ throttle.by_all +"</br >"
			+			"Limit by brand: "+ throttle.by_brand +"</br >"
			+			"Limit by user: "+ throttle.by_user 
			+		"</div>"
			//+ 	"<div id='"+divId+"-toggle' class='acctDivToggle'>&#9660;&#9660;&#9660;</div>"
			+'</div>'
		)
	}
	
	main.clickHandler = function (e) {		
		if (app.getCls(e).indexOf('subLabel') != -1) {
			app('throttlesWrapper');
		}
	
		var divId = app.getDivId(e, 'throttles'); 
		if (!divId) return;
	}
	
	return main;
}