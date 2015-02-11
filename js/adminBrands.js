function adminBrands(api) {
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
	
	function renderBrandDiv(brand) { console.log(brand);
		var tally = brand.tally, brandDivId='brand-'+brand.brand_id;		
		app.resources[brandDivId] = brand;
	
		$('#brandsWrapper').append(
			 "<div class='large-12 brandItem' id='"+brandDivId+"'>"
			+ "<div class='row' style='margin-bottom:30px;' id='"+ brandDivId +"-label'>"
			+ 	"<div class='large-8 medium-8 small-8 columns brandLabel'>"
			+			"<img id='"+ brandDivId +"-img' class='left' src='http://placehold.it/50x50&text=[img]'/>"
			+ 		"<span style='vertical-align:top'>&nbsp;"+brand.name+"&nbsp;</span>"
			+			"<span id='"+brandDivId+"-edit' class='fi-pencil small' style='display:none'></span><br />"
			+     "<span id='"+ brandDivId +"-name' style='font-weight:normal;'>&nbsp;#"+ brand.brand_id +"</span>"
			+		"</div>"
			+ 	"<div class='large-4 medium-4 small-4 columns brandAbout' id='"+brandDivId+"-about'>"
			+ 		"About"
			+		"</div>"
			+ "</div>"			
			+	"<div class='row'>"
			+ 	"<div class='columns large-3 medium-3 small-3'>Memberships</div>"
			+ 	"<div class='columns large-9 medium-9 small-9'>Total: "+ tally.numMembers +" members, "+ tally.totalMemberHours +" hours/week &#9658;</div>"
			+	"</div>"
			+	"<div class='row'>"
			+ 	"<div class='columns large-3 medium-3 small-3'>Accounts</div>"
			+ 	"<div class='columns large-9 medium-9 small-9'>Budgets: -"+ tally.revBudget +" rev., "+ tally.expBudget +" expense &#9658;</div>"
			+	"</div>"
			+	"<div class='row'>"
			+ 	"<div class='columns large-3 medium-3 small-3'>Transactions</div>"
			+ 	"<div class='columns large-9 medium-9 small-9'>Added="+ tally.addedBudget +", In="+ tally.inflow +", Out="+ tally.outflow +" &#9658;</div>"
			+	"</div>"
			+"</div>"
		);
	}
	
	main.clickHandler = function (e) {
		var id = e.target.id, pid = e.target.parentNode.id, ppid = e.target.parentNode.parentNode.id;
		var idArr = [id, pid, ppid];
		var typeArr = [id.split('-')[0], pid.split('-')[0], ppid.split('-')[0]];
		
		if (typeArr.indexOf('brand')!=-1) {
			currBrandDivId = idArr[typeArr.indexOf('brand')]; console.log(currBrandDivId)
			//app.currView = 'members';
			//app.members(app.resources[currBrandDivId]);
			
			//app.currView = 'accounts';
			//app.accounts(app.resources[currBrandDivId]);
			
			app.currView = 'issued';
			app.issued(app.resources[currBrandDivId]);
		}
	}
	
	return main;
}