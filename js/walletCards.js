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
		currAccounts = userAccounts;
		currAccounts.items.map(renderAcctDiv); 
		if (app.currView=='records') app.records(app.resources[currAcctDivId]);
		$('#'+currAcctDivId).css('height', openHeight);
		$('#'+currAcctDivId+'-forms').css('display', 'block');
	}
	
	function renderAcctDiv(acct) {
		var acctDivId = "acct-"+ acct.account_id,
			alias = acct.alias ? acct.alias : acct.account_name,
			acctname = alias==acct.account_name ? "" : acct.account_name;
		
		app.resources[acctDivId] = acct;
		if (!acct.relay) acct.relay = {};
		if (!acct.links) acct.links = {};
		
		
		$('#accountsWrapper').append("<div class='large-12 acctItem' id='"+acctDivId+"'>"
		+ "<div class='row' style='margin-bottom:30px;' id='"+ acctDivId +"-label'>"
		+ 	"<div class='small-8 columns acctLabel'>"
		+			"<img id='"+ acctDivId +"-img' class='left' src='http://placehold.it/25x25&text=[img]'/>"
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
		+			"<img id='"+ acctDivId +"-viz' class='left' src='http://placehold.it/300x180&text=[img]'/>"
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
		
		$('#'+currAcctDivId).animate({height: '50px'});
		$('#'+currAcctDivId+'-forms').css('display', 'none');
		$('#'+currAcctDivId+'-label').css('font-weight', 'normal');
		$('#'+currAcctDivId+'-img').animate({height:'25px', width:'25px'});
		$('#'+currAcctDivId+'-name').css('display', 'none');
		$('#'+currAcctDivId+'-edit').css('display', 'none');
		$('#'+currAcctDivId+'-toggle').html("&#9660;&#9660;&#9660;")
			.css({'background-color': 'rgb(245,245,245)', 'color': 'rgb(190,190,190)'});
		
		if (currAcctDivId==acctDivId) {currAcctDivId = '';}
		else {
			currAcctDivId =  acctDivId;
			$('#'+currAcctDivId).animate({height: openHeight});	
			$('#'+currAcctDivId+'-forms').css('display', 'block');
			$('#'+currAcctDivId+'-label').css('font-weight', '700');
			$('#'+currAcctDivId+'-img').animate({height:'50px', width:'50px'});
			$('#'+currAcctDivId+'-name').css('display','inline');
			$('#'+currAcctDivId+'-edit').css('display', 'inline');
			$('#'+currAcctDivId+'-toggle').html("&#9650;&#9650;&#9650;")
				.css({'background-color': '#007095', 'color': '#fff'});
		}
	}
	
	
	return main;
}