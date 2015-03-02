function adminForms(api) {
	var currResource, currType, currAltType, currForm, currInputs;

	function main(div, type, formURL, altType) {
		currResource = typeof div=='string' ? app.resources[div] : div;
		currType = type;
		currForm = api.byId[formURL];
		currAltType = altType ? altType : "";
		
		renderForm();
		$('#'+currType+'-formTitle').html(currForm.title); 
		$('#'+currType+'Modal').foundation('reveal','open');
	}
	
	function renderForm() { 
		currInputs = currForm.inputs.required.concat(currForm.inputs.optional);				
		currInputs.map(renderInput);		
	}
	
	function renderInput(inputName) {	//console.log(inputName+ '#'+currType+'-'+inputName + currResource[inputName])
		if (currResource[inputName] || ['ended', 'joined', 'revoked'].indexOf(inputName) == -1) 
			var val = currResource[inputName];
			
		else var date = new Date(), 
				d=(""+date).split(' '), 
				m=date.getMonth()+1, 
				val = d[3]+'-'+m+'-'+d[2]+' '+d[4];
		
		$('#'+currType+'-'+inputName).val(val);
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
		}); //console.log(action); return;
		
		api.request(action).then(main.refreshViews, app.errHandler);
	}
	
	main.refreshViews = function (res) { //console.log(currAltType+' '+currType); console.log(currResource);
		app.refresh(currType=='revoke' ? 1 : 2); 
		app[currAltType ? currAltType : currType](); // will refresh/open records view as needed;
	}
	
	return main;
}