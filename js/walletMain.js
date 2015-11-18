function walletMain(conf) {
	var User, resources={}, refresh=0, params;
	var $currDiv, viewDataLink={};	
	var subDivHeight = {};
	
	var api = apiClass({
		'userid': conf.userid, 
		'pass': conf.pass,
		'baseURL': conf.baseURL
	});
	
	$(document).ready(function () {
		params = main.getQueryParams();
		
		app.currView = location.pathname.search('-')==-1 || location.pathname.substr(0,5)=='/for/'
			? 'budgets' : location.pathname.split('-').pop();
		
		history.replaceState({}, "wallet", "/ui/wallet-"+ app.currView);
		
		main.budgets = walletBudgets(api);		
		main.records = walletRecords(api);		
		main.txn = walletTxn(api);		
		main.edit = walletEdit(api);
		main.relays = walletRelays(api);
		main.orders = walletOrders(api);
		main.itemized = walletItemized(api);
		main.me = me();
		
		api.init('/api')
			.then(loadUser)
			.then(setUser, main.errHandler);
			
		$('#viewTypeDiv').click(main.clickHandler);
		$('#accountsWrapper').click(main.budgets.toggleAcctItem);
		$('#recordsWrapper').click(main.records.toggleRecordItem);
		$('#relaysWrapper').click(main.relays.toggleRelayItem);
		$('#scrollTo').click(main.records.scrollMore);
		$('#txnForm').click(main.txn.formClick);
		$('#relayInfo').click(main.txn.postRelayRefresh);
		$('#editBudget, #editRelay, #editRecord').click(main.edit.formClick);
		$('#expenseAcctToUse').change(function () {
			params.expenseAcctToUse = $('#expenseAcctToUse').val();
			$('#txn-from').val(params.expenseAcctToUse);
		});
		
		$('#txn-to').change(main.txn.matchPromo)
	});
	
	function main(wrapperId) {
		$('#accountsWrapper').animate({left: '0'});
		$(wrapperId ? '#'+wrapperId : '#recordsWrapper').animate({left: '105%'});
	}

	function loadUser(res) {
		return api.loadId(res.me);
	}

	function setUser(res) {
		User = res;
		main.me(User.user_id, User.name, User.login_provider);
		
		viewDataLink = {
			budgets: User.holdings,
			orders: User.orders,
			itemized: User.itemized
		};
				
		$currDiv = $('#'+ app.currView+"Wrapper");
		$('#'+ app.currView +'ViewPrompt').trigger('click');
	}
	
	main.api = api;
	main.resources = resources;
	main.currView = 'budgets';
	
	main.params = function () {return params}
	
	main.refresh = function (num) { //argument=number of views to refresh
		if (num) refresh=num;
		else refresh = refresh-1;
		
		if (refresh<0) return 0;		
		return refresh+1;
	}
	
	main.errHandler = function errHandler(err) {
		if (err.message.search("Unauthorized")===0) main.me.modal();
		else console.log(err.message);
	}
	
	main.getQueryParams = function () {
		var result = {};
	
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
		
		//this is when browser detects for=... in query params
		if (result['for'] && !result.to) result.to=result['for'];
		
		//this if when url uses domain/for/keyword-999 format
		var p = location.pathname.split("/");
		if ((p[1]=='for' || p[1]=='pay') && p.length==3 && !result.to && !isNaN(p[2].split('-')[1])) result.to=p[2];
		
		return result;
	}
	
	main.clickHandler = function (e) {
		var elemId = e.target.id.toLowerCase();
		var view = elemId.search('budgets') != -1 ? 'budgets'
			: elemId.search('orders') != -1 ?  'orders'
			: elemId.search('itemized') != -1 ?  'itemized'
			: '';
		
		if (view) {
			var btn = app.currView=='relays' || app.currView=='records' ? 'budgetsViewPrompt' : app.currView+'ViewPrompt';
			
			$('#'+btn).css('color','#fff');
			
			app.currView = view;
			$('#'+view+'ViewPrompt').css('color','#ff0');
			
			$currDiv.css('display','none');
			
			var wrapperDiv = view!='budgets' ? '#'+view+'Wrapper' : '#accountsWrapper,#recordsWrapper,#relaysWrapper';
			$currDiv = $(wrapperDiv).css('display','block');
			
			main[view](viewDataLink[view]);		
			history.replaceState({}, "wallet", "/ui/wallet-"+ app.currView);
		}
	}
	
	main.adjustHeight = function (expandHeight) { 
		var view = app.currView=='budgets' ? 'accounts' : app.currView;
		if (!arguments.length || !expandHeight) { 
			subDivHeight[view] = $('#'+view+'Wrapper').height(); 
			var h = 20;  
		}
		else h = 1*expandHeight.replace('px','') + 20; //console.log([view, subDivHeight[view], h]);
	
		$('#mainWrapper').css('min-height', (subDivHeight[view]+h)+'px');
	}
	
	return main
}