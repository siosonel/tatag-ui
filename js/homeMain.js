function homeMain(conf) {
	var User, resources={}, refresh=0, params;
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
		params = main.getQueryParams();
		history.replaceState({}, "home", "/ui/home");
		
		main.ratings = homeRatings(api);
		main.promos = homePromos(api);
		main.forms = adminForms(api);
		main.me = me();
		
		init();
		
		$('#ratingPromptDiv, #promoPromptDiv').click(main.clickHandler);
		$('#ratingsWrapper').click(main.ratings.clickHandler);
		$('#promosWrapper').click(main.promos.clickHandler);
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
		
		if (params.promo_id) {
			console.log('Filter out this already used promo based on relay usage restrictions?');
			alert("Thank you for supporting promo #"+ params.promo_id +".\n\nIf this promo is for a purchased item, your order will be processed soon.");
		}
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
		var divId = e.target.id.toLowerCase();
		
		if (divId.search('rating')!=-1) {
			app.currView = 'ratings';
			app.ratings(User);
			if (e.target.id=='addRatingLink') {
				app.ratings.postRenderFxn = clickAddRatingBtn
			}
		}
		else if (divId.search('promo')!=-1) {
			app.currView = 'promos';
			app.promos(User);
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
	
	main.getQueryParams = function () {
		var result = {}
	
		location.search.substr(1).split("&").forEach(function(part) {
			if(!part) return;
			var item = part.split("=");
			var key = item[0];
			var from = key.indexOf("[");
			if(from==-1) result[key] = decodeURIComponent(item[1]);
			else {
				var to = key.indexOf("]");
				var index = key.substring(from+1,to);
				key = key.substring(0,from);
				if(!result[key]) result[key] = [];
				if(!index) result[key].push(item[1]);
				else result[key][index] = item[1];
			}
		});
		
		return result;
	}
	
	main.completer = completer;
	
	return main;
}