function walletCards(api) {	
	var currURL, currAccounts, currAcctDivId;
	var openHeight='300px';
	
	function main(userAccountsURL) {
		if (userAccountsURL) currURL = userAccountsURL;		
		$('#accountsWrapper').children().remove();
		
		api.loadId(currURL, app.refresh())
			.then(renderCards, main.errHandler);		
	}
	
	function renderCards(userAccounts) {
		if (!userAccounts.items.length) 
			$("#accountsWrapper").append("<div>You do not have any accounts in your wallet.</div>");
		else {
			currAccounts = userAccounts;
			currAccounts.items.map(renderAcctDiv); 
			if (app.currView=='records') app.records(app.resources[currAcctDivId]);
			$('#'+currAcctDivId).css('height', openHeight);
			$('#'+currAcctDivId+'-forms').css('display', 'block');
		}
	}
	
	function renderAcctDiv(acct) {
		var acctDivId = "acct-"+ acct.account_id,
			alias = acct.alias ? acct.alias : acct.account_name,
			acctname = alias==acct.account_name ? "" : acct.account_name;
		
		app.resources[acctDivId] = acct;
		if (!acct.relay) acct.relay = {};
		if (!acct.links) acct.links = {};
		
		var b = main.brandColors(acctDivId, acct);		
		
		$('#accountsWrapper').append("<div class='small-12 acctItem' id='"+acctDivId+"' style='background-color: "+ b.divBg +"'>"
		+ "<div class='row' id='"+ acctDivId +"-label' style='margin-bottom:30px;'>"
		+ 	"<div class='small-8 columns acctLabel'>"
		+			b.logo
		+ 		"<span style='vertical-align:top'>&nbsp;"+alias+"&nbsp;</span>"
		+			"<span id='"+acctDivId+"-edit' class='fi-pencil small' style='display:none'></span><br />"
		+     "<span id='"+ acctDivId +"-name' style='font-weight:normal; display: none;'>&nbsp;#"+acct.account_id +' '+acctname+"</span>"
		+		"</div>"
		+ 	"<div class='small-4 columns acctBal' id='"+acctDivId+"-bal'>"
		+ 		(acct.sign*acct.balance).toFixed(2) +" &#9658;"
		+		"</div>"
		+ "</div>"
		+ "<div class='row acctFormDiv' id='"+ acctDivId +"-forms'>"
		+ 	"<div class='small-8 columns'>"
		//+			"<span>Relay:</span><br />"
		//+ 		"<h1>"+ acct.holder_id +"-"+ acct.limkey +"</h1><br />"
		//+			"<a href=''>Review</a> | <a href=''>Edit</a><br />"
		+			"<div id='"+ acctDivId +"-viz' class='left detailsDiv'>"
		+				"Brand <b>"+ acct.brand_name +"</b><br />"
		+				"Brand #"+ acct.brand_id  +", Unit: "+ acct.unit
		+			"</div>"
		+			(acct.throttle_id ? "<span>(This account is throttled, #"+acct.throttle_id+")</span>" : "")
		+		"</div>"
		+ 	"<div class='small-4 columns'>"
		+ 		((acct.relay['budget-add'] || acct.links['budget-add']) 
			? "<button class='tiny' id='"+acctDivId+"-add' style='width:5.0rem; margin-bottom:0.5rem;'>Add</button><br />" : "")
		+ 		((acct.relay['budget-transfer'] || acct.links['budget-transfer']) 
			? "<button id='"+acctDivId+"-transfer' class='tiny' style='width:5.0rem; margin-bottom:0.5rem;'>Transfer</button><br />" : "")
		+			((acct.relay['budget-use'] || acct.links['budget-use']) 
			? "<button id='"+acctDivId+"-use' class='tiny' style='width:5.0rem; margin-bottom:0.5rem;'>Use</button><br />" : "")
		+		"</div>" 	
		+ "</div>"
		+ "<div id='"+acctDivId+"-toggle' class='acctDivToggle'>&#9660;&#9660;&#9660;</div>"
		+ "</div>");
	}
	
	main.brandColors = (function () {
		//colorbrewer RdYlBu[11]
		var colors = [
			"rgb(165,0,38)","rgb(215,48,39)","rgb(244,109,67)","rgb(253,174,97)",
			"rgb(254,224,144)","rgb(255,255,191)","rgb(224,243,248)","rgb(171,217,233)",
			"rgb(116,173,209)","rgb(69,117,180)","rgb(49,54,149)"
		];
		
		var colorIndex = {};
		
		function main(divId, obj) {
			if (!colorIndex[divId]) {
				var i = obj.brand_id % 11; 
				colorIndex[divId] = {
					logoBg: colors[i],
					divBg: colors[11-i].replace("rgb", "rgba").replace(")", ",0.4)"),
					logo: obj.brand_logo
						? "<img id='"+ divId +"-img' class='left logoDiv' src='"+ obj.brand_logo +"'/>"
						: "<div id='"+ divId +"-img' class='left logoDiv' style='background-color: "+ colors[i] +"'>"+ obj.brand_name.substr(0,1).toUpperCase() +"</div>"
				}
			}
			
			return colorIndex[divId];
		}
		
		return main;
	})();
	
	main.toggleAcctItem = function toggleAcctItem(e) {
		if (e.target.id.slice(-5)=='-edit') {app.edit(e.target.id.slice(0,-5)); return;}
		
		// change target to toggle-handle as needed
		if (e.target.parentNode.className.search('acctLabel')!=-1) e.target = e.target.parentNode.parentNode.parentNode.lastChild; 
		else if (e.target.className.search('acctLabel')!=-1) e.target = e.target.parentNode.parentNode.lastChild; 
		
		if (e.target.id && e.target.id.slice(-3)=='bal') {
			currAcctDivId = e.target.id.slice(0,-4);
			app.currView = 'records';
			app.records(app.resources[currAcctDivId]); 
			return;
		}
		
		if (e.target.tagName.toUpperCase()=='BUTTON') {app.txn(e.target.id); return;}
		if (e.target.tagName.toUpperCase()=='A') return false;
		if (e.target.className.search('acctDivToggle') == -1) return; 
		
		var acctDivId = e.target.parentNode.id;
		
		if (currAcctDivId) {
			var b = main.brandColors(currAcctDivId);
			
			$('#'+currAcctDivId).animate({height: '50px'});
			$('#'+currAcctDivId).css('background-color', b.divBg);
			$('#'+currAcctDivId+'-forms').css('display', 'none');
			$('#'+currAcctDivId+'-label').css('font-weight', 'normal');
			$('#'+currAcctDivId+'-img').animate({height:'25px', width:'25px', 'font-size':'25px', 'line-height':'25px'});
			$('#'+currAcctDivId+'-name').css('display', 'none');
			$('#'+currAcctDivId+'-edit').css('display', 'none');
			$('#'+currAcctDivId+'-toggle').html("&#9660;&#9660;&#9660;")
				.css({'background-color': 'rgb(245,245,245)', 'color': 'rgb(190,190,190)'});
		}
		
		if (currAcctDivId==acctDivId) {currAcctDivId = '';}
		else {
			currAcctDivId =  acctDivId;
			$('#'+currAcctDivId).animate({height: openHeight});	
			$('#'+currAcctDivId).css('background-color', '');
			$('#'+currAcctDivId+'-forms').css('display', 'block');
			$('#'+currAcctDivId+'-label').css('font-weight', '700');
			$('#'+currAcctDivId+'-img').animate({height:'50px', width:'50px', 'font-size':'45px', 'line-height':'45px'});
			$('#'+currAcctDivId+'-name').css('display','inline');
			$('#'+currAcctDivId+'-edit').css('display', 'inline');
			$('#'+currAcctDivId+'-toggle').html("&#9650;&#9650;&#9650;")
				.css({'background-color': '#007095', 'color': '#fff'});
		}
	}
	
	
	return main;
}