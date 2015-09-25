function teamAbout(api) {
	var currURL, currBrand;
	
	function main(brand) {
		if (brand) currBrand = brand;
		if (!currBrand || app.currView != 'about') return;
		app.currView = 'about';
		
		var url = currBrand['@id'];		
		$('#aboutWrapper').children().remove();
		$('#aboutWrapper').append(setTitle(currBrand))
		
		$('#brandsWrapper').animate({left: '-100%'});
		$('#aboutWrapper').animate({left: '0'});

		//refresh info as needed using second argument to loadId
		api.loadId(url, app.refresh()).then(renderResource, app.errHandler)
	}
	
	function setTitle() {
		$('#aboutWrapper').append(
			"<div class='subLabel'>"
			+	 "<span style='vertical-align:top; font-weight: 700;'>&#9668; about "+currBrand.name+", </span>"
			+  "<span style='font-weight:normal;'>&nbsp; brand#"+ currBrand.brand_id +"</span>"
			+"</div>"
		);
	}
	
	function renderResource(about) { //console.log(member)
		var date = about.created.split(' ')[0].split('-');
		var divId = 'about-'+ about.brand_id; //console.log(divId)
		app.resources[divId] = about;
		
		$('#aboutWrapper').append(
			"<div id='"+divId+"' class='brandItem' style='margin: 5px;'>"
			+		"<div class='row'>"
			+			"<div class='small-3 columns'>Founded:</div>"
			+ 		"<div class='small-9 columns'>"+ date[1] +'/'+ date[2] +"/"+ date[0] +"</div>"
			+		"</div>"
			+		"<div class='row'>"
			+			"<div class='small-3 columns'>Name:</div>"
			+ 		"<div class='small-9 columns'>"+ about.name +"</div>"
			+		"</div>"
			+		"<div class='row'>"
			+			"<div class='small-3 columns'>Purpose:</div>"
			+ 		"<div class='small-9 columns'>"+ about.mission +"</div>"
			+		"</div>"
			+		"<div class='row'>"
			+			"<div class='small-3 columns'>Description:</div>"
			+ 		"<div class='small-9 columns'>"+ about.description +"</div>"
			+		"</div>"
			+		"<div class='row'>"
			+			"<div class='small-3 columns'>URL:</div>"
			+ 		"<div class='small-9 columns'>"+ about.url +"</div>"
			+		"</div>"
			+		"<div class='row'>"
			+			"<div class='small-3 columns'>Advisor:</div>"
			+ 		"<div class='small-9 columns'>"+ about.advisor +"</div>"
			+		"</div>"
			+		"<div class='row'>"
			+			"<div class='small-3 columns'>Type:</div>"
			+ 		"<div class='small-9 columns'>"+ about.type_system +": "+ types[about.type_system].types[about.type_id-1].type +"</div>"
			+		"</div>"
			+		"<div class='row'>"
			+			"<div class='small-3 columns'>Location:</div>"
			+ 		"<div class='small-9 columns'>"+ byIso3[about.country_code][0] +": "+ about.area_name +"</div>"
			+		"</div>"
			+'</div>'
		)
		
		app.adjustHeight();
	}
	
	main.clickHandler = function (e) {
		var cls = e.target.className, pCls = e.target.parentNode.className, ppCls = e.target.parentNode.parentNode.className;
		
		if ([cls, pCls, ppCls].indexOf('subLabel')!=-1) { 
			app('aboutWrapper'); return;
		}
	}
	
	return main;
}