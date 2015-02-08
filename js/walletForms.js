function walletForms(api) {
	var currResource, currForm, currInputs;
	
	function main(arg) {		
		var arr = arg.split("-"), action=arr.pop(), wrapperId = arr.join("-");
		currResource = app.resources[wrapperId]; //console.log(currResource); console.log(api.byId); console.log(action+' '+arguments.length);
		
		var relay = !currResource.relay ? null : currResource.relay['budget-'+action];
		currForm = !currResource.links ? null : api.byId[currResource.links['budget-'+action]];
		
		renderForm(action);
		renderRelay(relay);		
		$('#modalDiv').foundation('reveal','open');
	}
	
	function renderForm(action) {
		if (!currForm) {$('#txnForm').css('display','none'); return;}
		
		$('#txnForm').css('display','block');
		currInputs = currForm.inputs.required.concat(currForm.inputs.optional);		
		$('#form-title').html(currForm.title);	
		currInputs.map(main[action]);
	}
	
	function renderInputs(inputName) {
		var val = inputName=='from' ? currResource.relay['default'] : "";
		var disabled = inputName=='from' ? true : false;
	
		$('#form-'+inputName).val(val)
		$('#form-'+inputName).prop('disabled', disabled)
	}
	
	function renderReverse(inputName) {
		var val = inputName=='to' ? currResource.relay['default'] 
			: inputName=='orig_record_id' ? currResource['orig_record_id'] 
			: "";
			
		var disabled = inputName=='to' ? true : false;
	
		$('#form-'+inputName).val(val)
		$('#form-'+inputName).prop('disabled', disabled)
	}
	
	function renderRelay(relay) {		
		if (!relay) {$('#relayInfo').css('display','none'); return;}
		
		var optionText = currForm ? "<hr/><span><i>-- OR --</i></span>" : "";
		var promptText = currResource.record_id 
			? "Authorize the reversal with this 'from' value"
			: "Authorize the transaction originator with this 'to' value";
		
		$('#relayInfo')
			.html(optionText+"<span><br/><br/>"+ promptText +":<br/><br/><h1>"+ relay +"</h1></span>")
			.css('display','block');
	}
	
	main.add = renderInputs
	main.transfer = renderInputs
	main.use = renderInputs
	
	main.unadd = renderReverse
	main.untransfer = renderReverse
	main.unuse = renderReverse

	main.formClick = function formClick(e) {
		if (e.target.id != 'form-submit') return;
		
		var params = [];
		currForm.query.required.map(function (param) {params.push(param +'='+ currResource[param])});
		params = '?' + params.join('&');
		
		action = {
			target: currForm.target + params, 
			method:'post', 
			inputs:{}
		};
		
		$('#modalDiv').foundation('reveal','close');
		currInputs.map(function (inputName) {action.inputs[inputName] = $('#form-'+inputName).val()}); //console.log(action); return;
		api.request(action).done(function (res) {console.log(res)}, app.errHandler)
	}
	
	return main;
}