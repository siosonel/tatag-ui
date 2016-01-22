function searchBrands(api) {
	var currURL, currBrands;
		
	function main(brands) {	
		if (brands) {
			if (typeof brands=='string') currURL = brands;
			else if ('@id' in brands) currURL = brands['@id'];
		}
		
		if (!currURL) {console.log("Missing brands url."); return;}
		
		$('button', '#brandsWrapper').remove(); //console.log(currURL); console.log(api.byId[currURL]);
		
		api.loadId(currURL)
			.then(renderBrands, app.errHandler);	
	}
	
	function renderBrands(brands) {
		currBrands = brands;
		currBrands.items.map(renderBrandDiv);
		
		/*if (currBrands.next) $('#brandsWrapper').append(
			"<button id='prevPage' class='tiny' style='float:left'>Previous</button>"
		);*/
		
		if (currBrands.next) $('#brandsWrapper').append(
			"<button id='nextPage' class='tiny' style='float:right'>more</button>"
		);
		
		app.adjustHeight();
	}
	
	function renderBrandDiv(brand) {
		var date = brand.created.split(' ')[0].split('-');
		var tally = brand.tally, divId='brand-'+brand.brand_id;			
		var type = brand.type_system =='sim' ? 'mock brand' : types[brand.type_system].types[brand.type_id-1].type;
		app.resources[divId] = brand;
		
		//var b = main.brandColors(divId, brand);		
		
		$('#brandsWrapper').append(
			"<div id='"+divId+"' class='brandItem' style='margin: 5px;'>"
			+		"<div class='row'>"
			+ 		"<div class='small-12 columns'><b>"+ brand.name +"</b></div>"
			+		"</div>"
			+		"<div class='row'>"
			+			"<div class='small-12 columns'>Founded: "+ date[1] +'/'+ date[2] +"/"+ date[0] +"</div>"
			+		"</div>"
			+		"<div class='row'>"
			+ 		"<div class='small-12 columns'>Purpose: "+ brand.mission +"</div>"
			+		"</div>"
			+		"<div class='row'>"
			+ 		"<div class='small-12 columns'>About: "+ brand.description +"</div>"
			+		"</div>"
			+		"<div class='row'>"
			+ 		"<div class='small-12 columns'>"+ byIso3[brand.country_code][0] +", "+ brand.area_name +"</div>"
			+		"</div>"
			+		(!brand.url ? ""
			:		"<div class='row'>"
			+ 		"<div class='small-12 columns'>URL: "+ brand.url +"</div>"
			+		"</div>")
			+		"<div class='row'>"
			+ 		"<div class='small-12 columns'>Type: "+ brand.type_system +", "+ type +"</div>"
			+		"</div>"
			+		"<div class='row'>"
			+ 		"<div class='small-12 columns'>Brand ID#:"+ brand.brand_id +"</div>"
			+		"</div>"
			+'</div>'
		);
	}
	
	main.brandColors = (function () {
		//colorbrewer RdYlBu[11]
		var colors = [
			"rgb(165,0,38)","rgb(215,48,39)","rgb(244,109,67)","rgb(253,174,97)",
			"rgb(254,224,144)","rgb(255,255,191)","rgb(224,243,248)","rgb(171,217,233)",
			"rgb(116,173,209)","rgb(69,117,180)","rgb(49,54,149)"
		];
		
		var colorIndex = {};
		
		function main(divId, obj) { 
			if (!colorIndex[divId]) {
				var i = obj.brand_id % 11;
				colorIndex[divId] = {
					logoBg: colors[i],
					divBg: colors[11-i].replace("rgb", "rgba").replace(")", ",0.4)"),
					logo: obj.brand_logo
						? "<img id='"+ divId +"-img' class='left logoDiv' src='"+ obj.brand_logo +"'/>"
						: "<div id='"+ divId +"-img' class='left logoDiv' style='background-color: "+ colors[i] +"'>"+ obj.brand_name.substr(0,1).toUpperCase() +"</div>"
				}
			}
			
			return colorIndex[divId];
		}
		
		return main;
	})();
	
	main.clickHandler = function (e) {
		if (e.target.id=='nextPage') {
			main(currBrands.next);
		}	
		else if (e.target.id=='prevPage') {
			main(currBrands.prev);
		}	
		
		//var divId = app.getDivId(e,'brand'); console.log(divId);
		//if (!divId) return;	console.log(e.target.id);	
	}
	
	return main;
}