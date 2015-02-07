function walletRecords(api) {
	function main(acct) {
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
		+  "<div class='large-4 medium-4 small-4 columns acctBal' style='text-align:right;'>"+ 		(acct.sign*acct.balance).toFixed(2) +		"</div>"
		+ "</div>";
	}
	
	function renderRecords(records) {		
		records.items.map(listRecord)
	}
	
	function listRecord(record) {
		var date = record.created.split(' ')[0].split('-'),
			other = record.other_acct ? '#'+record.other : record.other;
		
		$('#recordsWrapper').append(
			"<div class='row recordItem' style='margin: 5px;'>"
			+		"<div class='large-2 medium-2 small-2 columns'>"+ date[1] +'/'+ date[2] +"</div>"
			+ 	"<div class='large-7 medium-7 small-7 columns' style='text-align: left;'>"
			+ 		record.direction+' '+ other +'<br /><i>'+ record.note +'</i>'
			+		"</div>"
			+ 	"<div class='large-3 medium-3 small-3 columns' style='text-align: right;'>"+ record.amount.toFixed(2) +"</div>"
			+'</div>'
		)
	}
	
	main.toggleRecordItem = function (e) { console.log()
		var id = e.target.id, pid = e.target.parentNode.id, ppid = e.target.parentNode.parentNode.id;
		if (id=='acctRecordTitle' || pid=='acctRecordTitle' || ppid=='acctRecordTitle') {app(); return;}
	}
	
	return main
}