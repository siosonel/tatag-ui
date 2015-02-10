function walletRecords(api) {
	 var currRecordId, currAcct;

	function main(acct) {
		if (acct) currAcct = acct;
		if (!currAcct || app.currView != 'records') return;
		app.currView = 'records';
		
		var url = currAcct.links.accountRecords;		
		$('#recordsWrapper').children().remove();
		$('#recordsWrapper').append(setTitle(currAcct))
		
		$('#accountsWrapper').animate({left: '-485px'});
		$('#recordsWrapper').animate({left: '0px'});

		//refresh info as needed using second argument to loadId
		api.loadId(url, app.refresh()).then(renderRecords, app.errHandler)
	}
	
	
	function setTitle(acct) {
		var	alias = acct.alias ? acct.alias : acct.account_name,
			acctname = alias==acct.account_name ? "" : acct.account_name;
			
		return	"<div id='acctRecordTitle' class='row'>"
		+ "<div class='large-8 medium-8 small-8 columns acctLabel'>"
		+ 	 "<span style='vertical-align:top; font-weight: 700;'>&#9668; "+alias+"</span><br />"
		+    "<span style='font-weight:normal;'>&nbsp;#"+acct.account_id +' '+acctname+"</span>"
		+	"</div>"
		+  "<div class='large-4 medium-4 small-4 columns acctBal' style='text-align:right;'>"+ (acct.sign*acct.balance).toFixed(2) + "</div>"
		+ "</div>";
	}
	
	function renderRecords(records) {
		if (!records.items || !records.items.length) $('#recordsWrapper').append("<div class='recordItem'>No transaction records found.</div>");
		else {
			records.items.map(listRecord);
		
			if (currRecordId) {
				var recordId = currRecordId;
				currRecordId = "";
				$('#'+recordId+'-toggle').click();
			}
		}
	}
	
	function listRecord(record) {
		var date = record.created.split(' ')[0].split('-'),
			other = record.other_acct ? '#'+record.other : record.other;
		
		var divId = 'record-'+record.record_id;
		app.resources[divId] = record;
		
		var relay = record.relay ? record.relay : {};
		var links = record.links ? record.links : {};
		var actionPrompt = setActionPrompt(divId, record, relay, links);
		var note = record.note ? record.note : "&nbsp;";
		
		$('#recordsWrapper').append(
			"<div id='"+divId+"' class='row recordItem' style='margin: 5px;'>"
			+		"<div class='large-2 medium-2 small-2 columns'>"+ date[1] +'/'+ date[2] +"</div>"
			+ 	"<div class='large-7 medium-7 small-7 columns' style='text-align: left; margin-bottom:10px;'>"
			+ 		record.direction+' '+ other +'<br /><i>'+ note +'</i>' + actionPrompt 
			+		"</div>"
			+ 	"<div class='large-3 medium-3 small-3 columns' style='text-align: right;'>"
			+ 		(record.status<0 ? "<i>rejected</i>" : record.amount.toFixed(2))
			+		"</div>"
			+ 	"<div id='"+divId+"-toggle' class='recordDivToggle'>&#9660;&#9660;&#9660;</div>"
			+'</div>'
		);
	}
	
	function setActionPrompt(divId, record, relay, links) {		
		if (relay['budget-unadd'] || links['budget-unadd']) 
			return "<br /><button class='tiny' id='"+divId+"-unadd' style='margin-top:5px;'>reverse</button>";
			
		if (relay['budget-untransfer'] || links['budget-untransfer']) 
			return "<br /><button class='tiny' id='"+divId+"-untransfer' style='margin-top:5px;'>reverse</button>";
		
		if (relay['budget-unuse'] || links['budget-unuse']) 
			return "<br /><button class='tiny' id='"+divId+"-unuse' style='margin-top:5px;'>reverse</button>";
		
		var prompt = "";
		
		if (links['record-hold']) prompt += "<button id='"+divId+"-hold' class='tiny fi-lock' title='hold for manual approval or rejection'></button>";		
		if (links['record-approve']) prompt += "<button id='"+divId+"-approve' class='fi-check tiny' title='manually approve'></button>"		
		if (links['record-reject']) prompt += "<button id='"+divId+"-reject' class='fi-x tiny' title='reject transaction'></button>";
		
		if (!prompt) {
			var status = record.status;
			
			if (status==0) prompt = '(pending auto-approval)';
			if (status==5) prompt = '(pending manual approval by recipient)';
			if (status==7) prompt = '(approved by recipient)';
			if (status<0) prompt = "rejected amount="+ record.amount;
		}
		
		return prompt ? "<br />"+prompt : "";
	}
	
	main.toggleRecordItem = function (e) {
		if (e.target.className.search('recordDivToggle') != -1) e.target = e.target.parentNode;
	
		var id = e.target.id, pid = e.target.parentNode.id, ppid = e.target.parentNode.parentNode.id;
		var idArr = [id, pid, ppid];
		var typeArr = [id.split('-')[0], pid.split('-')[0], ppid.split('-')[0]];
		
		if (idArr.indexOf('acctRecordTitle')!=-1) {
			app.currView = 'cards';
			app(); return;
		}		
		
		if (e.target.tagName.toUpperCase()=='BUTTON') {
			if (['hold', 'approve', 'reject'].indexOf(e.target.id.split('-')[2]) !=-1 ) app.edit(e.target.id); 
			app.txn(e.target.id); return;
		} 
		
		if (typeArr.indexOf('record')!=-1) {
			$('#'+currRecordId).animate({'max-height': '38px'});			
			$('#'+currRecordId+'-toggle').html("&#9660;&#9660;&#9660;")
				.css({'background-color': 'rgb(245,245,245)', 'color': 'rgb(190,190,190)'});
			
			var prevId = currRecordId;
			
			currRecordId = idArr[typeArr.indexOf('record')];
			
			if (prevId == currRecordId) currRecordId='';
			else {
				$('#'+currRecordId).animate({'max-height': '250px'});
				$('#'+currRecordId+'-toggle').html("&#9650;&#9650;&#9650;")
				.css({'background-color': '#007095', 'color': '#fff'});
			}
			
			return;
		}
	}
	
	return main
}