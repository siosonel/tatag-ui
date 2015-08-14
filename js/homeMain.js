function homeMain(conf) {
	var User, resources={}, refresh=0;
	var clickedBrand={};
	var completer = autoComplete({
		selector: '#ratings-reason',
		source: autocompleteSource,
		minLength: 2
	});
	
	var api = apiClass({
		'userid': conf.userid, 
		'pass': conf.pass,
		'baseURL': conf.baseURL
	});
	
	$(document).ready(function () {
		history.replaceState({}, "home", "/ui/home");
		
		main.ratings = homeRatings(api);
		main.forms = adminForms(api);
		main.me = me();
		
		init();
		
		$('#ratingPromptDiv').click(main.clickHandler);
		$('#ratingsWrapper').click(main.ratings.clickHandler);
		$('.formModal').click(main.forms.clickHandler);
		
		$('#ratings-rating').val(90);
		$('#ratings-reason').on('input', completer);
	});
	
	function init() {
		api.init('/')
			.then(loadUser)
			.then(setUser, main.errHandler);
	}
	
	function main(otherWrapper) {
		$('#homeWrapper').animate({left: '5px'});
		$('#'+otherWrapper).animate({left: '100%'});
	}
	
	function loadUser(res) {
		return api.loadType('user', main.refresh());
	}
	
	function setUser(res) {
		User = res;
		main.User = User;
		main.me(User.user_id, User.name, User.login_provider);
	}
	
	function openForm() {
		var elemId = main.ratings.findRenderedItem(clickedBrand.brand_id);
		if (elemId) $('#'+elemId).click();
		else {
			$('#addRating').click();
			$('#ratings-brand_id').val(clickedBrand.name);
		}
	}
	
	 function clickAddRatingBtn() {
		$('#addRating').click();
	}
	
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
		if (err.message=="Unauthorized") main.me.modal();
	}
	
	main.clickHandler = function (e) {
		app.currView = "ratings";
		app.ratings(User);
		
		if (e.target.id=='addRatingLink') {
			app.ratings.postRenderFxn = clickAddRatingBtn
		}
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
	
	main.openRatingsForm = function (d) {
		if (d) {
			clickedBrand = d;
			$('#ratingsDivPrompt').click();
			main.ratings.postRenderFxn = openForm;
		}
	}
	
	main.completer = completer;
	
	return main;
}