function walletRecords(api) {
	 var currRecordId, currAcct;

	function main(acct) {
		if (acct) currAcct = acct;
		if (!currAcct || app.currView != 'records') return;
		
		var url = currAcct.links.accountRecords;		
		$('#recordsWrapper').children().remove();
		$('#recordsWrapper').append(setTitle(currAcct))
		
		$('#accountsWrapper').animate({left: '-485px'});
		$('#recordsWrapper').animate({left: '0px'});
		
		//refresh info as needed using second argument to loadId
		api.loadId(url, app.refresh).then(renderRecords, app.errHandler)
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
		else records.items.map(listRecord);
	}
	
	function listRecord(record) {
		var date = record.created.split(' ')[0].split('-'),
			other = record.other_acct ? '#'+record.other : record.other;
		
		var divId = 'record-'+record.record_id;
		app.resources[divId] = record;
		
		var relay = record.relay ? record.relay : {};
		var links = record.links ? record.links : {};
		
		if (relay['budget-unadd'] || links['budget-unadd']) 
			var reversePrompt = "<br /><button class='tiny' id='"+divId+"-unadd' style='margin-top:5px;'>reverse</button>";
		
		else if (relay['budget-untransfer'] || links['budget-untransfer']) 
			var reversePrompt = "<br /><button class='tiny' id='"+divId+"-untransfer' style='margin-top:5px;'>reverse</button>";
		
		else if (relay['budget-unuse'] || links['budget-unuse']) 
			var reversePrompt = "<br /><button class='tiny' id='"+divId+"-unuse' style='margin-top:5px;'>reverse</button>";
		
		else var reversePrompt = '';
		
		$('#recordsWrapper').append(
			"<div id='"+divId+"' class='row recordItem' style='margin: 5px;'>"
			+		"<div class='large-2 medium-2 small-2 columns'>"+ date[1] +'/'+ date[2] +"</div>"
			+ 	"<div class='large-7 medium-7 small-7 columns' style='text-align: left;'>"
			+ 		record.direction+' '+ other +'<br /><i>'+ record.note +'</i>' 
			+		"</div>"
			+ 	"<div class='large-3 medium-3 small-3 columns' style='text-align: right;'>"+ record.amount.toFixed(2) + reversePrompt +"</div>"
			+ 	"<div id='"+divId+"-toggle' class='recordDivToggle'>&#9660;&#9660;&#9660;</div>"
			+'</div>'
		);
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
			app.forms(e.target.id); return;
		} 
		
		if (typeArr.indexOf('record')!=-1) {
			$('#'+currRecordId).animate({height: '38px'});			
			$('#'+currRecordId+'-toggle').html("&#9660;&#9660;&#9660;")
				.css({'background-color': 'rgb(245,245,245)', 'color': 'rgb(190,190,190)'});
			
			var prevId = currRecordId;
			
			currRecordId = idArr[typeArr.indexOf('record')];
			
			if (prevId == currRecordId) currRecordId='';
			else {
				$('#'+currRecordId).animate({height: '100px'});
				$('#'+currRecordId+'-toggle').html("&#9650;&#9650;&#9650;")
				.css({'background-color': '#007095', 'color': '#fff'});
			}
			
			return;
		}
	}
	
	return main
}