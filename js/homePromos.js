function homePromos(api) {
	var currUser, currResource, currCollection;
	var postRenderFxn;
	var homeURL = api.baseURL.replace('api','ui\/home');
	var walletURL = api.baseURL.replace('api','ui\/wallet');
	var scrollTo;
	
	function main(user) {
		if (user) currUser = user; 
		if (!currUser || app.currView != 'promos') return;
		app.currView = 'promos';
		
		var url = currUser.promos;
		
		if (app.hash=='search') actOnHash("search", "block");
		else if (app.hash=='popular') actOnHash("popular", "none", "promos-popular");
		else actOnHash("latest", "none", "promos");

		$('#scrollTo').off('click').on('click', main.scrollMore);
	}
	
	function actOnHash(hash, formDisplay, concept) {
		$('#promos-'+hash).css('text-decoration', 'underline');
		
		if (concept) {
			api.loadConcept("public-"+concept).then(renderPromos, app.errHandler);
		}

		if (hash=='search') {
			var promos;
			api.loadConcept('public-promos').then(function (res) {
				promos = res;
				return api.loadId(res.search)
			}).then(function (form) {
				form.callBack = renderPromos;
				app.forms(promos, 'search', form);
			}, app.errHandler);
		}
	}
	
	function renderPromos(promos) {
		$('#promosWrapper').children().remove();
		if (!promos || !promos.promo.length) {
			$('#promosWrapper').html(
				app.hash=="search" ? "<br/><br/><h5>No matching promo results found. Please revise your search keyword, brand, and/or price.</h5>"
				: app.hash=="popular" ? "<br/><br/><h5>No active popular promo collection items found.</h5>"
				: "<br/><br/><h5>There are no active promos. <a href='/ui/my-teams#promos'>Add or reactivate a promo</a> to get things started</a>.</h5>"
			);
		}
		else {
			currCollection = promos;
			promos.promo.sort(sortByIdDesc).map(renderItem);
			paginate(promos);

			if (main.postRenderFxn) {
				main.postRenderFxn();
				main.postRenderFxn = null;
			}
		}
		
		app.adjustHeight();
	}

	function sortByIdDesc(a,b) {
		return isNaN(b.id) ? 0 : b.id - a.id;
	}
	
	function renderItem(promo) {
		var date = promo.created.split(' ')[0].split('-');
		var divId = 'promos-'+ promo.promo_id;
		app.resources[divId] = promo;
		
		var pencil = !promo.edit ? "" : " <span class='fi-pencil small'>&nbsp;</span>";
		
		/*if (promo.imageTemplate) {
			var template = api.byId[promo.imageTemplate];
			var	image = template.data, d=template.delimiter, s=template.substitute;
			
			for(var i=0; i<s.length; i++) {
				image = image.replace(d[0]+s[i]+d[1], promo[s[i]]);
			}
		}
		else if (promo.imageURL) var image ="<img src='"+image+"'>"; 
		else*/ var image="";
		
		var dots = promo.description.length>50 ? '...' : ''; 
		 
		if (!$('#'+divId).length) $('#promosWrapper').append(
			"<div id='"+divId+"' class='small-12 medium-6 large-4 columns' style='padding: 0.2rem; float: left;'></div>"
		);

		$('#'+divId).html(
			"<div class='promoItem'>"
			+			image
			+ 		pencil +"<span class='promoTitle'><b>"+ promo.name.substr(0,100) +"</b></span><br />"
			+ 		"<span class='tiny promoTitle'>By: <a href='/"+ promo.brand.id +"'>"+ promo.brand.name +"</a></span><br />"
			+			"<button id='pay-"+ promo.promo_id +"' class='tiny' style='margin-bottom: 0.25rem;'>"+ promo.amount.toFixed(2) +" XTE</button><br />"
			+			"<span class='morePrompt'>"+ promo.description.substr(0, 69) + dots //+ "<br />(more)</span>"
			// +			(promo.infoURL ? "<a href='"+promo.imageURL+"'>More info</a><br />" : "")
			// +			(promo.expires ? "Expires: "+ promo.expires +'<br />' : "")
			// + date[1] +'/'+ date[2] +"<br/>"+ date[0]
			+			'<br />Pay: https://tatag.cc/for/' + promo.code +'<br />(more)</span>'
			// +		"<span class='sharePrompt'>Share</span>"
			+	"</div>"
		)
	}


	
	function paginate(promos) {
		scrollTo="";
		if (promos.pageOrder=='desc' && promos.prev) scrollTo = promos.prev;
		if (promos.pageOrder=='asc' && promos.next) scrollTo = promos.next;
		$('#scrollTo').css('display', scrollTo ? 'block' : 'none');		
	}
	
	main.scrollMore = function (e) {
		api.loadId(scrollTo).then(renderPromos, app.errHandler)
	}
	
	function setHolderIdOpt(acct) {
		if (acct.account.authcode.search('x')!=-1 && acct.account.sign==-1) $('#promos-holder_id').append(
			"<option value='"+ acct.id +"'>"+ acct.account.name +", brand "+ acct.account.brand.name +", Bal: "+ acct.account.balance.toFixed(2) +"</option>"
		);
	}
	
	main.clickHandler = function (e) { console.log(e)
		if (e.target.id=='search-submit') { console.log(app.api.byConcept['public-promos']);
			app.api.forms(app.api.byConcept['public-promos'], 'search', app.api.byConcept['public-promos'].search);
		}
		else if (e.target.id=='addPromo') { 
			if (!app.isLoggedOn()) { 
				window.open(location.origin + location.pathname + '?login=1'); 
				return;
			}

			$('#promoID-formDiv').css('display','none');
			$('#promoDetailsDiv, #promoRelayDiv, #promoHolderIdDiv').css('display','block');
			
			app.api.loadConcept('my-holding').then(function (res) {
				res.map(function (r) {
					if (typeof r=='string') api.loadId(r).then(setHolderIdOpt, app.errHandler)
					else setHolderIdOpt(r);
				})
			}, app.errHandler);			
			
			app.api.loadConcept('team-promos').then(function (teamPromos) {
				app.forms(currCollection, 'promos', teamPromos.add);
			}, app.errHandler);
			
			return;
		}
		else if (e.target.id && e.target.id.substr(0,4)=='pay-') { 
			var promo = app.resources[e.target.parentNode.parentNode.id]; //console.log(promo);
			var postPayURL = encodeURIComponent(homeURL + "/home-promos?{record_id}&{promo_id}"); //console.log(postPayURL);
			var sep = promo.payURL.search(/\?/)==-1 ? '?' : '&';
			window.open(promo.payURL + sep + "postPayURL=" + postPayURL);
			
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
		
		$('#promos-brand_id').prop('disabled',true).val(promo.brand.name);
		app.forms(divId, 'promos', promo.edit);
	}

	main.searchSubmit = function (e) {
	}
	
	return main;
}