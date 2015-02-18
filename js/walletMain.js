function walletMain(conf) {
	var User, resources={}, refresh=0;
	
	var api = apiClass({
		'userid': conf.userid, 
		'pass': conf.pass,
		'baseURL': '/tatag' //will be used as prefix
	});
	
	$(document).ready(function () {
		main.cards = walletCards(api);		
		main.records = walletRecords(api);		
		main.txn = walletTxn(api);		
		main.edit = walletEdit(api);
		
		api.init('/')
			.then(loadUser)
			.then(setUser, main.errHandler);
			
		$('#accountsWrapper').click(main.cards.toggleAcctItem);
		$('#recordsWrapper').click(main.records.toggleRecordItem);
		$('#txnForm').click(main.txn.formClick);
		$('#editForm, #editPrompt').click(main.edit.formClick);
	})
	
	function main() {
		$('#recordsWrapper').animate({left: '485px'});
		$('#accountsWrapper').animate({left: '0px'});
	}

	function loadUser(res) {
		return api.loadType('user');
	}

	function setUser(res) { 
		User = res;
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
	
	main.errHandler = function errHandler(err) {
		console.log(err)
	}
	
	return main
}