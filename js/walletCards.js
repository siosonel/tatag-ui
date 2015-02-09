function walletCards(api) {	
	var currURL, currAccounts, currAcctDivId;
	
	function main(userAccountsURL) {		
		if (userAccountsURL) currURL = userAccountsURL;		
		$('#accountsWrapper').children().remove();
		
		api.loadId(currURL, app.refresh)
			.then(renderCards, main.errHandler);		
	}
	
	function renderCards(userAccounts) {
		currAccounts = userAccounts;
		currAccounts.items.map(renderAcctDiv);
		if (app.currView=='records') app.records(app.resources[currAcctDivId]);
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
		+ 	"<div class='large-8 medium-8 small-8 columns acctLabel'>"
		+			"<img id='"+ acctDivId +"-img' class='left' src='http://placehold.it/25x25&text=[img]'/>"
		+ 		"<span style='vertical-align:top'>&nbsp;"+alias+"</span><br />"
		+     "<span id='"+ acctDivId +"-name' style='font-weight:normal; display: none;'>&nbsp;#"+acct.account_id +' '+acctname+"</span>"
		+		"</div>"
		+ 	"<div class='large-4 medium-4 small-4 columns acctBal' id='"+acctDivId+"-bal'>"
		+ 		(acct.sign*acct.balance).toFixed(2) +" &#9658;"
		+		"</div>"
		+ "</div>"
		+ "<div class='row acctFormDiv' id='"+ acctDivId +"-forms'>"
		+ 	"<div class='large-8 medium-8 small-8 columns'>"
		//+			"<span>Relay:</span><br />"
		//+ 		"<h1>"+ acct.holder_id +"-"+ acct.limkey +"</h1><br />"
		//+			"<a href=''>Review</a> | <a href=''>Edit</a><br />"
		+			"<img id='"+ acctDivId +"-viz' class='left' src='http://placehold.it/300x180&text=[img]'/>"
		+		"</div>"
		+ 	"<div class='large-4 medium-4 small-4 columns'>"
		+ 		((acct.relay['budget-add'] || acct.links['budget-add']) ? "<button style='width:100px;' id='"+acctDivId+"-add'>Add</button><br />" : "")
		+ 		((acct.relay['budget-transfer'] || acct.links['budget-transfer']) ? "<button id='"+acctDivId+"-transfer' style='width:100px; padding-left: 1.3rem;'>Transfer</button><br />" : "")
		+			((acct.relay['budget-use'] || acct.links['budget-use']) ? "<button id='"+acctDivId+"-use' style='width:100px'>Use</button><br />" : "")
		+		"</div>" 	
		+ "</div>"
		+ "</div>");
	}
	
	main.toggleAcctItem = function toggleAcctItem(e) {
		if (e.target.id && e.target.id.slice(-3)=='bal') {
			currAcctDivId = e.target.id.slice(0,-4);
			app.currView = 'records';
			app.records(app.resources[currAcctDivId]); 
			return;
		}
		
		if (e.target.tagName.toUpperCase()=='BUTTON') {app.forms(e.target.id); return;}
		if (e.target.tagName.toUpperCase()=='A') return false;
		if (e.target.className.search('acctItem') == -1) return; 
		
		$('#'+currAcctDivId).animate({height: '50px'});
		$('#'+currAcctDivId+'-forms').css('display', 'none');
		$('#'+currAcctDivId+'-label').css('font-weight', 'normal');
		$('#'+currAcctDivId+'-img').animate({height:'25px', width:'25px'});
		$('#'+currAcctDivId+'-name').css('display', 'none');
		
		if (currAcctDivId==e.target.id) {currAcctDivId = '';}
		else {
			currAcctDivId =  e.target.id;
			$('#'+currAcctDivId).animate({height: '300px'});	
			$('#'+currAcctDivId+'-forms').css('display', 'block');
			$('#'+currAcctDivId+'-label').css('font-weight', '700');
			$('#'+currAcctDivId+'-img').animate({height:'50px', width:'50px'});
			$('#'+currAcctDivId+'-name').css('display','inline');
		}
	}
	
	
	return main;
}