function homePromos(api) {
	var currUser, currResource, currCollection;
	var postRenderFxn;
	var homeURL = api.baseURL.replace('api','ui\/home');
	var walletURL = api.baseURL.replace('api','ui\/wallet');
	
	function main(user) {
		if (user) currUser = user; 
		if (!currUser || app.currView != 'promos') return;
		app.currView = 'promos';
		
		var url = currUser.promoCollection;
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
		
		app.adjustHeight();
	}
	
	function renderItem(promo) {
		var date = promo.created.split(' ')[0].split('-');
		var divId = 'promos-'+ promo.promo_id;
		app.resources[divId] = promo;
		
		var pencil = !promo['promo-edit'] ? ""
			: " <span class='fi-pencil small'>&nbsp;</span>";
		
		if (promo.imageTemplate) {
			var template = api.byId[promo.imageTemplate];
			var	image = template.data, d=template.delimiter, s=template.substitute;
			
			for(var i=0; i<s.length; i++) {
				image = image.replace(d[0]+s[i]+d[1], promo[s[i]]);
			}
		}
		else if (promo.imageURL) var image ="<img src='"+image+"'>"; 
		else var image="";
		
		var dots = promo.description.length>50 ? '...' : ''; 
		
		$('#promosWrapper').append(
			"<div id='"+divId+"' class='small-12 medium-6 large-4 columns' style='padding: 0.2rem; float: left;'>"
			+ 	"<div class='promoItem'>"
			+			image
			+ 		pencil +"<span class='promoTitle'><b>"+ promo.name.substr(0,100) +"</b></span><br />"
			+ 		"<span class='tiny promoTitle'>By: "+ promo.brand_name +"</span><br />"
			+			"<button id='pay-"+ promo.promo_id +"' class='tiny' style='margin-bottom: 0.25rem;'>"+ promo.amount.toFixed(2) +" XTH</button><br />"
			+			"<span class='morePrompt'>"+ promo.description.substr(0, 49) + dots + "<br />(more)</span>"
			// +			(promo.infoURL ? "<a href='"+promo.imageURL+"'>More info</a><br />" : "")
			// +			(promo.expires ? "Expires: "+ promo.expires +'<br />' : "")
			// + date[1] +'/'+ date[2] +"<br/>"+ date[0]
			//+			'Recipient Token: <b>' + promo.relay['budget-use'] +'</b><br />'
			//+		"<span class='sharePrompt'>Share</span>"
			+		"</div>"
			+'</div>'
		)
	}
	
	function setHolderIdOpt(acct) {
		if (acct.account.authcode.search('x')!=-1 && acct.account.sign==-1) $('#promos-holder_id').append(
			"<option value='"+ acct.holder_id +"'>"+ acct.account.name +", brand "+ acct.account.brand.name +", Bal: "+ acct.account.balance.toFixed(2) +"</option>"
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
		else if (e.target.id && e.target.id.substr(0,4)=='pay-') { 
			var promo = app.resources[e.target.parentNode.parentNode.id]; //console.log(promo);
			var postPayURL = encodeURIComponent(homeURL + "/home-promos?{record_id}&{promo_id}"); //console.log(postPayURL);
			var sep = promo.payLink.search(/\?/)==-1 ? '?' : '&';
			window.open(promo.payLink + sep + "postPayURL=" + postPayURL);
			
			return;
		}
		
		if (app.getCls(e).indexOf('subLabel') != -1) {
			app('promosWrapper');
		}
		else if (e.target.className.search('promoTitle')!=-1 
			|| e.target.parentNode.className.search('promoTitle')!=-1
			|| e.target.className.search('fi-pencil')!=-1
		) {
			var targetCls='edit';
			e.target=e.target.parentNode;
		}
		
		var divId = app.getDivId(e, 'promos');
		if (!divId) return;
		
		var promo = app.resources[divId]; 
		
		if (e.target.className=='morePrompt') {
			//$('#promoIframe').attr('src', promo.promoPage).css({display:'block'});
			window.location.href = promo.promoPage;
			return;
		}
		else if (!promo['promo-edit'] || !targetCls) return; 
		
		$('#promos-brand_id').prop('disabled',true).val(promo.brand_name);
		app.forms(divId, 'promos', '/forms#promo-edit');
	}
	
	return main;
}