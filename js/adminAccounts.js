function adminAccounts(api) {
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
		api.loadId(url, app.refresh()).then(renderAccounts, app.errHandler)
	}
	
	function setTitle() {
		$('#accountsWrapper').append(
			"<div class='row subLabel'>"
			+	"<div class='columns small-8'>"
			+  	"<span style='vertical-align:top; font-weight: 700;'>&#9668; "+currBrand.name+" accounts, </span>"
			+  	"<span style='font-weight:normal;'>&nbsp; brand#"+ currBrand.id +"</span>"
			+	"</div>"
			+	"<div class='columns small-4'>"
			+	 	"<button id='addAccount' class='right tiny' style='margin:0;'>+New Account</button>"
			+ "</div>"
			+"</div>"
			+"<div id='brandItemsHeading' class='row acctItem' style='margin: 0 5px;'>"
			+		"<div class='small-2 columns'>Created</div>"
			+ 	"<div class='small-7 columns' style='margin-bottom:10px;'>"
			+ 		"Account Information"
			+		"</div>"
			+ 	"<div class='large-3 medium-3 small-3 columns' style='text-align: right;'>Balance</div>"
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
			+		"<div class='large-2 medium-2 small-2 columns'>"+ date[1] +'/'+ date[2] +"<br/>"+ date[0] +"</div>"
			+ 	"<div class='large-7 medium-7 small-7 columns' style='text-align: left; margin-bottom:10px;'>"
			+ 		account.name+"<br />#"+account.id+', '+ account.authcode +'&nbsp;'
			+			(account.throttle_id ? "<span>, throttle #"+account.throttle_id+"&nbsp;</span>" : "")
			+			"<span class='fi-pencil small'>&nbsp;</span><br />"
			+			"<span href='"+account.holders+"' style='text-decoration:underline'>holders</span>"
			+		"</div>"
			+ 	"<div class='large-3 medium-3 small-3 columns' style='text-align: right;'>"+ account.balance +"</div>"
			//+ 	"<div id='"+divId+"-toggle' class='acctDivToggle'>&#9660;&#9660;&#9660;</div>"
			+'</div>'
		)
	}
	
	main.clickHandler = function (e) {
		if (e.target.id=='addAccount') {
			$('#accounts-sign-row').css('display','block');
			app.forms(currCollection, 'accounts', currCollection.add);
			return;
		}
		
		$('#accounts-sign-row').css('display','none');
		
		if (app.getCls(e).indexOf('subLabel') != -1) {
			app('accountsWrapper');
		}
		
		var divId = app.getDivId(e, 'acct');
		if (!divId) return;
		
		if ($(e.target).attr('href')) { 
			app.currView = 'accountHolders';
			app.accountHolders(app.resources[e.target.parentNode.parentNode.id]);
			return;
		}
		
		var account = app.resources[divId];
		app.forms(divId, 'accounts', account.edit);
	}
	
	return main;
}