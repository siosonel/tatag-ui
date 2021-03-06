function searchMain(conf) {
	var User, resources={}, refresh=0;
	var subDivHeight={};
	
	var api = phlatSimple({
		'userid': conf.userid, 
		'pass': conf.pass,
		'baseURL': conf.baseURL //will be used as prefix
	});
	
	$(document).ready(function () {			
		main.brands = searchBrands(api);
		main.forms = adminForms(api);
		main.me = me();
		
		init();
			
		$('#brandsWrapper').click(main.brands.clickHandler);
		$('.formModal').click(main.forms.clickHandler);
	});
	
	function init() {
		api.init('/api/')
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
		return api.loadType('user');
	}
	
	function setUser(res) {
		main.currView = 'brands';
		User = res;
		main.me(User.user_id, User.name, User.login_provider);
		api.loadConcept('public-brands').then(main.brands, main.errHandler);
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