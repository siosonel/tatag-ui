function adminAccountHolders(api) {
	var currURL, currResource;
	
	function main(resource) {
		if (resource) currResource = resource; 
		if (!currResource || app.currView != 'accountHolders') return;
		app.currView = 'accountHolders';
		
		var url = currResource.links.holders;	//console.log(currResource); console.log(url);
		$('#accountHoldersWrapper').children().remove();
		$('#accountHoldersWrapper').append(setTitle(currResource))
		
		$('#accountsWrapper').animate({left: '-485px'});
		$('#accountHoldersWrapper').animate({left: '0px'});

		//refresh info as needed using second argument to loadId
		api.loadId(url, app.refresh()).then(renderAccounts, app.errHandler)
	}
	
	function setTitle() {
		$('#accountHoldersWrapper').append(
			"<div class='subLabel'>"
			+	 "<span style='vertical-align:top; font-weight: 700;'>&#9668; "+currResource.name+" holders, </span>"
			+  "<span style='font-weight:normal;'>&nbsp; account#"+ currResource.account_id +"</span>"
			+	 "<button id='addAccountHolder' class='right tiny'>+New Accountholder</button>"
			+"</div>"
			+"<div id='brandItemsHeading' class='row acctItem' style='margin: 5px;'>"
			+		"<div class='large-2 medium-2 small-2 columns'>Created</div>"
			+ 	"<div class='large-7 medium-7 small-7 columns' style='text-align: left; margin-bottom:10px;'>"
			+ 		"Account Information"
			+		"</div>"
			+ 	"<div class='large-3 medium-3 small-3 columns' style='text-align: right;'>Balance</div>"
			+'</div>'
		);
	}
	
	function renderAccounts(holders) { 
		currCollection = holders;
		holders.items.map(renderItem)
	}
	
	function renderItem(holder) {
		var date = holder.created.split(' ')[0].split('-');
		var divId = 'accountHolder-'+ holder.holder_id;
		app.resources[divId] = holder;
		
		$('#accountHoldersWrapper').append(
			"<div id='"+divId+"' class='row brandItem' style='margin: 5px;'>"
			+		"<div class='large-2 medium-2 small-2 columns'>"+ date[1] +'/'+ date[2] +"<br/>"+ date[0] +"</div>"
			+ 	"<div class='large-7 medium-7 small-7 columns' style='text-align: left; margin-bottom:10px;'>"
			+ 		holder.name+"<br />#"+holder.account_id
			+		"</div>"
			+ 	"<div class='large-3 medium-3 small-3 columns' style='text-align: right;'>"
			+ 		holder.authcode +"&nbsp; <span class='fi-pencil small'></span>"
			+ 	"</div>"
			//+ 	"<div id='"+divId+"-toggle' class='acctDivToggle'>&#9660;&#9660;&#9660;</div>"
			+'</div>'
		)
	}
	
	main.clickHandler = function (e) {
		if (e.target.id=='addAccountHolder') {
			$('#holders-new-row').css('display', 'block');
			app.forms(currCollection, 'holders', '/forms#holder-add');
			return;
		}		
		
		$('#holders-new-row').css('display', 'none');		
		var cls = e.target.className, pCls = e.target.parentNode.className, ppCls = e.target.parentNode.parentNode.className;
		
		if (cls=='subLabel' || pCls=='subLabel' || ppCls=='subLabel') {
			$('#accountsWrapper').animate({left: '0px'});
			$('#accountHoldersWrapper').animate({left: '485px'});
			app.currView = 'accounts';
		}
		
		var divId = app.getDivId(e, 'accountHolder');
		if (!divId) return;
		
		app.forms(divId, 'holders', '/forms#admin-holder-edit', 'accountHolders');
	}
	
	return main;
}