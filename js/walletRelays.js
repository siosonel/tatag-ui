function walletRelays(api) {
	 var currRelayId, currAcct, currHolderRelays, currCollection;
	 var scrollTo="";
	 var txntype = {'pn': 'Budget Use', 'np': 'Budget Issuance'};

	function main(acct) {
		if (acct) currAcct = acct;
		if (!currAcct || app.currView != 'relays') return;
		app.currView = 'relays';
		
		var url = currAcct.links.relays;
		$('#relaysWrapper').children().remove();
		$('#relaysWrapper').append(setTitle(currAcct))
		
		$('#accountsWrapper').animate({left: '-105%'});
		$('#relaysWrapper').animate({left: '0'});

		//refresh info as needed using second argument to loadId
		api.loadId(url, app.refresh()).then(renderRelays, app.errHandler)
	}
	
	
	function setTitle(acct) {
		var	alias = acct.alias ? acct.alias : acct.account_name,
			acctname = alias==acct.account_name ? "" : acct.account_name;
			
		return	"<div id='acctRelayTitle' class='row'>"
		+ "<div class='small-8 columns acctLabel'>"
		+ 	 "<span style='vertical-align:top; font-weight: 700;'>&#9668; "+alias+"</span><br />"
		+    "<span style='font-weight:normal;'>&nbsp;#"+acct.account_id +' '+acctname+"</span>"
		+	"</div>"
		+ "<div class='small-4 columns acctBal' style='text-align:right;'>"
		+		"<button id='relayAdd' class='right tiny' style='margin:0;'>+New Relay</button>"
		+ "</div>"
		+ "</div>";
	}
	
	function renderRelays(relays) { 
		if (!relays.items || !relays.items.length) $('#relaysWrapper').append("<div class='relayItem'>No accountholder relay found.</div>");
		else {
			currHolderRelays = relays;
			app.resources[currHolderRelays['@id']] = relays;
			relays.items.map(listRelay);
			paginate(relays);
		}
	}
	
	function listRelay(relay) {
		var divId = 'relay-'+relay.relay_id;
		app.resources[divId] = relay;
		
		$('#relaysWrapper').append(
			"<div id='"+divId+"' class='relayItem' style='margin: 5px;'>"
			+ "<div class='right'><span id='"+divId+"-edit' class='fi-pencil small'></span></div>"
			+ 'Recipient Token: <b>' + relay.token + '</b><br />'
			+	'For: ' + txntype[relay.txntype] +'<br />'
			+ 'Amount: ' + relay.amount_min.toFixed(2) +' to '+ relay.amount_max.toFixed(2) + '<br /><br />'
			+ 'Usage Limits Per Week: '+ relay.redirect + '<br />'
			+ 'Total: <b>'+ relay.by_all_limit +'</b>, By Brand: <b>'+ relay.by_brand_limit +'</b><br />'
			+ 'By User: <b>'+ relay.by_user_limit +'</b>, Reuse Wait: <b>'+ relay.by_user_wait +'</b> hours<br /><br />'
			+ 'Redirect: '+ relay.redirect + '<br />'
			+	'Tag: '+ relay.tag + '<br />'
			+	'Secret: '+ (relay.secret ? relay.secret : '') 
			+'</div>'
		);
	}
	
	function paginate(relays) {
		scrollTo=""
		if (relays.pageOrder=='desc' && relays.prev) scrollTo = relays.prev;
		if (relays.pageOrder=='asc' && relays.next) scrollTo = relays.next;
		$('#scrollTo').css('display', scrollTo ? 'block' : 'none');		
	}
	
	main.scrollMore = function (e) {
		api.loadId(scrollTo).then(renderRelays, app.errHandler)
	}
	
	main.toggleRelayItem = function (e) {	
		var id = e.target.id, pid = e.target.parentNode.id, ppid = e.target.parentNode.parentNode.id;
		var idArr = [id, pid, ppid];
		var typeArr = [id.split('-')[0], pid.split('-')[0], ppid.split('-')[0]];
		
		if (idArr.indexOf('relayAdd')!=-1) {
			app.edit(currHolderRelays['@id']);
			return;
		}
		
		if (idArr.indexOf('acctRelayTitle')!=-1) {
			app.currView = 'budgets';
			app('relaysWrapper'); return;
		}
		
		if (e.target.id.slice(-5)=='-edit') {
			app.edit(e.target.id.slice(0,-5)); 
			return;
		}		
	}
	
	return main
}