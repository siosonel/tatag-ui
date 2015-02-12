function adminAccounts(api) {
	var currBrand, currResource;
	
	function main(brand) {
		if (brand) currBrand = brand; 
		if (!currBrand || app.currView != 'accounts') return;
		app.currView = 'accounts';
		
		var url = currBrand.links.brandAccounts;		
		$('#accountsWrapper').children().remove();
		$('#accountsWrapper').append(setTitle(currBrand))
		
		$('#brandsWrapper').animate({left: '-485px'});
		$('#accountsWrapper').animate({left: '0px'});

		//refresh info as needed using second argument to loadId
		api.loadId(url, app.refresh()).then(renderAccounts, app.errHandler)
	}
	
	function setTitle() {
		$('#accountsWrapper').append(
			"<div class='subLabel'>"
			+	 "<span style='vertical-align:top; font-weight: 700;'>&#9668; "+currBrand.name+" accounts, </span>"
			+  "<span style='font-weight:normal;'>&nbsp; brand#"+ currBrand.brand_id +"</span>"
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
		accounts.items.map(renderItem)
	}
	
	function renderItem(account) {
		var date = account.created.split(' ')[0].split('-');
		var divId = 'acct-'+ account.account_id;
		app.resources[divId] = account;
		
		$('#accountsWrapper').append(
			"<div id='"+divId+"' class='row brandItem' style='margin: 5px;'>"
			+		"<div class='large-2 medium-2 small-2 columns'>"+ date[1] +'/'+ date[2] +"<br/>"+ date[0] +"</div>"
			+ 	"<div class='large-7 medium-7 small-7 columns' style='text-align: left; margin-bottom:10px;'>"
			+ 		account.name+"<br />#"+account.account_id+', '+ account.authcode +'&nbsp;'
			+			"<span class='fi-pencil small'>&nbsp;</span>"
			+			"<span href='"+account.links.holders+"' style='text-decoration:underline'>holders</span>"
			+		"</div>"
			+ 	"<div class='large-3 medium-3 small-3 columns' style='text-align: right;'>"+ account.balance +"</div>"
			//+ 	"<div id='"+divId+"-toggle' class='acctDivToggle'>&#9660;&#9660;&#9660;</div>"
			+'</div>'
		)
	}
	
	main.clickHandler = function (e) {
		var cls = e.target.className, pCls = e.target.parentNode.className, ppCls = e.target.parentNode.parentNode.className;
		
		if (cls=='subLabel' || pCls=='subLabel' || ppCls=='subLabel') {
			app('accountsWrapper');
		}
		
		var divId = app.getDivId(e, 'acct');
		if (!divId) return;
		
		if ($(e.target).attr('href')) { console.log($(e.target).attr('href'));
			app.currView = 'accountHolders';
			app.accountHolders(app.resources[e.target.parentNode.parentNode.id]);
			return;
		}
		
		app.forms(divId, 'accounts', '/forms#admin-account-edit');
	}
	
	return main;
}