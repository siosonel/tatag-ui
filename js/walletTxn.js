function walletTxn(api) {
	var currResource, currForm, currInputs;
	
	function main(arg) {		
		var arr = arg.split("-"), action=arr.pop(), wrapperId = arr.join("-");
		currResource = app.resources[wrapperId]; //console.log(currResource); console.log(api.byId); console.log(action+' '+arguments.length);
		
		var relay = !currResource.relay ? null : currResource.relay['budget-'+action];
		currForm = !currResource.links ? null : api.byId[currResource.links['budget-'+action]];
		
		renderForm(action);
		renderRelay(relay);		
		$('#txnModal').foundation('reveal','open');
	}
	
	function renderForm(action) {
		if (!currForm) {$('#txnForm').css('display','none'); return;}
		
		$('#txnForm').css('display','block');
		currInputs = currForm.inputs.required.concat(currForm.inputs.optional);		
		$('#txn-title').html(currForm.title);	
		currInputs.map(main[action]);
	}
	
	function renderInputs(inputName) {
		var val = inputName=='from' ? currResource.relay['default'] : "";
		var disabled = inputName=='from' ? true : false;
	
		$('#txn-'+inputName).val(val);
		$('#txn-'+inputName).prop('disabled', disabled);
		
		if (inputName=='to') $('#txnToDiv').css('display','inline-block');
		else if (inputName=='from') $('#txnFromDiv').css('display','none');
	}
	
	function renderReverse(inputName) {
		var val = inputName=='to' ? currResource.relay['default'] 
			: inputName=='orig_record_id' ? currResource['orig_record_id'] 
			: "";
				
		var disabled = inputName=='to' ? true : false;
	
		$('#txn-'+inputName).val(val);
		$('#txn-'+inputName).prop('disabled', disabled); console.log(inputName);
		
		if (inputName=='to') $('#txnToDiv').css('display','none');
		else if (inputName=='from') $('#txnFromDiv').css('display','inline-block');
	}
	
	function renderRelay(relay) {		
		if (!relay) {$('#relayInfo').css('display','none'); return;}
		
		var optionText = currForm ? "<hr/><span><i>-- OR --</i></span>" : "";
		var promptText = currResource.record_id 
			? "Authorize the refund with this 'from' value"
			: "Authorize the transaction originator with this 'to' value";
		
		$('#relayInfo')
			.html(optionText
				+"<span><br/><br/>"+ promptText +":<br/><br/>"
				+"<h1>"+ relay +"</h1><button class='medium' id='postRelayBtn'>Check Records</button></span>"
			)
			.css('display','block');
	}
	
	main.add = renderInputs
	main.transfer = renderInputs
	main.use = renderInputs
	
	main.unadd = renderReverse
	main.untransfer = renderReverse
	main.unuse = renderReverse
	
	main.postRelayRefresh = function (e) {
		if (e.target.id!='postRelayBtn') return;
		app.currView='records'; 		
		main.refreshViews(); 
		$('#txnModal').foundation('reveal','close');
	}
	
	main.formClick = function formClick(e) {
		if (e.target.id != 'txn-submit') return;
		
		var query = {}, isReversal = currInputs.indexOf('orig_record_id')!=-1;
		currForm.query.required.map(function (param) {query[param] = currResource[param]});
		
		action = {
			target: currForm.target, 
			query: query,
			method:'post', 
			inputs:{}
		};
		
		$('#txnModal').foundation('reveal','close');
		
		currInputs.map(function (inputName) {
			action.inputs[inputName] = $('#txn-'+inputName).val();
			if (inputName=='amount' && isReversal && 1*action.inputs[inputName]>0) action.inputs[inputName] = -1*action.inputs[inputName];
		}); //console.log(action); return;
		
		api.request(action).then(main.refreshViews, app.errHandler);
	}
	
	main.refreshViews = function (res) {
		app.refresh(2); 
		app.cards(); // will refresh/open records view as needed;
	}
	
	return main;
}