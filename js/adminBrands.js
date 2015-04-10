function adminBrands(api) {
	var currURL, currBrands;
	var addBrandInit = 0; //to be used to avoid weird ignore of form select defaults

	function main(brandURL) {		
		if (brandURL) currURL = brandURL;
		$('#brandsWrapper').children().remove(); //console.log(currURL); console.log(api.byId[currURL]);
		$('#brandsWrapper').append("<div style='height: 28px; margin: 5px;'><button id='addBrand' class='right tiny'>+New Brand</button></div>")
		
		api.deref(currURL, app.refresh())
			.then(renderBrands, app.errHandler);	
	}
	
	function renderBrands(brands) {
		if (!brands.length) $("#brandsWrapper").append("<div><br />"
			+ "You are currently not an admin in any brand."
			+ "<br />To have an admin role, request a brand admin to assign that role to you. "
			+ "<br />-OR-,<br />You could create a new currency brand to administer."
		+"</div>");
		else {
			currBrands = brands;
			currBrands.map(renderBrandDiv);
		}
	}
	
	function renderBrandDiv(brand) { //console.log(brand);
		var tally = brand.tally, brandDivId='brand-'+brand.brand_id;		
		app.resources[brandDivId] = brand;
	
		$('#brandsWrapper').append(
			"<div class='small-12 brandItem' id='"+brandDivId+"'>"
			+ "<div class='row' style='margin-bottom:30px;' id='"+ brandDivId +"-label'>"
			+ 	"<div class='small-8 columns brandLabel'>"
			+			"<img id='"+ brandDivId +"-img' class='left' src='http://placehold.it/50x50&text=[img]'/>"
			+ 		"<span style='vertical-align:top'>&nbsp;"+brand.name+"&nbsp;</span>"
			+			"<span id='"+brandDivId+"-edit' class='fi-pencil small' style='display:none'></span><br />"
			+     "<span id='"+ brandDivId +"-name' style='font-weight:normal;'>&nbsp;#"+ brand.brand_id +"</span>"
			+		"</div>"
			+ 	"<div class='small-4 columns brandAbout' id='"+brandDivId+"-about'>"
			+ 		"About &#9658;"
			+		"</div>"
			+ "</div>"			
			+	"<div id='"+brandDivId+"-members'>"
			+ 	"<b>Memberships</b>"
			+ 	"<div>Total: "+ tally.numMembers +" members, "+ tally.totalMemberHours +" hours/week &#9658;</div>"
			+	"</div>"
			+	"<div id='"+brandDivId+"-accounts'>"
			+ 	"<b>Accounts</b>"
			+ 	"<div>Budgets: -"+ tally.revBudget +" rev., "+ tally.expBudget +" expense &#9658;</div>"
			+	"</div>"
			+	"<div id='"+brandDivId+"-records'>"
			+ 	"<b>Transactions</b>"
			+ 	"<div>Added="+ tally.addedBudget +", In="+ tally.inflow +", Out="+ tally.outflow +" &#9658;</div>"
			+	"</div>"
			+	"<div id='"+brandDivId+"-throttles'>"
			+ 	"<b>Throttles &#9658;</b>"
			+	"</div>"
			+"</div>"
		);
	}
	
	main.clickHandler = function (e) {		
		if (e.target.id=='addBrand') {
			app.forms({}, 'about', '/forms#brand-registration');
			if (!addBrandInit) {
				$('#about-type_id').val(9);
				$('#about-country_code').val('USA'); 
				addBrandInit = 1;
			}
			
			return;
		}
		
		var divId = app.getDivId(e,'brand');
		if (!divId) return;
		
		var id = divId.split('-');
		currBrandDivId = id[0]+'-'+id[1];
		app.currView = id[2];
		app[app.currView](app.resources[currBrandDivId]);
	}
	
	return main;
}