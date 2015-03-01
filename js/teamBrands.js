function teamBrands(api) {
	var currURL, currBrands;

	function main(brandURL) {	
		if (!brandURL || !brandURL.length) {
			$("#brandsWrapper").html("You do not have any current team memberships.");
			return;
		}
	
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
			+     "<span id='"+ brandDivId +"-name' style='font-weight:normal;'>&nbsp;#"+ brand.brand_id +"</span>"
			+		"</div>"
			+ 	"<div class='small-4 columns brandAbout' id='"+brandDivId+"-about'>"
			+ 		"About &#9658;"
			+		"</div>"
			+ "</div>"			
			
			+ "<div>Role: "+ brand.role +"&nbsp;"
			+ (brand.actions && brand.actions.indexOf('/forms#member-accept') !=-1 
				? "<button class='tiny' id='"+brandDivId+"-accept' style='width:5.0rem; margin-bottom:0.5rem;'>Accept</button>&nbsp;" 
				: "")
					
			+ (brand.actions && brand.actions.indexOf('/forms#member-revoke') !=-1 
				? "<button class='tiny' id='"+brandDivId+"-revoke' style='width:5.0rem; margin-bottom:0.5rem;'>Revoke</button>" 
				: "")
				
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
		var divId = app.getDivId(e,'brand');		
		if (!divId) return;	
		
		if (e.target.tagName.toUpperCase()=="BUTTON") {		
			var divIdArr = app.getDivId(e,'brand').split('-'), action = divIdArr.pop(), divId=divIdArr.join('-');		
			app.forms(divId, action, '/forms#member-'+action, 'brands');
		}		
		else {
			var id = divId.split('-');
			currBrandDivId = id[0]+'-'+id[1];
			app.currView = id[2];
			app[app.currView](app.resources[currBrandDivId]);
		}
	}
	
	return main;
}