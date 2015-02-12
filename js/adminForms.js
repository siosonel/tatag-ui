function adminForms(api) {
	var currResource, currType, currForm, currInputs;

	function main(divId, type, formURL, altType) {
		currResource = app.resources[divId]; 
		currType = type;
		currForm = api.byId[formURL];	
		currAltType = altType ? altType : "";
		
		renderForm();
		$('#'+type+'Modal').foundation('reveal','open');
	}
	
	function renderForm() { 
		currInputs = currForm.inputs.required.concat(currForm.inputs.optional);		
		currInputs.map(renderInput);
	}
	
	function renderInput(inputName) {	
		$('#'+currType+'-'+inputName).val(currResource[inputName]);
	}
	
	main.clickHandler = function formClick(e) {		
		if (e.target.id.search('-cancel')!=-1) {$('#'+currType+'Modal').foundation('reveal','close'); return;}
		if (e.target.id.search('-submit')==-1) return;
		
		var query = {};
		if (currForm.query) currForm.query.required.map(function (param) {query[param] = currResource[param]});
		
		action = {
			target: currForm.target ? currForm.target : currResource['@id'], 
			query: query,
			method:'post', 
			inputs:{}
		};
		
		$('#'+currType+'Modal').foundation('reveal','close');
		
		currInputs.map(function (inputName) {
			action.inputs[inputName] = $('#'+currType+'-'+inputName).val();
		}); //console.log(action); //return;
		
		api.request(action).then(main.refreshViews, app.errHandler);
	}
	
	main.refreshViews = function (res) {
		app.refresh(2); 
		app[currAltType ? currAltType : currType](); // will refresh/open records view as needed;
	}
	
	return main;
}