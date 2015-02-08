function walletForms(api) {
	var currResource, currForm, currInputs;
	
	function main(arg, action) {
		if (typeof arg=='string') {
			var arr = arg.split("-"), action=arr.pop(), wrapperId = arr.join("-");
			currResource = app.resources[wrapperId];
		}
		else currResource = arg; //console.log(currResource); console.log(api.byId); console.log(action);
		
		var relay = currResource.relay['budget-'+action];
		currForm = api.byId[currResource.links['budget-'+action]];
		
		if (arguments.length==1 && relay && currForm) $('#txnFormContent').html(
			renderForm(action) +"<hr/><span><i>-- OR --</i></span>" + renderRelay(relay)
		);
		else if (arguments.length==1 && relay) $('#txnFormContent').html(renderRelay(relay));
		else $('#txnFormContent').html(renderForm(action));
		
		$('#txnForm').foundation('reveal','open');
	}
	
	function renderForm(action) {
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
		return "<span><br/><br/>Authorize the transaction originator with this 'to' value:<br/><br/><h1>"+ relay +"</h1></span>";
	}
	
	main.add = renderInputs
	main.transfer = renderInputs
	main.use = renderInputs
	
	main.unadd = renderReverse
	main.untransfer = renderReverse
	main.unuse = renderReverse

	main.formClick = function formClick(e) {
		if (e.target.id != 'form-submit') return;
		
		action = {target:'/budget/issued?brand_id='+ currResource.brand_id, method:'post', inputs:{}};
		$('#txnForm').foundation('reveal','close');
		currInputs.map(function (inputName) {action.inputs[inputName] = $('#form-'+inputName).val()}); console.log(action.inputs)
		api.request(action).done(function (res) {console.log(res)}, app.errHandler)
	}
	
	return main;
}