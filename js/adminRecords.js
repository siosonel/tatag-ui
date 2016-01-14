function adminRecords(api) {
	var currURL, currBrand, budgetRecords, currCollection; 
	var currType='issued';
	
	function main(brand) {
		if (brand) currBrand = brand;
		if (!currBrand || app.currView != 'records') return;
		app.currView = 'records';
		
		var url = currBrand.records;
		$('#recordsTitle, #recordsItems').children().remove();
		setTitle(currBrand);
		
		$('#brandsWrapper').animate({left: '-100%'});
		$('#recordsWrapper').animate({left: '0'});

		//refresh info as needed using second argument to loadId
		api.loadId(url, app.refresh()).then(derefLinks, app.errHandler)
	}
	
	function setTitle() {
		$('#recordsTitle').append(
			"<div class='subLabel'>"
			+	 "<span style='vertical-align:top; font-weight: 700;'>&#9668; "+currBrand.name+", budget "+ currType +"</span>"
			//+  "<span style='font-weight:normal;'>&nbsp; brand#"+ currBrand.brand_id +"</span>"
			+"</div>"
		);
		
		$('#recordsItems').append(
			"<div id='brandItemsHeading' class='row brandItem' style='margin: 5px;'>"
			+		"<div class='large-2 medium-2 small-2 columns'>Date</div>"
			+ 	"<div class='large-7 medium-7 small-7 columns' style='text-align: left; margin-bottom:10px;'>"
			+ 		"Record Details"
			+		"</div>"
			+ 	"<div class='large-3 medium-3 small-3 columns' style='text-align: right;'>Amount</div>"
			+'</div>'
		);
	}
	
	function derefLinks(resource) {
		budgetRecords = resource;
		api.loadId(budgetRecords[currType]).then(renderCollection)
	}
	
	function renderCollection(collection) { 
		currCollection = collection;
		currCollection.items.map(renderItem);
		app.adjustHeight();
	}
	
	function renderItem(record) {
		var date = record.created.split(' ')[0].split('-');
		var divId = 'record-'+ record.record_id;
		
		$('#recordsItems').append(
			"<div id='"+divId+"' class='row brandItem' style='margin: 5px;'>"
			+		"<div class='large-2 medium-2 small-2 columns'>"+ date[1] +'/'+ date[2] +"</div>"
			+ 	"<div class='large-7 medium-7 small-7 columns' style='text-align: left; margin-bottom:10px;'>"
			+ 		"#"+record.from +" to #"+record.to+'<br />'+ record.note
			+		"</div>"
			+ 	"<div class='large-3 medium-3 small-3 columns' style='text-align: right;'>"+ record.amount.toFixed(2) +"</div>"
			//+ 	"<div id='"+divId+"-toggle' class='recordDivToggle'>&#9660;&#9660;&#9660;</div>"
			+'</div>'
		)
	}
	
	main.clickHandler = function (e) {
		if (e.target.tagName=='BUTTON') {
			currType = e.target.id.split('-')[1];
			main();
			return;
		}
		
		var cls = e.target.className, pCls = e.target.parentNode.className, ppCls = e.target.parentNode.parentNode.className; 
		
		if (cls=='subLabel' || pCls=='subLabel' || ppCls=='subLabel') { console.log(cls+'' +pCls+' '+ppCls);
			app('recordsWrapper');
		}
	}
	
	return main;
}