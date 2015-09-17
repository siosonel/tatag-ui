function homePromos(api) {
	var currUser, currResource, currCollection;
	var postRenderFxn;
	var homeURL = api.baseURL.replace('api','ui\/home');
	var walletURL = api.baseURL.replace('api','ui\/wallet');
	
	function main(user) {
		if (user) currUser = user; 
		if (!currUser || app.currView != 'promos') return;
		app.currView = 'promos';
		
		var url = currUser.links.promoCollection;
		$('#promosWrapper').children().remove();
		$('#promosWrapper').append(setTitle(currUser));

		//refresh info as needed using second argument to loadId
		api.loadId(url, app.refresh()).then(renderRatings, app.errHandler);
	}
	
	function setTitle() {
		$('#promosWrapper').append(
			"<div class='row'>"
			+	"<div class='columns small-8'>"
			+  	"<a href=''>Help</a>"
			+	"</div>"
			+	"<div class='columns small-4'>"
			+	 	"<button id='addPromo' class='right tiny' style='margin:0;'>+New Promo</button>"
			+ "</div>"
			+"</div>"
		);
	}
	
	function renderRatings(promos) { 
		currCollection = promos;
		promos.items.map(renderItem);
		if (main.postRenderFxn) {
			main.postRenderFxn();
			main.postRenderFxn = null;
		}
	}
	
	function renderItem(promo) {
		var date = promo.created.split(' ')[0].split('-');
		var divId = 'promos-'+ promo.promo_id;
		app.resources[divId] = promo;
		
		$('#promosWrapper').append(
			"<div id='"+divId+"' class='small-12 medium-6 large-4 columns' style='padding: 0.2rem; float: left;'>"
			+ 	"<div class='brandItem' style='text-align: left;'>"
			+			(promo.imageURL ? "<img src='"+promo.imageURL+"' class='small'><br />" : "")
			+			"<button id='pay-"+ promo.promo_id +"' class='right tiny'>"+ promo.amount.toFixed(2) +" hour</button>"  
			+ 		"<b>"+promo.name +"</b><br />"
			+			promo.description +"</br >"
			+			(promo.infoURL ? "<a href='"+promo.imageURL+"'>More info</a>" : "")
			+			"Expires: "+ promo.expires 
			//+ date[1] +'/'+ date[2] +"<br/>"+ date[0]
			+		"</div>"
			+'</div>'
		)
	}
	
	function setHolderIdOpt(acct) {
		if (acct.authcode.search('x')!=-1) $('#promos-holder_id').append(
			"<option value='"+ acct.holder_id +"'>"+ acct.account_name +", brand "+ acct.brand_name +", Bal: "+ acct.balance +"</option>"
		);
	}
	
	main.clickHandler = function (e) {
		if (e.target.id=='addPromo') { 
			$('#promoID-formDiv').css('display','none');
			$('#promoDetailsDiv, #promoRelayDiv, #promoHolderIdDiv').css('display','block');
			app.api.byType.userAccounts.items.map(setHolderIdOpt);			
			
			app.forms(currCollection, 'promos', '/forms#promo-add');
			return;
		}
		else if (e.target.id.substr(0,4)=='pay-') { 
			var promo = app.resources[e.target.parentNode.parentNode.id]; //console.log(promo);
			var postPayURL = encodeURIComponent(homeURL + "/home-promos?{record_id}&{promo_id}"); //console.log(postPayURL);
			window.open(promo.links.payLink + "&postPayURL=" + postPayURL);
			
			return;
		}
		
		
		if (app.getCls(e).indexOf('subLabel') != -1) {
			app('promosWrapper');
		}
	
		var divId = app.getDivId(e, 'promos');
		if (!divId) return;
		
		var promo = app.resources[divId];
		
		$('#promos-brand_id').prop('disabled',true).val(promo.brand_name);
		app.forms(divId, 'promos', '/forms#promo-edit');
	}
	
	return main;
}