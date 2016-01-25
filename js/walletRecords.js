function walletRecords(api) {
	 var currRecordId, currHolding, currCollection;
	 var maxHeight = '250px';
	 var scrollTo="";

	function main(holding) {
		if (holding) currHolding = holding;
		if (!currHolding || app.currView != 'records') return;
		app.currView = 'records';
			
		$('#recordsWrapper').children().remove();
		$('#recordsWrapper').append(setTitle(currHolding))
		
		$('#accountsWrapper').animate({left: '-105%'});
		$('#recordsWrapper').animate({left: '0'});
		
		var match = {"#": "holding", "id": holding.id};
		
		//refresh info as needed using refresh argument 
		api.loadConcept('my-account-records', match).then(renderRecords, app.errHandler);
	}
	
	function setTitle(holding) {
		var	alias = holding.alias ? holding.alias : holding.account.name,
			acctname = alias==holding.account.name ? "" : holding.account.name;
			
		return	"<div id='acctRecordTitle' class='row'>"
		+ "<div class='small-8 columns acctLabel'>"
		+ 	 "<span style='vertical-align:top; font-weight: 700;'>&#9668; "+alias+"</span><br />"
		+    "<span style='font-weight:normal;'>&nbsp;#"+holding.account.id +' '+acctname+"</span>"
		+	"</div>"
		+ "<div class='small-4 columns acctBal' style='text-align:right;'>"
		+ 	(holding.account.sign*holding.account.balance).toFixed(2) + "&nbsp;&nbsp;<br />"
		+ 	"<button class='tiny' style='float:right; margin:0 5px -5px 0;'><span class='fi-magnifying-glass'></span></div>"		
		+ "</div>"
		+ "</div>";
	}
	
	function renderRecords(records) {
		if (!records.items || !records.items.length) $('#recordsWrapper').append("<div class='recordItem'>No transaction records found.</div>");
		else {
			records.items.sort(sortByIdDesc).map(listRecord);
			paginate(records);
			$('#'+currRecordId).css('max-height', maxHeight);
			app.adjustHeight();
		}
	}

	function sortByIdDesc(a,b) {
		return b.id - a.id;
	}
	
	function listRecord(record) {
		var date = record.created.split(' ')[0].split('-'),
			other = record.other_acct ? '#'+record.other : record.other;
		
		var divId = 'record-'+record.record_id;
		app.resources[divId] = record;
		
		var relay = record.relayDefault ? record.relayDefault : {token:'', for:[]};
		var actionPrompt = setActionPrompt(divId, record, relay, record);
		var note = record.note ? record.note : "&nbsp;";
		
		$('#recordsWrapper').append(
			"<div id='"+divId+"' class='row recordItem' style='margin: 5px;'>"
			+		"<div class='large-2 medium-2 small-2 columns'>"+ date[1] +'/'+ date[2] +"</div>"
			+ 	"<div class='large-7 medium-7 small-7 columns' style='text-align: left; margin-bottom:10px;'>"
			+ 		record.role+' '+ other +'<br /><i>'+ note +'</i><br />record id: '+ record.record_id + actionPrompt
			+		"</div>"
			+ 	"<div class='large-3 medium-3 small-3 columns' style='text-align: right;'>"
			+     displayAmount(record) + displayAdvise(record) 
			+   "</div>"
			+ 	"<div id='"+divId+"-toggle' class='recordDivToggle'>&#9660;&#9660;&#9660;</div>"
			+'</div>'
		);
	}
	
	function setActionPrompt(divId, record, relay) {		
		if (relay['for'].indexOf('unadd')!=-1 || record['unadd']) 
			return "<br /><button class='tiny' id='"+divId+"-unadd' style='margin-top:5px;'>reverse</button>";
			
		if (relay['for'].indexOf('untransfer')!=-1 || record['untransfer']) 
			return "<br /><button class='tiny' id='"+divId+"-untransfer' style='margin-top:5px;'>reverse</button>";
		
		if (relay['for'].indexOf('unuse')!=-1 || record['unuse']) 
			return "<br /><button class='tiny' id='"+divId+"-unuse' style='margin-top:5px;'>reverse</button>";
		
		var prompt = "";
		
		if (record['hold']) prompt += "<button id='"+divId+"-hold' class='tiny fi-lock' title='hold for manual approval or rejection'></button>";		
		if (record['approve']) prompt += "<button id='"+divId+"-approve' class='fi-check tiny' title='manually approve'></button>"		
		if (record['reject']) prompt += "<button id='"+divId+"-reject' class='fi-x tiny' title='reject transaction'></button>";
		
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
			if ((record.role=='from' && amount>0) || (record.role=='to' && amount<0)) amount = '('+ amount +')';
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
		
		if (e.target.tagName.toUpperCase()=='BUTTON') { console.log(e.target.id)
			if (['hold', 'approve', 'reject'].indexOf(e.target.id.split('-')[2]) !=-1 ) app.edit(e.target.id); //console.log(e.target.id);
			else app.txn(e.target.id); 
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