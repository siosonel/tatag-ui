function teamMain(conf) {
	var User, resources={}, refresh=0;
	
	var api = apiClass({
		'userid': conf.userid, 
		'pass': conf.pass,
		'baseURL': conf.baseURL //will be used as prefix
	});
	
	$(document).ready(function () {			
		main.brands = teamBrands(api);
		main.about = teamAbout(api);
		main.members = teamMembers(api);
		main.accounts = teamAccounts(api);
		main.records = teamRecords(api);
		main.throttles = teamThrottles(api);
		main.forms = adminForms(api);
		main.me = me();
		
		init();
			
		$('#brandsWrapper').click(main.brands.clickHandler);
		$('#aboutWrapper').click(main.about.clickHandler);
		$('#membersWrapper').click(main.members.clickHandler);
		$('#accountsWrapper').click(main.accounts.clickHandler);
		$('#recordsWrapper').click(main.records.clickHandler);
		$('#throttlesWrapper').click(main.throttles.clickHandler);
		$('.formModal').click(main.forms.clickHandler);
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
		main.me(User.user_id, User.name, User.login_provider);
		main.brands(User.links.team);
	}
	
	main.refs = {types: types}
	main.params = {}	
	main.api = api;
	main.resources = resources;
	
	main.refresh = function (num) { //argument=number of views to refresh
		if (num) refresh=num;
		else refresh = refresh-1;
		
		if (refresh<0) refresh=-1;
		return refresh+1;
	}
	
	main.errHandler = function errHandler(err) { console.log(err.message)
		if (err.message=="Unauthorized") main.me.modal();
	}
	
	main.getDivId = function (e, type) {
		var id = e.target.id, pid = e.target.parentNode.id, ppid = e.target.parentNode.parentNode.id;
		var idArr = [id, pid, ppid];
		var typeArr = [id.split('-')[0], pid.split('-')[0], ppid.split('-')[0]];
		
		if (typeArr.indexOf(type)!=-1) return idArr[typeArr.indexOf(type)];
	}
	
	main.getCls = function (e) {
		var cls = e.target.className.split(' '), 
			pCls = e.target.parentNode.className.split(' '), 
			ppCls = e.target.parentNode.parentNode.className.split(' ');
		
		return cls.concat(pCls).concat(ppCls) 
	}
	
	return main;
}