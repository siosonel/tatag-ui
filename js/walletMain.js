function walletMain(conf) {
	var User, resources={}, refresh=0;
	
	var api = apiClass({
		'userid': conf.userid, 
		'pass': conf.pass,
		'baseURL': '/tatag' //will be used as prefix
	});
	
	$(document).ready(function () {
		history.replaceState({}, "wallet", "/ui/wallet");
		
		main.cards = walletCards(api);		
		main.records = walletRecords(api);		
		main.txn = walletTxn(api);		
		main.edit = walletEdit(api);
		main.me = me();
		
		api.init('/')
			.then(loadUser)
			.then(setUser, main.errHandler);
			
		$('#accountsWrapper').click(main.cards.toggleAcctItem);
		$('#recordsWrapper').click(main.records.toggleRecordItem);
		$('#scrollTo').click(main.records.scrollMore);
		$('#txnForm').click(main.txn.formClick);
		$('#relayInfo').click(main.txn.postRelayRefresh);
		$('#editForm, #editPrompt').click(main.edit.formClick);
	})
	
	function main() {
		$('#accountsWrapper').animate({left: '0'});
		$('#recordsWrapper').animate({left: '100%'});
	}

	function loadUser(res) {
		return api.loadType('user');
	}

	function setUser(res) { 
		User = res;
		main.me(User.user_id, User.name, User.login_provider);
		main.cards(User.links.userAccounts);
	}
	
	main.api = api;
	main.resources = resources;
	main.currView = 'cards';
	
	main.refresh = function (num) { //argument=number of views to refresh
		if (num) refresh=num;
		else refresh = refresh-1;
		return refresh+1;
	}
	
	main.errHandler = function errHandler(err) { console.log(err.message)
		if (err.message=="Unauthorized") main.me.modal();
	}
	
	return main
}