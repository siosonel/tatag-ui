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
			"<div id='"+divId+"' class='row brandItem' style='margin: 5px;'>"
			+ 	"<div class='small-12 columns' style='text-align: left; margin-bottom:10px;'>"
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
	
	main.clickHandler = function (e) {
		if (e.target.id=='addPromo') { 
			app.completer.reset();
			$('#promos-brand_id').prop('disabled',false).val('');
			app.forms(currCollection, 'promos', '/forms#promo-add');
			initPlaces();
			return;
		}
		else if (e.target.id.substr(0,4)=='pay-') { 
			var promo = app.resources[e.target.parentNode.parentNode.id]; console.log(promo);
			var postPayURL = encodeURIComponent(homeURL + "?{record_id}&{promo_id}"); console.log(postPayURL);
			window.location.href = walletURL + "?to=promo-"+ promo.promo_id +"&amount="+ promo.amount + "&postPayURL=" + postPayURL;
			
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