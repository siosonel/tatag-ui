function adminForms(api) {
	var currResource, currType, currAltType, currForm, currInputs;
	var currAreaCode = 206;

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
		
		if (currType=='about') {
			if (inputName=='type_system') main.setTypeOpts();
			else if (inputName=='country_code') main.setAreaCodes();
			else if (inputName=='area_code') currAreaCode = val;
		} 
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
	
	main.setTypeOpts = function (e) {
		app.params.system = $('#about-type_system').val();
		$('#about-type_id').children().remove();
		app.refs.types[app.params.system].types.map(setTypeIdOpt);
	}
	
	function setTypeIdOpt(d) {
		$('#about-type_id').append("<option value='"+ d.id +"'>"+ d.type +"</option>");
	}
	
	main.setLocOpts = function (e) {
		app.refs.byIso3 = {};
		$('#about-country_code').children().remove();
		locs.map(setLocOpt);
	}
	
	function setLocOpt(d) {
		if (!(d[3] in app.refs.byIso3)) app.refs.byIso3[d[3]] = d;
		$('#about-country_code').append("<option value='"+d[3]+"'>"+ d[0] +"</option>");
	}
	
	main.setAreaCodes = function () {
		app.params.iso3 = $('#about-country_code').val(); 
		if (!('areaCodesByLoc' in app.refs)) app.refs.areaCodesByLoc = {};
		
		if (app.params.iso3 in app.refs.areaCodesByLoc) setAreaCodeOpts(app.refs.areaCodesByLoc[app.params.iso3]);
		else $.ajax({
			url: app.api.baseURL + "/ref/area_codes/"+ app.params.iso3 +".json",
			error: function (xhr, status, text) {alert(status+': '+text);},
			success: setAreaCodeOpts
		})
	}
	
	function setAreaCodeOpts(response) {
		app.refs.areaCodesByLoc[app.params.iso3] = response;
		if (!('areaCodesByNum' in app.refs)) app.refs.areaCodesByNum = {};
		app.refs.areaCodesByNum[app.params.iso3] = {};
		
		$('#about-area_code').children().remove();		
		for(var loc in response) {
			$('#about-area_code').append("<option value='"+ response[loc] +"'>"+ loc +"</value>");
			app.refs.areaCodesByNum[app.params.iso3][response[loc]] = loc;
		}
		
		$('#about-area_code').val(currAreaCode);
	}
	
	return main;
}