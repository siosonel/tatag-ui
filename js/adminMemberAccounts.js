function adminMemberAccounts(api) {
	var currURL, currResource, currCollection;
	
	function main(member) {
		if (member) currResource = member; 
		if (!currResource || app.currView != 'memberAccounts') return;
		app.currView = 'memberAccounts';
		
		var url = currResource.links.accounts; //console.log(currResource); console.log(url);
		$('#memberAccountsWrapper').children().remove();
		$('#memberAccountsWrapper').append(setTitle(currResource))
		
		$('#membersWrapper').animate({left: '-100%'});
		$('#memberAccountsWrapper').animate({left: '0'});

		//refresh info as needed using second argument to loadId
		api.loadId(url, app.refresh()).then(renderAccounts, app.errHandler)
	}
	
	function setTitle() {
		$('#memberAccountsWrapper').append(
			"<div class='subLabel'>"
			+	 "<span style='vertical-align:top; font-weight: 700;'>&#9668; "+currResource.name+" accounts, </span>"
			+  "<span style='font-weight:normal;'>&nbsp; member#"+ currResource.member_id +"</span>"
			+	 "<button id='addAccountHolding' class='right tiny'>+New Accountholding</button>"
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
	
	function renderAccounts(accounts) {
		currCollection = accounts;
		accounts.items.map(renderItem)
	}
	
	function renderItem(holder) { 
		var date = holder.created.split(' ')[0].split('-');
		var divId = 'memberAccount-'+ holder.holder_id;
		app.resources[divId] = holder;
		
		$('#memberAccountsWrapper').append(
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
			app.forms(currCollection, 'holders', '/forms#holder-add');
			return;
		}		
		
		$('#holders-new-row').css('display', 'none');
		var cls = e.target.className, pCls = e.target.parentNode.className, ppCls = e.target.parentNode.parentNode.className;
		
		if (cls=='subLabel' || pCls=='subLabel' || ppCls=='subLabel') {
			$('#membersWrapper').animate({left: '0px'});
			$('#memberAccountsWrapper').animate({left: '100%'});
			app.currView = 'members';
		}
		
		var divId = app.getDivId(e, 'memberAccount');
		if (!divId) return;
		
		app.forms(divId, 'holders', '/forms#admin-holder-edit', 'memberAccounts');
	}
	
	return main;
}