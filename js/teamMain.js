function teamMain(conf) {
	var User, resources={}, refresh=0;
	
	var api = apiClass({
		'userid': conf.userid, 
		'pass': conf.pass,
		'baseURL': '/tatag' //will be used as prefix
	});
	
	$(document).ready(function () {		
		history.replaceState({}, "team", "/ui/team");
	
		main.brands = teamBrands(api);
		main.about = teamAbout(api);
		main.members = teamMembers(api);
		main.accounts = teamAccounts(api);
		main.records = teamRecords(api);
		
		init();
			
		$('#brandsWrapper').click(main.brands.clickHandler);
		$('#aboutWrapper').click(main.about.clickHandler);
		$('#membersWrapper').click(main.members.clickHandler);
		$('#accountsWrapper').click(main.accounts.clickHandler);
		$('#recordsWrapper').click(main.records.clickHandler);
	});
	
	function init() {
		api.init('/')
			.then(loadUser)
			.then(setUser, main.errHandler);
	}
	
	function main(otherWrapper) {
		$('#brandsWrapper').animate({left: '0'});
		$('#'+otherWrapper).animate({left: '100%'});
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
		
		if (refresh<0) refresh=-1;
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