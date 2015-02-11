function adminMain() {
	var User, resources={}, refresh=0;
	
	var api = apiClass({
		'userid': '21', 
		'pass': 'pass2',
		'baseURL': '/tatag' //will be used as prefix
	});
	
	$(document).ready(function () {
		main.brands = adminBrands(api);
		main.members = adminMembers(api);
		main.accounts = adminAccounts(api);
		main.issued = adminBudgetIssued(api);
		
		api.init('/')
			.then(loadUser)
			.then(setUser, main.errHandler);
			
		$('#brandsWrapper').click(main.brands.clickHandler);
	});
	
	function main() {}
	
	function loadUser(res) {
		return api.loadType('user');
	}
	
	function setUser(res) {
		User = res;
		main.brands(User.links.brand);
	}
	
	main.api = api;
	main.resources = resources;
	
	main.refresh = function (num) { //argument=number of views to refresh
		if (num) refresh=num;
		else refresh = refresh-1;
		return refresh+1;
	}
	
	main.errHandler = function errHandler(err) {
		console.log(err)
	}
	
	return main;
}