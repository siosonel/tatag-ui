function walletRecords(api) {
	function main(acct) {
		var url = acct.links.accountRecords;
		$('#accountsWrapper').css('display','none');
		
		$('#recordsWrapper').children().remove();
		$('#recordsWrapper').append("<div class='acctRecordTitle'><b>"+ acct.alias+'</b> '+acct.account_name+', '+ acct.balance +'</div>')
		$('#recordsWrapper').css('display','block');
		api.loadId(url).then(renderRecords, app.errHandler)
	}
	
	function renderRecords(records) {
		
		records.items.map(listRecord)
	}
	
	function listRecord(record) {
		var date = record.created.split(' ')[0].split('-');
		
		$('#recordsWrapper').append(
			"<div class='row recordItem' style='margin: 5px;'>"
			+		"<div class='large-2 medium-2 small-2 columns'>"+ date[1] +'/'+ date[2] +"</div>"
			+ 	"<div class='large-7 medium-7 small-7 columns' style='text-align: left;'>"
			+ 		record.direction+' '+record.brand_name +'<br /><i>'+ record.note +'</i>'
			+		"</div>"
			+ 	"<div class='large-3 medium-3 small-3 columns' style='text-align: right;'>"+ record.amount.toFixed(2) +"</div>"
			+'</div>'
		)
	}
	
	main.toggleRecordItem = function (e) { console.log(e.target.className);
		if (e.target.className.search('acctRecordTitle')!=-1) {app(); return;}
	}
	
	return main
}