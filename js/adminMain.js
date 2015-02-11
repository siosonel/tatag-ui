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
		main.forms = adminForms(api);
		
		api.init('/')
			.then(loadUser)
			.then(setUser, main.errHandler);
			
		$('#brandsWrapper').click(main.brands.clickHandler);
		$('#membersWrapper').click(main.members.clickHandler);
		$('#accountsWrapper').click(main.accounts.clickHandler);
		$('#issuedWrapper').click(main.issued.clickHandler);
		$('.formModal').click(main.forms.clickHandler);
	});
	
	function main(otherWrapper) {
		$('#brandsWrapper').animate({left: '0px'});
		$('#'+otherWrapper).animate({left: '485px'});
	}
	
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
	
	main.getDivId = function (e, type) {
		var id = e.target.id, pid = e.target.parentNode.id, ppid = e.target.parentNode.parentNode.id;
		var idArr = [id, pid, ppid];
		var typeArr = [id.split('-')[0], pid.split('-')[0], ppid.split('-')[0]];
		
		if (typeArr.indexOf(type)!=-1) return idArr[typeArr.indexOf(type)];
	}
	
	return main;
}