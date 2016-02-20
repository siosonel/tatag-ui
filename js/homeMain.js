function homeMain(conf) {
	var User, resources={}, refresh=0, params;
	var clickedBrand = {};
	var subDivHeight = {};
	var hashVals = ["latest","popular","search"];
	
	var api = phlatSimple({
		'userid': conf.userid, 
		'pass': conf.pass,
		'baseURL': conf.baseURL
	});
	
	$(document).ready(function () {
		$(document).foundation();

		main.hash = location.hash.substr(1);
		params = main.getQueryParams();
		app.currView = location.pathname.search('-')!=-1 ? location.pathname.split('-').pop()
			: conf.userid && conf.userid!="0" ? 'promos'
			: 'about';
		
		history.replaceState({}, "home", "/ui/home-"+ app.currView + location.hash);
		
		if (typeof homeRatings == 'function') main.ratings = homeRatings(api);
		if (typeof homeViz == 'function') main.viz = homeViz(api);
		if (typeof homePromos == 'function') main.promos = homePromos(api);
		
		if (typeof homeAbout == 'function') {
			main.about = homeAbout(api);
			vizFunding.init(0);
		}

		if (typeof adminForms == 'function') main.forms = adminForms(api);

		main.me = me();		
		init();
				
		$('#viewTypeDiv').click(main.clickHandler);
		
		if (main.forms) {
			$('.formModal, #searchDiv').click(main.forms.clickHandler);
			$('#searchDiv').keyup(main.promos.keyHandler);
		}
		
		if (main.promos) $('#promosWrapper').click(main.promos.clickHandler);
		
		if (main.ratings) {
			main.completer = autoComplete({
				selector: '#ratings-reason',
				source: autocompleteSource,
				minLength: 2
			});

			$('#ratingsWrapper').click(main.ratings.clickHandler);
			$('#ratings-rating').val(90);
			$('#ratings-reason').on('input', main.completer);
		}

		$('a', '#promoBar').click(hashHandler);
	});
	
	function init() {
		api.init('/api/')
			.then(loadUser)
			.then(setUser, main.errHandler);
	}
	
	function main(otherWrapper) {
		//$('#homeWrapper').animate({left: '5px'});
		//$('#'+otherWrapper).animate({left: '100%'});
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
			//alert("Thank you for supporting promo #"+ params.promo_id +".\n\nIf this promo is for a purchased item, your order will be processed soon.");
			app.currView = 'promos';
		}
		
		$('#'+app.currView+"ViewPrompt").css('color','#ff0');
		$currDiv = $('#'+ app.currView+"Wrapper").css('display','block');
		main[app.currView](User);
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

	function hashHandler(e) {
		main.hash = e && e.target && e.target.id ? e.target.id.split('-')[1] : location.hash.substr(1);
		if (hashVals.indexOf(main.hash)==-1) return;

		$("a", "#promoBar").css("text-decoration","none");
		main[app.currView](User);
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
		if (err.message.search("Unauthorized")===0) main.me.modal();
		else alert(err.message);
	}
	
	main.clickHandler = function (e) {
		var elemId = e.target.id.toLowerCase();
		var view = elemId.search('rating') != -1 ? 'ratings'
			: elemId.search('promo') != -1 ?  'promos'
			: elemId.search('viz') != -1 ?  'viz'
			: elemId.search('about') != -1 ?  'about'
			: ''; console.log([app.currView, view])
		
		if (view && app.currView != view) {
			location.href = location.origin + '/ui/home-'+ view;
			/*$('#'+app.currView+'ViewPrompt').css('color','#fff');
			app.currView = view;
			$('#'+view+'ViewPrompt').css('color','#ff0');
			
			$currDiv.css('display','none');
			$currDiv = $('#'+view+'Wrapper').css('display','block');
			app[view](User);		
			history.replaceState({}, "home", "/ui/home-"+ app.currView);*/			
		}
	}
	
	main.getDivId = function (e, type) {
		var id = e.target.id, pid = e.target.parentNode.id, ppid = e.target.parentNode.parentNode.id;
		var idArr = [id, pid, ppid];
		var typeArr = [id.split('-')[0], pid.split('-')[0], ppid.split('-')[0]];
		
		if (typeArr.indexOf(type)!=-1) return idArr[typeArr.indexOf(type)];
	}
	
	main.getCls = function (e) {	
		var cls = e.target.className ? e.target.className.split(' ') : '', 
			pCls = e.target.parentNode.className ? e.target.parentNode.className.split(' ') : "", 
			ppCls = e.target.parentNode.parentNode.className ? e.target.parentNode.parentNode.className.split(' ') : "";
		
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
	
	main.adjustHeight = function (expandHeight) { 
		var view = app.currView;
		if (!arguments.length || !expandHeight) { 
			subDivHeight[view] = $('#'+view+'Wrapper').height(); 
			var h = 20;  
		}
		else h = 1*expandHeight.replace('px','') + 20;  //console.log([view, subDivHeight[view], h]);
	
		$('#mainWrapper').css('min-height', (subDivHeight[view]+h)+'px');
	}
	
	main.currView = 'about';
	
	main.isLoggedOn = function () {
		return conf.userid != 0;
	}
	
	return main;
}