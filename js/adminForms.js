function adminForms(api) {
	var currResource, currType, currAltType, currForm, currInputs;
	var defaultVals={}, tempVals={};
	var currAreaCode = 206;
	var dateInputs = ['ended', 'joined', 'revoked'];

	function main(div, type, form, altType, altFormTarget) {
		currResource = typeof div=='string' ? app.resources[div] : div; 
		currType = type;
		currForm = typeof form=='string' ? api.byId[form] : form;
		currAltType = altType ? altType : "";
		currForm.target = arguments.length==5 ? altFormTarget : null;
		
		renderForm();
		$('#'+currType+'-formTitle').html(currForm.title); 
		$('#'+currType+'Modal').foundation('reveal','open');
	}
	
	function renderForm() { 
		currInputs = currForm.inputs.required.concat(currForm.inputs.optional);				
		
		if (!defaultVals[currType]) {
			defaultVals[currType]={}; 
			currInputs.map(setDefaultVals);
		}
		
		if (currForm['@id'].toLowerCase().search('edit')!=-1) tempVals[currType] = {};
		else {
			if (!tempVals[currType]) tempVals[currType] = {};
			currInputs.map(setTempVals);
		}
		
		currInputs.map(renderInput);
	}
	
	function renderInput(inputName) {
		var val = inputName in currResource ? currResource[inputName]
			: inputName in tempVals[currType] ? tempVals[currType][inputName]
			: inputName in defaultVals[currType] ? defaultVals[currType][inputName]
			: dateInputs.indexOf(inputName) != -1 ? getDateStr()
			: null;
		
		if (inputName != 'score') $('#'+currType+'-'+inputName).val(val);
		
		if (currType=='about') {
			if (inputName=='type_system') main.setTypeOpts();
			else if (inputName=='country_code') main.setAreaCodes();
			else if (inputName=='area_code') currAreaCode = val;
		}
		else if (currType=='ratings') {
			if (inputName=='score' && typeof val=='number') {
				$('#ratings-slider').val(val);
				$('#ratings-score').val(val);
			}
		}
		else if ((currType=='accept' && inputName=='joined')
			|| (currType=='revoke' && inputName=='revoked')) {
			var date=new Date(), 
				y=date.getFullYear(), m=date.getMonth()+1, d=date.getDate();
				if (m<10) m='0'+m;
				if (d<10) d='0'+d;			
				
			$('#'+currType+'-'+inputName).val(y+'-'+m+'-'+d+' 00:00:00');
		}
	}
	
	function getDateStr() {
		var date = new Date(), d=(""+date).split(' '), m=date.getMonth()+1;
		return d[3]+'-'+m+'-'+d[2]+' '+d[4];
	}
	
	function setDefaultVals(inputName) {
		defaultVals[currType][inputName] = $('#'+currType+'-'+inputName).val();
	}
	
	function setTempVals(inputName) {
		tempVals[currType][inputName] = $('#'+currType+'-'+inputName).val();
	}

	main.currForm = function (form) {
		if (form) currForm = form;
	}
	
	main.clickHandler = function formClick(e) {		
		if (e.target.id.search('-cancel')!=-1) {$('#'+currType+'Modal').foundation('reveal','close'); return;}
		if (e.target.id.search('-submit')==-1) return;
		
		var query = {};
		if (currForm.query) currForm.query.required.concat(currForm.query.optional)
			.map(function (param) {
				if (param in currResource) query[param] = currResource[param];
				else if ($('#'+currType+'-'+param).length) query[param] = $('#'+currType+'-'+param).val();
			});
		
		action = {
			target: currForm.target ? currForm.target : currResource['@id'], 
			query: query,
			method: currForm.method, 
			inputs:{}
		};
		
		$('#'+currType+'Modal').foundation('reveal','close'); console.log(currForm)
		
		var errorMessages = [];

		currInputs.map(function (inputName) {
			action.inputs[inputName] = $('#'+currType+'-'+inputName).val();
			
			if (currForm.validate && currForm.validate[inputName]) { console.log(currForm.validate[inputName])
				for(var testType in currForm.validate[inputName]) {
					if (testType=='regex') {
						var regex = new RegExp(currForm.validate[inputName].regex.value);
						if (!regex.test(action.inputs[inputName])) errorMessages.push(currForm.validate[inputName].regex.errorMessage)
					}
				}
			}
		}); //console.log(action); return;
		
		if (errorMessages.length) alert(errorMessages.join(" "));
		else api.request(action).then(currForm.callBack ? currForm.callBack : main.refreshViews, app.errHandler);
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