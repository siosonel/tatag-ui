function adminPromos(api) {
	var currBrand, currResource, currCollection;
	
	function main(brand) {
		if (brand) currBrand = brand;
		if (!currBrand || app.currView != 'promos') return;
		app.currView = 'promos';
		
		var url = currBrand.promos;
		$('#promosWrapper').children().remove();
		$('#promosWrapper').append(setTitle(currBrand))
		
		$('#brandsWrapper').animate({left: '-100%'});
		$('#promosWrapper').animate({left: '0'});

		//refresh info as needed using second argument to loadId
		api.loadId(url).then(renderPromos, app.errHandler);
		api.loadConcept('my-holdings');
	}
	
	function setTitle() {
		$('#promosWrapper').append(
			"<div class='row subLabel'>"
			+	"<div class='columns small-8'>"
			+  	"<span style='vertical-align:top; font-weight: 700;'>&#9668; "+currBrand.name+" promos, </span>"
			+  	"<span style='font-weight:normal;'>&nbsp; brand#"+ currBrand.id +"</span>"
			+	"</div>"
			+	"<div class='columns small-4'>"
			+	 	"<button id='addPromo' class='right tiny' style='margin:0;'>+New Promo</button>"
			+ "</div>"
			+"</div>"
		);
	}
	
	function renderPromos(promos) {
		currCollection = promos;
		promos.promo.map(renderItem);
		app.adjustHeight();
	}
	
	function renderItem(promo) {
		var relay = promo.relay;
		var date = promo.created.split(' ')[0].split('-');
		var divId = 'promos-'+ promo.id;
		app.resources[divId] = promo;
		app.resources[divId+'-details'] = promo;
		app.resources[divId+'-relay'] = relay;
		
		var pencil = "<span class='fi-pencil small'>&nbsp;</span>";
		
		$('#promosWrapper').append(
			"<div id='"+divId+"' class='row brandItem' style='margin: 5px;'>"
		+			(promo.imageURL ? "<br /><img src='"+ promo.imageURL +"' class='small'/>" : "")
		+ 	"<div id='"+ divId +"-details' class='small-12 columns' style='text-align: left;'>"
		+ 		"<b>Promo #"+promo.id +"</b> "+ pencil +"<br />"
		+			promo.name +"<br />"
		+			promo.description +"<br />"
		+			"Amount: "+ promo.amount.toFixed(2) +'<br />'
		+			"Expires: "+ promo.expires +"<br />"
		+			"Promo Link: <a href='"+ promo.infoURL +"' target='Promo Ad'>"+ promo.infoURL +"</a><br />"
		+			"Pay Link: <a href='"+ promo.payURL +"'>"+ promo.payURL +"</a><br />"
		+			"Created: "+ date[1] +'/'+ date[2] +"/"+ date[0]
		+		"</div>"
		+		"<div id='"+ divId +"-relay' class='small-12 columns promoLimits' style='text-align: left; margin-bottom:10px;'>"
		+			"<b>Usage Limits per Week:</b> "+ (relay.edit ? pencil : "") +"<br />"
		+			"Total: "+ relay.by_all_limit +', By Brand: '+ relay.by_brand_limit +', By User: '+ relay.by_user_limit + "<br />"
		+ 		"A user must wait "+ relay.by_user_wait +" hour(s) before reusing"
		+		"</div>"
			+'</div>'
		)
	}
	
	function setHolderIdOpt(acct) {
		if (acct.account.authcode.search('x')!=-1 && acct.account.sign==-1) $('#promos-holder_id').append(
			"<option value='"+ acct.id +"'>"+ acct.account.name +", brand "+ acct.account.brand.name +", Bal: "+ acct.account.balance +"</option>"
		);
	}
	
	main.clickHandler = function (e) {
		if (e.target.id=='addPromo') { 
			$('#promoID-formDiv').css('display','none');
			$('#promoDetailsDiv, #promoRelayDiv, #promoHolderIdDiv').css('display','block');
			app.api.byType.userAccounts.items.map(setHolderIdOpt);			
			
			app.forms(currCollection, 'promos', currCollection.add);
			return;
		}
		
		if (app.getCls(e).indexOf('subLabel') != -1) {
			app('promosWrapper');
		}
	
		var divId = app.getDivId(e, 'promos');
		if (!divId) return;
		

		var resource = app.resources[divId];
		var type = divId.split('-').pop();
		$('#promos-promo_id').val(resource.id);
		
		if (type=='relay' && resource.edit) {
			$('#promoHolderIdDiv, #promoDetailsDiv').css('display','none');
			$('#promoID-formDiv, #promoRelayDiv').css('display','block');
			app.forms(resource, 'promos', resource.edit);
		}
		else if (type=='details') {
			$('#promoHolderIdDiv, #promoRelayDiv').css('display','none');
			$('#promoID-formDiv, #promoDetailsDiv').css('display','block');
			app.forms(resource, 'promos', resource.edit);
		}
	}
	
	return main;
}