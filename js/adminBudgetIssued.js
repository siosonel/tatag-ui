function adminBudgetIssued(api) {
	var currURL, currResource;
	
	function main(brand) {
		if (brand) currBrand = brand;
		if (!currBrand || app.currView != 'issued') return;
		app.currView = 'issued';
		
		var url = currBrand.links.budgetIssued;	console.log(url);
		$('#issuedWrapper').children().remove();
		$('#issuedWrapper').append(setTitle(currBrand))
		
		$('#brandsWrapper').animate({left: '-485px'});
		$('#issuedWrapper').animate({left: '0px'});

		//refresh info as needed using second argument to loadId
		api.loadId(url, app.refresh()).then(renderRecords, app.errHandler)
	}
	
	function setTitle() {
		$('#issuedWrapper').append(
			"<div class='subLabel'>"
			+	 "<span style='vertical-align:top; font-weight: 700;'>&#9668; "+currBrand.name+" issued budget, </span>"
			+  "<span style='font-weight:normal;'>&nbsp; brand#"+ currBrand.brand_id +"</span>"
			+"</div>"
			+"<div id='brandItemsHeading' class='row brandItem' style='margin: 5px;'>"
			+		"<div class='large-2 medium-2 small-2 columns'>Date</div>"
			+ 	"<div class='large-7 medium-7 small-7 columns' style='text-align: left; margin-bottom:10px;'>"
			+ 		"Record Details"
			+		"</div>"
			+ 	"<div class='large-3 medium-3 small-3 columns' style='text-align: right;'>Amount</div>"
			+'</div>'
		);
	}
	
	function renderRecords(records) {
		records.items.map(renderItem)
	}
	
	function renderItem(record) { console.log(record)
		var date = record.created.split(' ')[0].split('-');
		var divId = 'record-'+ record.record_id; console.log(divId)
		
		$('#issuedWrapper').append(
			"<div id='"+divId+"' class='row brandItem' style='margin: 5px;'>"
			+		"<div class='large-2 medium-2 small-2 columns'>"+ date[1] +'/'+ date[2] +"</div>"
			+ 	"<div class='large-7 medium-7 small-7 columns' style='text-align: left; margin-bottom:10px;'>"
			+ 		"#"+record.from_acct +" to #"+record.to_acct+'<br />'+ record.note
			+		"</div>"
			+ 	"<div class='large-3 medium-3 small-3 columns' style='text-align: right;'>"+ record.amount.toFixed(2) +"</div>"
			//+ 	"<div id='"+divId+"-toggle' class='recordDivToggle'>&#9660;&#9660;&#9660;</div>"
			+'</div>'
		)
	}
	
	main.clickHandler = function (e) {
		var cls = e.target.className, pCls = e.target.parentNode.className, ppCls = e.target.parentNode.parentNode.className; 
		
		if (cls=='subLabel' || pCls=='subLabel' || ppCls=='subLabel') { console.log(cls+'' +pCls+' '+ppCls);
			app('issuedWrapper');
		}
	}
	
	return main;
}