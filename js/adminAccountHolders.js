function adminAccountHolders(api) {
	var currURL, currResource;
	
	function main(resource) {
		if (resource) currResource = resource; 
		if (!currResource || app.currView != 'accountHolders') return;
		app.currView = 'accountHolders';
		
		var url = currResource.holders;	//console.log(currResource); console.log(url);
		$('#accountHoldersWrapper').children().remove();
		$('#accountHoldersWrapper').append(setTitle(currResource))
		
		$('#accountsWrapper').animate({left: '-100%'});
		$('#accountHoldersWrapper').animate({left: '0'});

		//refresh info as needed using second argument to loadId
		api.loadId(url, app.refresh()).then(renderAccounts, app.errHandler)
	}
	
	function setTitle() {
		$('#accountHoldersWrapper').append(
			"<div class='row subLabel'>"
			+	"<div class='columns small-8'>"
			+	 "<span style='vertical-align:top; font-weight: 700;'>&#9668; "+currResource.name+" holders, </span>"
			+  "<span style='font-weight:normal;'>&nbsp; account#"+ currResource.account_id +"</span>"
			+	"</div>"
			+	"<div class='columns small-4'>"
			+	 "<button id='addAccountHolder' class='right tiny' style='margin:0;'>+New Accountholder</button>"
			+ "</div>"
			+"</div>"
			+"<div id='brandItemsHeading' class='row acctItem' style='margin: 0 5px;'>"
			+		"<div class='small-2 columns'>Created</div>"
			+ 	"<div class='small-7 columns' style='margin-bottom:10px;'>"
			+ 		"Account Information"
			+		"</div>"
			+ 	"<div class='small-3 columns' style='text-align: right;'>Balance</div>"
			+'</div>'
		);
	}
	
	function renderAccounts(holders) { 
		currCollection = holders;
		holders.holder.map(renderItem);
		app.adjustHeight();
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
			app.forms(currCollection, 'holders', '/form/holder-add');
			return;
		}		
		
		$('#holders-new-row').css('display', 'none');		
		
		if (app.getCls(e).indexOf('subLabel') != -1) {
			$('#accountsWrapper').animate({left: '0px'});
			$('#accountHoldersWrapper').animate({left: '100%'});
			app.currView = 'accounts';
			app.adjustHeight();
		}
		
		var divId = app.getDivId(e, 'accountHolder');
		if (!divId) return;
		
		app.forms(divId, 'holders', '/form/admin-holder-edit', 'accountHolders');
	}
	
	return main;
}