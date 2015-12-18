function walletBudgets(api) {	
	var currURL, currAccounts, currAcctDivId, acctsToUse=[], params;
	var openHeight='300px';
	
	function main(holdingsURL) {
		params = app.params();
		
		if (!holdingsURL) {console.log(currURL)}
		else if (typeof holdingsURL=='string') currURL = holdingsURL;	
		else if ('@id' in holdingsURL) currURL = holdingsURL['@id'];	
			
		$('#accountsWrapper').children().remove();
		$('#expenseAcctToUse').children().remove();
		
		api.loadId(currURL, app.refresh())
			.then(renderBudgets, main.errHandler);		
	}
	
	function renderBudgets(userAccounts) {
		if (!userAccounts.items.length) {
			$("#accountsWrapper").append("<div>You do not have any accounts in your wallet.</div>");
		}
		else {
			currAccounts = userAccounts; 
			currAccounts.items.map(renderAcctDiv); 
			if (app.currView=='records') app.records(app.resources[currAcctDivId]);
			$('#'+currAcctDivId).css('height', openHeight);
			$('#'+currAcctDivId+'-forms').css('display', 'block');
			app.adjustHeight();
			
			if (params.to) {
				if (!params.expenseAcctToUse) params.expenseAcctToUse = $('#expenseAcctToUse').val();
				$('#expenseAcctToUse').val(params.expenseAcctToUse);
				$('#'+ params.expenseAcctToUse +'-use').trigger('click');
				delete params.to;
			} //else console.log(params);
		}
	}
	
	function renderAcctDiv(acct) {
		if (typeof acct=='string') acct = api.byId[acct];
	
		var acctDivId = "acct-"+ acct.account.account_id,
			alias = acct.alias ? acct.alias : acct.account.name,
			acctname = alias==acct.account.name ? "" : acct.account.name;
		
		app.resources[acctDivId] = acct;
		if (!acct.relay) acct.relay = {};
		
		var b = main.brandColors(acctDivId, acct);
		
		$('#accountsWrapper').append("<div class='small-12 acctItem' id='"+acctDivId+"' style='background-color: "+ b.divBg +"'>"
		+ "<div class='row' id='"+ acctDivId +"-label' style='margin-bottom:30px;'>"
		+ 	"<div class='small-8 columns acctLabel'>"
		+			b.logo
		+ 		"<span style='vertical-align:top'>&nbsp;"+alias+"&nbsp;</span>"
		+			"<span id='"+acctDivId+"-edit' class='fi-pencil small' style='display:none'></span><br />"
		+     "<span id='"+ acctDivId +"-name' style='font-weight:normal; display: none;'>&nbsp;#"+acct.account.account_id +' '+acctname+"</span>"
		+		"</div>"
		+ 	"<div class='small-4 columns acctBal' id='"+acctDivId+"-bal'>"
		+ 		(acct.account.sign*acct.account.balance).toFixed(2) +" &#9658;"
		+		"</div>"
		+ "</div>"
		+ "<div class='row acctFormDiv' id='"+ acctDivId +"-forms'>"
		+ 	"<div class='small-8 columns'>"
		//+			"<span>Relay:</span><br />"
		//+ 		"<h1>"+ acct.holder_id +"-"+ acct.limkey +"</h1><br />"
		//+			"<a href=''>Review</a> | <a href=''>Edit</a><br />"
		+			"<div id='"+ acctDivId +"-viz' class='left detailsDiv'>"
		+				"Brand <b>"+ acct.account.brand.name +"</b><br />"
		+				"Brand #"+ acct.account.brand.brand_id  +", Unit: "+ acct.account.unit +"<br />"
		+				"<span id='"+ acctDivId+"-relays'>Recipient Token: <b>" + acct.relay['default'] +"</b><br />(or see token list &#9658;)</span>"
		+			"</div>"
		+			(acct.throttle_id ? "<span>(This account is throttled, #"+acct.throttle_id+")</span>" : "")
		+		"</div>"
		+ 	"<div class='small-4 columns'>"
		+ 		((acct.relay['budget-add'] || acct['budget-add']) 
			? "<button class='tiny' id='"+acctDivId+"-add' style='width:5.0rem; margin-bottom:0.5rem;'>Add</button><br />" : "")
		+ 		((acct.relay['budget-transfer'] || acct['budget-transfer']) 
			? "<button id='"+acctDivId+"-transfer' class='tiny' style='width:5.0rem; margin-bottom:0.5rem;'>Transfer</button><br />" : "")
		+			((acct.relay['budget-use'] || acct['budget-use']) 
			? "<button id='"+acctDivId+"-use' class='tiny' style='width:5.0rem; margin-bottom:0.5rem;'>Use</button><br />" : "")
		+		"</div>" 	
		+ "</div>"
		+ "<div id='"+acctDivId+"-toggle' class='acctDivToggle'>&#9660;&#9660;&#9660;</div>"
		+ "</div>");
		
		if (acct.account.sign==1 && acct) $('#expenseAcctToUse').append("<option value='"+ acctDivId +"'>#"+ acct.account.account_id+' '+ alias +" @"+ acct.account.brand.name +"</option>");
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
				var i = obj.account.brand.brand_id % 11; 
				colorIndex[divId] = {
					logoBg: colors[i],
					divBg: colors[11-i].replace("rgb", "rgba").replace(")", ",0.4)"),
					logo: obj.brand_logo
						? "<img id='"+ divId +"-img' class='left logoDiv' src='"+ obj.brand_logo +"'/>"
						: "<div id='"+ divId +"-img' class='left logoDiv' style='background-color: "+ colors[i] +"'>"+ obj.account.brand.name.substr(0,1).toUpperCase() +"</div>"
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
		
		else if (e.target.id && e.target.id.slice(-7)=='-relays') {
			currAcctDivId = e.target.id.slice(0,-7);
			app.currView = 'relays';
			app.relays(app.resources[currAcctDivId]); 
			return;
		}
		
		else if (e.target.tagName.toUpperCase()=='BUTTON') {
			if (!params.expenseAcctToUse) params.expenseAcctToUse = e.target.parentNode.id;
			$('#expenseAcctToUse').val(params.expenseAcctToUse);
			app.txn(e.target.id); 
			return;
		}
		
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
		
		if (currAcctDivId==acctDivId) {
			currAcctDivId = '';
			app.adjustHeight();
		}
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
				
			app.adjustHeight(openHeight);
		}
	}
	
	
	return main;
}