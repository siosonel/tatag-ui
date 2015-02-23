function teamBrands(api) {
	var currURL, currBrands;

	function main(brandURL) {		
		if (brandURL) currURL = brandURL;
		$('#brandsWrapper').children().remove(); //console.log(currURL); console.log(api.byId[currURL]);
		
		api.deref(currURL, app.refresh())
			.then(renderBrands, app.errHandler);	
	}
	
	function renderBrands(brands) {
		currBrands = brands;
		currBrands.map(renderBrandDiv);
	}
	
	function renderBrandDiv(brand) { //console.log(brand);
		var tally = brand.tally, brandDivId='brand-'+brand.brand_id;		
		app.resources[brandDivId] = brand;
	
		$('#brandsWrapper').append(
			 "<div class='large-12 brandItem' id='"+brandDivId+"'>"
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
			+	"<div class='row' id='"+brandDivId+"-members'>"
			+ 	"<div class='columns small-3'>Memberships</div>"
			+ 	"<div class='columns small-9'>Total: "+ tally.numMembers +" members, "+ tally.totalMemberHours +" hours/week &#9658;</div>"
			+	"</div>"
			+	"<div class='row' id='"+brandDivId+"-accounts'>"
			+ 	"<div class='columns small-3'>Accounts</div>"
			+ 	"<div class='columns small-9'>Budgets: -"+ tally.revBudget +" rev., "+ tally.expBudget +" expense &#9658;</div>"
			+	"</div>"
			+	"<div class='row' id='"+brandDivId+"-records'>"
			+ 	"<div class='columns small-3'>Transactions</div>"
			+ 	"<div class='columns small-9'>Added="+ tally.addedBudget +", In="+ tally.inflow +", Out="+ tally.outflow +" &#9658;</div>"
			+	"</div>"
			+"</div>"
		);
	}
	
	main.clickHandler = function (e) {
		var divId = app.getDivId(e,'brand');
		if (!divId) return;
		
		var id = divId.split('-');
		currBrandDivId = id[0]+'-'+id[1];
		app.currView = id[2];
		app[app.currView](app.resources[currBrandDivId]);
	}
	
	return main;
}