function walletRecords(api) {
	 var currRecordId, currAcct;

	function main(acct) {
		currAcct = acct;
		
		var url = acct.links.accountRecords;		
		$('#recordsWrapper').children().remove();
		$('#recordsWrapper').append(setTitle(acct))
		
		$('#accountsWrapper').animate({left: '-485px'});
		$('#recordsWrapper').animate({left: '0px'});
		
		api.loadId(url).then(renderRecords, app.errHandler)
	}
	
	
	function setTitle(acct) {
		var	alias = acct.alias ? acct.alias : acct.account_name,
			acctname = alias==acct.account_name ? "" : acct.account_name;
			
		return	"<div id='acctRecordTitle' class='row'>"
		+ "<div class='large-8 medium-8 small-8 columns acctLabel'>"
		//+		"<img class='left' src='http://placehold.it/25x25&text=[img]'/>"
		+ 	 "<span style='vertical-align:top; font-weight: 700;'>&#9668; "+alias+"</span><br />"
		+    "<span style='font-weight:normal;'>&nbsp;#"+acct.account_id +' '+acctname+"</span>"
		+	"</div>"
		+  "<div class='large-4 medium-4 small-4 columns acctBal' style='text-align:right;'>"+ (acct.sign*acct.balance).toFixed(2) + "</div>"
		+ "</div>";
	}
	
	function renderRecords(records) {		
		records.items.map(listRecord);
	}
	
	function listRecord(record) {
		var date = record.created.split(' ')[0].split('-'),
			other = record.other_acct ? '#'+record.other : record.other;
		
		if (!record.links) var reversePrompt = ''; 
		else if (record.links['reverse-add']) var reversePrompt = "<br /><button class='tiny' id='reverse-"+record.record_id+"-add'>reverse</button>";
		else if (record.links['reverse-transfer']) var reversePrompt = "<br /><button class='tiny' id='reverse-"+record.record_id+"-transfer'>reverse</button>";
		else if (record.links['reverse-use']) var reversePrompt = "<br /><button class='tiny' id='reverse-"+record.record_id+"-use'>reverse</button>";
		else var reversePrompt = '';
		
		$('#recordsWrapper').append(
			"<div id='record-"+record.record_id+"' class='row recordItem' style='margin: 5px;'>"
			+		"<div class='large-2 medium-2 small-2 columns'>"+ date[1] +'/'+ date[2] +"</div>"
			+ 	"<div class='large-7 medium-7 small-7 columns' style='text-align: left;'>"
			+ 		record.direction+' '+ other +'<br /><i>'+ record.note +'</i>' + reversePrompt 
			+		"</div>"
			+ 	"<div class='large-3 medium-3 small-3 columns' style='text-align: right;'>"+ record.amount.toFixed(2) + "</div>"
			+'</div>'
		);
	}
	
	main.toggleRecordItem = function (e) {
		var id = e.target.id, pid = e.target.parentNode.id, ppid = e.target.parentNode.parentNode.id;
		var idArr = [id, pid, ppid];
		var typeArr = [id.split('-')[0], pid.split('-')[0], ppid.split('-')[0]];
		
		if (idArr.indexOf('acctRecordTitle')!=-1) {app(); return;}		
		
		if (typeArr.indexOf('reverse')!=-1) {
			var action = idArr[typeArr.indexOf('reverse')].split('-')[2];	
			app.forms.showTxnForm(currAcct, action); 
			return;
		} 
		
		if (typeArr.indexOf('record')!=-1) {
			$('#'+currRecordId).animate({height: '38px'});			
			var prevId = currRecordId;
			
			currRecordId = idArr[typeArr.indexOf('record')];
			
			if (prevId == currRecordId) currRecordId='';
			else $('#'+currRecordId).animate({height: '120px'});
			
			return;
		}
	}
	
	return main
}