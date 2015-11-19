function walletRecords(api) {
	 var currRecordId, currAcct, currCollection;
	 var maxHeight = '250px';
	 var scrollTo="";

	function main(acct) {
		if (acct) currAcct = acct;
		if (!currAcct || app.currView != 'records') return;
		app.currView = 'records';
			
		$('#recordsWrapper').children().remove();
		$('#recordsWrapper').append(setTitle(currAcct))
		
		$('#accountsWrapper').animate({left: '-105%'});
		$('#recordsWrapper').animate({left: '0'});
		
		var match = {"#": "items", "holder_id": acct.holder_id};
		
		//refresh info as needed using refresh argument 
		api.loadConcept('personal', 'account-records', app.refresh(), match).then(renderRecords, app.errHandler);
	}
	
	function setTitle(acct) {
		var	alias = acct.alias ? acct.alias : acct.account.name,
			acctname = alias==acct.account.name ? "" : acct.account.name;
			
		return	"<div id='acctRecordTitle' class='row'>"
		+ "<div class='small-8 columns acctLabel'>"
		+ 	 "<span style='vertical-align:top; font-weight: 700;'>&#9668; "+alias+"</span><br />"
		+    "<span style='font-weight:normal;'>&nbsp;#"+acct.account.account_id +' '+acctname+"</span>"
		+	"</div>"
		+ "<div class='small-4 columns acctBal' style='text-align:right;'>"
		+ 	(acct.account.sign*acct.account.balance).toFixed(2) + "&nbsp;&nbsp;<br />"
		+ 	"<button class='tiny' style='float:right; margin:0 5px -5px 0;'><span class='fi-magnifying-glass'></span></div>"		
		+ "</div>"
		+ "</div>";
	}
	
	function renderRecords(records) {
		if (!records.items || !records.items.length) $('#recordsWrapper').append("<div class='recordItem'>No transaction records found.</div>");
		else {
			records.items.map(listRecord);
			paginate(records);
			$('#'+currRecordId).css('max-height', maxHeight);
			app.adjustHeight();
		}
	}
	
	function listRecord(record) {
		var date = record.created.split(' ')[0].split('-'),
			other = record.other_acct ? '#'+record.other : record.other;
		
		var divId = 'record-'+record.record_id;
		app.resources[divId] = record;
		
		var relay = record.relay ? record.relay : {};
		var actionPrompt = setActionPrompt(divId, record, relay, record);
		var note = record.note ? record.note : "&nbsp;";
		
		$('#recordsWrapper').append(
			"<div id='"+divId+"' class='row recordItem' style='margin: 5px;'>"
			+		"<div class='large-2 medium-2 small-2 columns'>"+ date[1] +'/'+ date[2] +"</div>"
			+ 	"<div class='large-7 medium-7 small-7 columns' style='text-align: left; margin-bottom:10px;'>"
			+ 		record.direction+' '+ other +'<br /><i>'+ note +'</i><br />record id: '+ record.record_id + actionPrompt
			+		"</div>"
			+ 	"<div class='large-3 medium-3 small-3 columns' style='text-align: right;'>"
			+     displayAmount(record) + displayAdvise(record) 
			+   "</div>"
			+ 	"<div id='"+divId+"-toggle' class='recordDivToggle'>&#9660;&#9660;&#9660;</div>"
			+'</div>'
		);
	}
	
	function setActionPrompt(divId, record, relay) {		
		if (relay['budget-unadd'] || record['budget-unadd']) 
			return "<br /><button class='tiny' id='"+divId+"-unadd' style='margin-top:5px;'>reverse</button>";
			
		if (relay['budget-untransfer'] || record['budget-untransfer']) 
			return "<br /><button class='tiny' id='"+divId+"-untransfer' style='margin-top:5px;'>reverse</button>";
		
		if (relay['budget-unuse'] || record['budget-unuse']) 
			return "<br /><button class='tiny' id='"+divId+"-unuse' style='margin-top:5px;'>reverse</button>";
		
		var prompt = "";
		
		if (record['record-hold']) prompt += "<button id='"+divId+"-hold' class='tiny fi-lock' title='hold for manual approval or rejection'></button>";		
		if (record['record-approve']) prompt += "<button id='"+divId+"-approve' class='fi-check tiny' title='manually approve'></button>"		
		if (record['record-reject']) prompt += "<button id='"+divId+"-reject' class='fi-x tiny' title='reject transaction'></button>";
		
		if (!prompt) {
			var status = record.status;
			
			if (status==0) prompt = '(pending auto-approval)';
			if (status==5) prompt = '(pending manual approval by recipient)';
			if (status==7) prompt = '(approved by recipient)';
			if (status<0) prompt = "rejected amount="+ record.amount;
		}
		
		return prompt ? "<br />"+prompt : "";
	}
	
	function displayAdvise(record) {
		if (!record.advisory) return "";
		var advise = record.advisory.advise,
			color = advise=='accept' ? '#0f0' : '#f00';
		
		return "<br /><span style='font-weight:700;color:"+color+"'>"+ advise +"?<span>";
	}
	
	function displayAmount(record) {
		if (record.status<0) return "<i>rejected</i>"; 
		
		var amount = record.amount.toFixed(2);		
		if (record.status!=7) {			
			if ((record.direction=='from' && amount>0) || (record.direction=='to' && amount<0)) amount = '('+ amount +')';
			if (record.status==5) amount = '*'+amount; //highlight the need for manual approval, since auto-approval was disabled
		}
		
		return amount;
	}
	
	function paginate(records) {
		scrollTo=""
		if (records.pageOrder=='desc' && records.prev) scrollTo = records.prev;
		if (records.pageOrder=='asc' && records.next) scrollTo = records.next;
		$('#scrollTo').css('display', scrollTo ? 'block' : 'none');		
	}
	
	main.scrollMore = function (e) {
		api.loadId(scrollTo).then(renderRecords, app.errHandler)
	}
	
	main.toggleRecordItem = function (e) {
		if (e.target.className.search('recordDivToggle') != -1) e.target = e.target.parentNode;
	
		var id = e.target.id, pid = e.target.parentNode.id, ppid = e.target.parentNode.parentNode.id;
		var idArr = [id, pid, ppid];
		var typeArr = [id.split('-')[0], pid.split('-')[0], ppid.split('-')[0]];
		
		if (idArr.indexOf('acctRecordTitle')!=-1) {
			app.currView = 'budgets';
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
			
			if (prevId == currRecordId) {
				currRecordId='';
				app.adjustHeight();
			}
			else {
				$('#'+currRecordId).animate({'max-height': maxHeight});
				$('#'+currRecordId+'-toggle').html("&#9650;&#9650;&#9650;")
				.css({'background-color': '#007095', 'color': '#fff'});
				
				app.adjustHeight(maxHeight);
			}
			
			return;
		}
	}
	
	return main
}