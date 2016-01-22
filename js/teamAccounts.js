function teamAccounts(api) {
	var currBrand, currResource, currCollection;
	
	function main(brand) {
		if (brand) currBrand = brand; 
		if (!currBrand || app.currView != 'accounts') return;
		app.currView = 'accounts';
		
		var url = currBrand.accounts;		
		$('#accountsWrapper').children().remove();
		$('#accountsWrapper').append(setTitle(currBrand))
		
		$('#brandsWrapper').animate({left: '-100%'});
		$('#accountsWrapper').animate({left: '0'});

		//refresh info as needed using second argument to loadId
		api.loadId(url).then(renderAccounts, app.errHandler)
	}
	
	function setTitle() {
		$('#accountsWrapper').append(
			"<div class='subLabel'>"
			+	 "<span style='vertical-align:top; font-weight: 700;'>&#9668; "+currBrand.name+" accounts, </span>"
			+  "<span style='font-weight:normal;'>&nbsp; brand#"+ currBrand.id +"</span>"
			+"</div>"
			+"<div id='brandItemsHeading' class='row acctItem' style='margin: 5px;'>"
			+		"<div class='small-2 columns'>Created</div>"
			+ 	"<div class='small-7 columns' style='text-align: left; margin-bottom:10px;'>"
			+ 		"Account Information"
			+		"</div>"
			+ 	"<div class='small-3 columns' style='text-align: right;'>Balance</div>"
			+'</div>'
		);
	}
	
	function renderAccounts(accounts) { 
		currCollection = accounts;
		accounts.account.map(renderItem);
		app.adjustHeight();
	}
	
	function renderItem(account) {
		var date = account.created.split(' ')[0].split('-');
		var divId = 'acct-'+ account.id;
		app.resources[divId] = account;
		
		$('#accountsWrapper').append(
			"<div id='"+divId+"' class='row brandItem' style='margin: 5px;'>"
			+		"<div class='small-2 columns'>"+ date[1] +'/'+ date[2] +"<br/>"+ date[0] +"</div>"
			+ 	"<div class='small-7 columns' style='text-align: left; margin-bottom:10px;'>"
			+ 		account.name+"<br />#"+account.id+', '+ account.authcode +'&nbsp;'
			+			(account.throttle_id ? "<span>, throttle #"+account.throttle_id+"&nbsp;</span>" : "")
			+		"</div>"
			+ 	"<div class='small-3 columns' style='text-align: right;'>"+ account.balance +"</div>"
			//+ 	"<div id='"+divId+"-toggle' class='acctDivToggle'>&#9660;&#9660;&#9660;</div>"
			+'</div>'
		)
	}
	
	main.clickHandler = function (e) {
		var cls = e.target.className, pCls = e.target.parentNode.className, ppCls = e.target.parentNode.parentNode.className;
		
		if (cls=='subLabel' || pCls=='subLabel' || ppCls=='subLabel') {
			app('accountsWrapper');
		}
	}
	
	return main;
}