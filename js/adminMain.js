function adminMain(conf) {
	var User, resources={}, refresh=0;
	var autocomplete;
	var subDivHeight={};
	
	var api = apiClass({
		'userid': conf.userid, 
		'pass': conf.pass,
		'baseURL': conf.baseURL
	});
	
	$(document).ready(function () {		
		main.brands = adminBrands(api);
		main.about = adminAbout(api);
		main.members = adminMembers(api);
		main.memberAccounts = adminMemberAccounts(api);
		main.accounts = adminAccounts(api);
		main.promos = adminPromos(api);
		main.throttles = adminThrottles(api);
		main.accountHolders = adminAccountHolders(api);
		main.records = adminRecords(api);
		main.forms = adminForms(api);
		main.me = me();
		
		init();
			
		$('#brandsWrapper').click(main.brands.clickHandler);
		$('#aboutWrapper').click(main.about.clickHandler);
		$('#membersWrapper').click(main.members.clickHandler);
		$('#memberAccountsWrapper').click(main.memberAccounts.clickHandler);
		$('#accountsWrapper').click(main.accounts.clickHandler);
		$('#promosWrapper').click(main.promos.clickHandler);
		$('#throttlesWrapper').click(main.throttles.clickHandler);
		$('#accountHoldersWrapper').click(main.accountHolders.clickHandler);
		$('#recordsWrapper').click(main.records.clickHandler);
		$('.formModal').click(main.forms.clickHandler);
		
		main.forms.setTypeOpts();
		$('#about-type_system').change(main.forms.setTypeOpts);
		
		main.forms.setLocOpts();		
		$('#about-country_code').val('USA').change(main.forms.setAreaCodes);
		main.forms.setAreaCodes();
	});
	
	function init() {
		api.init('/')
			.then(loadUser)
			.then(setUser, main.errHandler);
	}
	
	function main(otherWrapper) {
		main.currView = 'brands';
		main.adjustHeight();
		$('#brandsWrapper').animate({left: '0'});
		$('#'+otherWrapper).animate({left: '100%'});
	}
	
	function loadUser(res) {
		return api.loadType('user', main.refresh());
	}
	
	function setUser(res) {
		main.currView = 'brands';
		User = res;
		main.User = User;
		main.me(User.user_id, User.name, User.login_provider);
		main.brands(User.brand);
	}
	
	main.refs = {types: types}
	main.params = {}
	main.api = api;
	main.init = init;
	main.resources = resources;
	
	main.refresh = function (num) { //argument=number of views to refresh
		if (num) refresh=num;
		else refresh = refresh-1;
		
		if (refresh<0) refresh=-1;
		return refresh+1;
	}
	
	main.errHandler = function errHandler(err) {
		if (err.message.search("Unauthorized")===0) main.me.modal();
		else alert(err.message);
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
	
	main.adjustHeight = function (expandHeight) { 
		var view = app.currView;
		if (!arguments.length || !expandHeight) { 
			subDivHeight[view] = $('#'+view+'Wrapper').height(); 
			var h = 20;  
		}
		else h = 1*expandHeight.replace('px','') + 20;  //console.log([view, subDivHeight[view], h]);
	
		$('#mainWrapper').css('min-height', (subDivHeight[view]+h)+'px');
	}
	
	return main;
}