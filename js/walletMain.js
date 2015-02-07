function walletMain() {
	var User, resources={};
	var cards, forms, records;
	
	var api = apiClass({
		'userid': '21', 
		'pass': 'pass2',
		'baseURL': '/tatag' //will be used as prefix
	});
	
	$(document).ready(function () {
		cards = walletCards(api);
		main.cards = cards;
		
		forms = walletForms(api);
		main.forms = forms;
		
		records = walletRecords(api);
		main.records = records;
		
		api.init('/')
			.then(loadUser)
			.then(setUserAccounts, main.errHandler);
			
		$('#accountsWrapper').click(cards.toggleAcctItem);
		$('#recordsWrapper').click(records.toggleRecordItem);
		$('#txnForm').click(forms.formClick);
	})
	
	function main() {
		$('#recordsWrapper').animate({left: '485px'});
		$('#accountsWrapper').animate({left: '0px'});
	}

	function loadUser(res) {
		return api.loadType('user');
	}

	function setUserAccounts(res) {
		User = res; 
		User.userAccounts = api.byId[User.links.userAccounts];
		User.userAccounts.items.map(cards);
	}
	
	main.resources = resources;
	main.cards = cards;
	main.forms = forms;
	main.records = records;
	
	main.errHandler = function errHandler(err) {
		console.log(err)
	}
	
	return main
}