function walletCards(api) {	
	var currAcctItem;
	
	function main(acct) {
		var wrapperId = "acct-"+ acct.account_id,
			alias = acct.alias ? acct.alias : acct.account_name,
			acctname = alias==acct.account_name ? "" : acct.account_name;
		
		app.resources[wrapperId] = acct;
		if (!acct.relay) acct.relay = {};
		if (!acct.links) acct.links = {};
		
		
		$('#accountsWrapper').append("<div class='large-12 acctItem' id='"+wrapperId+"'>"
		+ "<div class='row' style='margin-bottom:30px;' id='"+ wrapperId +"-label'>"
		+ 	"<div class='large-8 medium-8 small-8 columns acctLabel'>"
		+			"<img id='"+ wrapperId +"-img' class='left' src='http://placehold.it/25x25&text=[img]'/>"
		+ 		"<span style='vertical-align:top'>&nbsp;"+alias+"</span><br />"
		+     "<span id='"+ wrapperId +"-name' style='font-weight:normal; display: none;'>&nbsp;#"+acct.account_id +' '+acctname+"</span>"
		+		"</div>"
		+ 	"<div class='large-4 medium-4 small-4 columns acctBal' id='"+wrapperId+"-bal'>"
		+ 		(acct.sign*acct.balance).toFixed(2) +" &#9658;"
		+		"</div>"
		+ "</div>"
		+ "<div class='row acctFormDiv' id='"+ wrapperId +"-forms'>"
		+ 	"<div class='large-8 medium-8 small-8 columns'>"
		//+			"<span>Relay:</span><br />"
		//+ 		"<h1>"+ acct.holder_id +"-"+ acct.limkey +"</h1><br />"
		//+			"<a href=''>Review</a> | <a href=''>Edit</a><br />"
		+			"<img id='"+ wrapperId +"-viz' class='left' src='http://placehold.it/300x180&text=[img]'/>"
		+		"</div>"
		+ 	"<div class='large-4 medium-4 small-4 columns'>"
		+ 		((acct.relay['budget-add'] || acct.links['budget-add']) ? "<button style='width:100px;' id='"+wrapperId+"-add'>Add</button><br />" : "")
		+ 		((acct.relay['budget-transfer'] || acct.links['budget-transfer']) ? "<button id='"+wrapperId+"-transfer' style='width:100px; padding-left: 1.3rem;'>Transfer</button><br />" : "")
		+			((acct.relay['budget-use'] || acct.links['budget-use']) ? "<button id='"+wrapperId+"-use' style='width:100px'>Use</button><br />" : "")
		+		"</div>" 	
		+ "</div>"
		+ "</div>");
	}
	
	main.toggleAcctItem = function toggleAcctItem(e) {
		if (e.target.id && e.target.id.slice(-3)=='bal') {app.records(app.resources[e.target.id.slice(0,-4)]); return;}
		if (e.target.tagName.toUpperCase()=='BUTTON') {app.forms(e.target.id); return;}
		if (e.target.tagName.toUpperCase()=='A') return false;
		if (e.target.className.search('acctItem') == -1) return; 
		
		$('#'+currAcctItem).animate({height: '50px'});
		$('#'+currAcctItem+'-forms').css('display', 'none');
		$('#'+currAcctItem+'-label').css('font-weight', 'normal');
		$('#'+currAcctItem+'-img').animate({height:'25px', width:'25px'});
		$('#'+currAcctItem+'-name').css('display', 'none');
		
		if (currAcctItem==e.target.id) {currAcctItem = '';}
		else {
			currAcctItem =  e.target.id;
			$('#'+currAcctItem).animate({height: '300px'});	
			$('#'+currAcctItem+'-forms').css('display', 'block');
			$('#'+currAcctItem+'-label').css('font-weight', '700');
			$('#'+currAcctItem+'-img').animate({height:'50px', width:'50px'});
			$('#'+currAcctItem+'-name').css('display','inline');
		}
	}
	
	
	return main;
}