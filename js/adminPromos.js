function adminPromos(api) {
	var currBrand, currResource, currCollection;
	
	function main(brand) {
		if (brand) currBrand = brand; 
		if (!currBrand || app.currView != 'promos') return;
		app.currView = 'promos';
		
		var url = currBrand.links.brandPromos;		
		$('#promosWrapper').children().remove();
		$('#promosWrapper').append(setTitle(currBrand))
		
		$('#brandsWrapper').animate({left: '-100%'});
		$('#promosWrapper').animate({left: '0'});

		//refresh info as needed using second argument to loadId
		api.loadId(url, app.refresh()).then(renderPromos, app.errHandler)
	}
	
	function setTitle() {
		$('#promosWrapper').append(
			"<div class='row subLabel'>"
			+	"<div class='columns small-8'>"
			+  	"<span style='vertical-align:top; font-weight: 700;'>&#9668; "+currBrand.name+" promos, </span>"
			+  	"<span style='font-weight:normal;'>&nbsp; brand#"+ currBrand.brand_id +"</span>"
			+	"</div>"
			+	"<div class='columns small-4'>"
			+	 	"<button id='addPromo' class='right tiny' style='margin:0;'>+New Promo</button>"
			+ "</div>"
			+"</div>"
			+"<div id='brandItemsHeading' class='row acctItem' style='margin: 0 5px;'>"
			+		"<div class='small-2 columns'>Created</div>"
			+ 	"<div class='small-10 columns' style='margin-bottom:10px;'>"
			+ 		"Promo Information"
			+		"</div>"
			+'</div>'
		);
	}
	
	function renderPromos(promos) { 
		currCollection = promos;
		promos.items.map(renderItem);
	}
	
	function renderItem(promo) {
		var date = promo.created.split(' ')[0].split('-');
		var divId = 'promos-'+ promo.promo_id;
		app.resources[divId] = promo;
		
		$('#promosWrapper').append(
			"<div id='"+divId+"' class='row brandItem' style='margin: 5px;'>"
			+			(promo.imageURL ? "<br /><img src='"+ promo.imageURL +"' class='small'/>" : "")
			+		"<div class='small-2 columns'>"+ date[1] +'/'+ date[2] +"<br/>"+ date[0] +"</div>"
			+ 	"<div class='small-10 columns' style='text-align: left; margin-bottom:10px;'>"
			+ 		"Promo #"+promo.promo_id +" <span class='fi-pencil small'>&nbsp;</span><br />"
			+			promo.name +"<br />"
			+			promo.description +"<br />"
			+			"Amount: "+ promo.amount +", qty:"+ promo.qty +"<br />"
			+			"Expires: "+ promo.expires +"<br />"
			+			"Link: "+ promo.infoURL 
			+		"</div>"
			//+ 	"<div id='"+divId+"-toggle' class='acctDivToggle'>&#9660;&#9660;&#9660;</div>"
			+'</div>'
		)
	}
	
	main.clickHandler = function (e) {
		if (e.target.id=='addPromo') { 
			$('#promoID-formDiv').css('display','none')
			app.forms(currCollection, 'promos', '/forms#promo-add');
			return;
		}		
		
		if (app.getCls(e).indexOf('subLabel') != -1) {
			app('promosWrapper');
		}
	
		var divId = app.getDivId(e, 'promos'); console.log(divId)
		if (!divId) return;
		
		$('#promoID-formDiv').css('display','none')
		app.forms(divId, 'promos', '/forms#admin-promo-edit');
	}
	
	return main;
}