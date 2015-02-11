function adminAccounts(api) {
	var currURL, currResource;
	
	function main(brand) {
		if (brand) currBrand = brand; console.log(currBrand)
		if (!currBrand || app.currView != 'accounts') return;
		app.currView = 'accounts';
		
		var url = currBrand.links.brandAccounts;		
		$('#membersWrapper').children().remove();
		$('#membersWrapper').append(setTitle(currBrand))
		
		$('#brandsWrapper').animate({left: '-485px'});
		$('#accountsWrapper').animate({left: '0px'});

		//refresh info as needed using second argument to loadId
		api.loadId(url, app.refresh()).then(renderAccounts, app.errHandler)
	}
	
	function setTitle() {
		$('#accountsWrapper').append(
			"<div id='brandItemsHeading' class='row acctItem' style='margin: 5px;'>"
			+		"<div class='large-2 medium-2 small-2 columns'>Created</div>"
			+ 	"<div class='large-7 medium-7 small-7 columns' style='text-align: left; margin-bottom:10px;'>"
			+ 		"Account Information"
			+		"</div>"
			+ 	"<div class='large-3 medium-3 small-3 columns' style='text-align: right;'>Balance</div>"
			+'</div>'
		);
	}
	
	function renderAccounts(accounts) { console.log(accounts)
		accounts.items.map(renderItem)
	}
	
	function renderItem(account) { console.log(account)
		var date = account.created.split(' ')[0].split('-');
		var divId = 'acct-'+ account.account_id; //console.log(divId)
		
		$('#accountsWrapper').append(
			"<div id='"+divId+"' class='row brandItem' style='margin: 5px;'>"
			+		"<div class='large-2 medium-2 small-2 columns'>"+ date[1] +'/'+ date[2] +"<br/>"+ date[0] +"</div>"
			+ 	"<div class='large-7 medium-7 small-7 columns' style='text-align: left; margin-bottom:10px;'>"
			+ 		account.name+"<br />#"+account.account_id+', '+ account.authcode
			+		"</div>"
			+ 	"<div class='large-3 medium-3 small-3 columns' style='text-align: right;'>"+ account.balance +"</div>"
			+ 	"<div id='"+divId+"-toggle' class='acctDivToggle'>&#9660;&#9660;&#9660;</div>"
			+'</div>'
		)
	}
	
	return main;
}