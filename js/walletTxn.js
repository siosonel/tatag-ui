function walletTxn(api) {
	var currResource, currForm, currInputs, params;
	
	function main(arg) {		
		params = app.params();
	
		var arr = arg.split("-"), action=arr.pop(), wrapperId = arr.join("-");
		currResource = app.resources[wrapperId]; //console.log(currResource); console.log(api.byId); console.log(action+' '+arguments.length);
		
		var relay = !currResource.relay ? null : currResource.relay['budget-'+action];
		currForm = !currResource.links ? null : api.byId[currResource.links['budget-'+action]];
		
		$('#expenseSelectDiv').css('display', action=='use' ? 'block' : 'none');
		
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
		var val = ['to','amount','note'].indexOf(inputName)!=-1 && params[inputName] ? params[inputName]
			: inputName=='from' ? currResource.relay['default'] 
			: "";
			
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
		$('#txn-'+inputName).prop('disabled', disabled);
		
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
		});
		
		api.request(action).then(main.refreshViews, app.errHandler);
	}
	
	main.refreshViews = function (res) {
		if (params.postPayURL) {
			var record = res['@graph'][0];
			var mssg = record ? "Your payment was processed successfully." : res.error;
			
			var goback = confirm(mssg +' Do you want to reload the previous page?');
	
			if (goback) {			
				window.location.href = params.postPayURL
					.replace("{record_id}","record_id="+record.record_id)
					.replace("{promo_id}","promo_id="+record.promo_id); 
			}
		}
		
		app.refresh(2); 
		app.cards(); // will refresh/open records view as needed;
	}
	
	return main;
}