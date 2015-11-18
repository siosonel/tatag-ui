function adminMemberHoldings(api) {
	var currURL, currResource, currCollection;
	
	function main(member) {
		if (member) currResource = member; 
		if (!currResource || app.currView != 'memberHoldings') return;
		app.currView = 'memberHoldings';
		
		var url = currResource.holdings; //console.log(currResource); console.log(url);
		$('#memberHoldingsWrapper').children().remove();
		$('#memberHoldingsWrapper').append(setTitle(currResource))
		
		$('#membersWrapper').animate({left: '-100%'});
		$('#memberHoldingsWrapper').animate({left: '0'});

		//refresh info as needed using second argument to loadId
		api.loadId(url, app.refresh()).then(renderAccounts, app.errHandler)
	}
	
	function setTitle() {
		$('#memberHoldingsWrapper').append(
			"<div class='row subLabel'>"
			+		"<div class='columns small-8'>"
			+	 		"<span style='vertical-align:top; font-weight: 700;'>&#9668; "+currResource.name+" accounts, </span>"
			+ 		"<span style='font-weight:normal;'>&nbsp; member#"+ currResource.member_id +"</span>"
			+		"</div>"
			+		"<div class='columns small-4'>"
			+	 		"<button id='addAccountHolding' class='right tiny' style='margin:0;'>+New Accountholding</button>"
			+		"</div>"
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
	
	function renderAccounts(holdings) {
		currCollection = holdings;
		holdings.holding.map(renderItem);
		app.adjustHeight();
	}
	
	function renderItem(holder) {
		var date = holder.created.split(' ')[0].split('-');
		var divId = 'memberHolding-'+ holder.holder_id;
		app.resources[divId] = holder;
		
		$('#memberHoldingsWrapper').append(
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
		if (e.target.id=='addAccountHolding') {
			$('#holders-new-row').css('display', 'block');
			app.forms(currCollection, 'holders', '/form/holder-add');
			return;
		}		
		
		$('#holders-new-row').css('display', 'none');
		
		if (app.getCls(e).indexOf('subLabel') != -1) {
			$('#membersWrapper').animate({left: '0px'});
			$('#memberHoldingsWrapper').animate({left: '100%'});
			app.currView = 'members';
			app.adjustHeight();
		}
		
		var divId = app.getDivId(e, 'memberHolding');
		if (!divId) return;
		
		app.forms(divId, 'holders', '/form/admin-holder-edit', 'memberHoldings');
	}
	
	return main;
}