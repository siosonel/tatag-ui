function walletEdit(api) {
	var currResource, currForm, currId;

	function main(id) {
		if (id) currId = id;
	
		var arr = currId.split("-"), 
			action = arr.length==3 ? arr.pop() : "", 
			recordDivId = arr.join("-");
				
		currResource = app.resources[recordDivId]; //console.log(currId); console.log(currResource);		
		renderAcctForm(action);
		renderRecordForm(action);
		
		$('#editModal').foundation('reveal','open');
	}
	
	function renderAcctForm(action) {
		if (currResource['@type']!='userAccount') {		
			$('#editForm').css('display','none'); return;
		}
		
		currForm = !currResource.links ? null : api.byId[currResource.links['holder-edit']];
		currInputs = currForm.inputs.required.concat(currForm.inputs.optional);
		$('#edit-alias').val(currResource.alias);
		$('#edit-limkey').val(currResource.limkey);		
		$('#editForm').css('display','block');
	}
	
	function renderRecordForm(action) {
		if (currResource['@type']!='accountRecord') {		
			$('#editPrompt').css('display','none'); return;
		}
		
		currForm = !currResource.links ? null : api.byId[currResource.links['record-'+action]];
		currInputs = currForm.inputs.required.concat(currForm.inputs.optional);
		
		var text = action=='hold' ? "Hold the record for manual (instead of autoamted) approval or rejection?"
			: action=="approve" ? "Manually approve the record?"
			: action=="reject" ? "Manually reject the transaction?"
			: "unknown action='"+ action +"'";
		
		var status = {hold:5, approve: 7, reject:-10};
		
		$('#editRecordConfirm').html(text);
		$('#edit-status').val(status[action]);
		$('#editPrompt').css('display','block');
	}
	
	main.formClick = function formClick(e) {
		if (e.target.id != 'edit-submit' && e.target.id != 'editRecord-submit') return;
		
		var params = [];
		currForm.query.required.map(function (param) {params.push(param +'='+ currResource[param])});
		params = '?' + params.join('&');
		
		action = {
			target: currForm.target ? currForm.target + params : currResource['@id'], 
			method:'post', 
			inputs:{}
		};
		
		$('#editModal').foundation('reveal','close');
		
		currInputs.map(function (inputName) {
			action.inputs[inputName] = $('#edit-'+inputName).val();
			if (inputName=='status') action.inputs[inputName] = 1*action.inputs[inputName];
		}); //console.log(action); //return;
		
		api.request(action).then(main.refreshViews, app.errHandler);
	}
	
	main.refreshViews = function (res) {
		app.refresh(2); 
		app.cards(); // will refresh/open records view as needed;
	}
	
	return main;
}