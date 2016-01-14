function walletEdit(api) {
	var currResource, currForm, currId, currAction, idPrefix;

	function main(id) {
		if (id) currId = id;
	
		var arr = currId.split("-"), 
			action = arr.length==3 ? arr.pop() : "", 
			recordDivId = arr.join("-");
				
		currResource = app.resources[recordDivId];
		currAction = action;
		
		renderAcctForm(action);
		api.loadId(currResource[action]).then(renderRecordForm);
		renderRelayForm(action);
		
		$('#editModal').foundation('reveal','open');
	}
	
	function renderAcctForm(action) {
		if (currResource['@type']!='userAccount') {		
			$('#editBudget').css('display','none'); return;
		}
		
		currForm = api.byId[currResource['holder-edit']];
		currInputs = currForm.inputs.required.concat(currForm.inputs.optional);
		$('#edit-alias').val(currResource.alias);
		$('#edit-limkey').val(currResource.limkey);		
		$('#editBudget').css('display','block');
		idPrefix = 'edit-';
		$('#editRelayId').html(currResource.holder_id);
	}
	
	function renderRelayForm(action) {
		if (currResource['@type']!='relay' && currResource['@type']!='holderRelays') {		
			$('#editRelay').css('display','none'); return;
		}
		
		currForm = currResource['@type']=='holderRelays' 
			? api.byId[currResource['add']]
			: api.byId[currResource['edit']];
			
		if (currForm) {
			currInputs = currForm.inputs.required.concat(currForm.inputs.optional);
			for(var i=0; i<currInputs.length; i++) {
				if (currResource[currInputs[i]]) $('#editRelay-'+currInputs[i]).val(currResource[currInputs[i]]);
			}
		}
		
		$('#editRelay').css('display','block');
		idPrefix = 'editRelay-';
	}
	
	function renderRecordForm(form, action) {
		if (!action) var action = currAction;
	
		if (currResource['@type']!='accountRecord') {		
			$('#editRecord').css('display','none'); return;
		}
		
		currForm = form;
		currInputs = currForm.inputs.required.concat(currForm.inputs.optional);
		
		var text = action=='hold' ? "Hold the record for manual (instead of automated) approval or rejection?"
			: action=="approve" ? "Manually approve the record?"
			: action=="reject" ? "Manually reject the transaction?"
			: "unknown action='"+ action +"'";
		
		var status = {hold:5, approve: 7, reject:-10};
		
		$('#editRecordConfirm').html(text);
		$('#edit-status').val(status[action]);
		$('#editRecord').css('display','block');
		$('#editRelayPrefix').html(currResource.relayPrefix);
		idPrefix = 'edit-';
	}
	
	main.formClick = function formClick(e) {
		if (e.target.id.search('-cancel')!=-1) {$('#editModal').foundation('reveal','close'); return;}
		if (e.target.id != 'edit-submit' && e.target.id != 'editRecord-submit' && e.target.id != 'editRelay-submit') return;
		
		var params = [];
		if (currForm.query && currForm.query.required) currForm.query.required.map(function (param) {params.push(param +'='+ currResource[param])});
		params = '?' + params.join('&');
		
		action = {
			target: currForm.target ? currForm.target + params : currResource['@id'], 
			method:'post', 
			inputs:{}
		};
		
		$('#editModal').foundation('reveal','close');
		
		currInputs.map(function (inputName) {		
			action.inputs[inputName] = $('#'+idPrefix+inputName).val();
			if (inputName=='status') action.inputs[inputName] = 1*action.inputs[inputName];
		}); //console.log(action); //return;
		
		api.request(action).then(main.refreshViews, app.errHandler);
	}
	
	main.refreshViews = function (res) {
		app.refresh(2); 
		if (currResource['@type']=='relay' || currResource['@type']=='holderRelays') app.relays(); 
		else app.budgets(); // will refresh/open records view as needed;
	}
	
	return main;
}