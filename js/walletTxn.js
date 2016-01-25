function walletTxn(api) {
	var currResource, currForm, currInputs;
	var currAction, currRelay, params;
	
	function main(arg, term) {		
		params = app.params();
	
		var arr = arg.split("-"), action=arr.pop(), wrapperId = arr.join("-");
		
		currAction = action;
		currResource = app.resources[wrapperId]; //console.log(action+' '+arguments.length);
		
		if (!term) var term = currResource.holder_id ? '' : '';
		
		currRelay = currResource.relayDefault && currResource.relayDefault.for.indexOf(action)!=-1 
			? currResource.relayDefault.token : null; 

		$('#expenseSelectDiv').css('display', currAction=='use' ? 'block' : 'none');
		
		if (!currResource[term+action]) processForm(null);
		else api.loadId(currResource[term+action]).then(processForm, app.errHandler);
	}
	
	function processForm(res) {
		currForm = res;
		renderForm(currAction);
		renderRelay(currRelay);		
		$('#txnModal').foundation('reveal','open');
	}
	
	function renderForm(action) {
		if (!currForm) {$('#txnForm').css('display','none'); return;} 
		
		$('#txnForm').css('display','block');
		currInputs = currForm.inputs.required.concat(currForm.inputs.optional);
		$('#txn-title').html(params.brand ? "Pay "+params.brand : currForm.title);	
		currInputs.map(main[action]);
	}
	
	function renderInputs(inputName) {
		var val = ['to','amount','note'].indexOf(inputName)!=-1 && params[inputName] ? params[inputName]
			: inputName=='from' ? currResource.relayDefault.token
			: inputName=="to" ? getToRelay() 
			: $('#txn-'+inputName).val() ? $('#txn-'+inputName).val()
			: ""; 
			
		var disabled = inputName=='from' ? true : false;
	
		$('#txn-'+inputName).val(val);
		$('#txn-'+inputName).prop('disabled', disabled);
		
		if (inputName=='to') $('#txnToDiv').css('display','inline-block');
		else if (inputName=='from') $('#txnFromDiv').css('display','none');
		else if (inputName=='amount' && params.to && !params.amount) {
			main.matchPromo(); 
		}  
	}
	
	function renderReverse(inputName) { console.log(inputName)
		var val = inputName=='to' ? currResource.relayDefault.token
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
			? "Authorize the refund with this recipient token"
			: "Authorize the transaction originator with this recipient token";
		
		$('#relayInfo')
			.html(optionText
				+"<span><br/><br/>"+ promptText +":<br/><br/>"
				+"<h1>"+ relay +"</h1><button class='medium' id='postRelayBtn'>Check Records</button></span>"
			)
			.css('display','block');
	}
	
	//used only if there is no to-relay info available
	function getToRelay() {
		var accts = api.byType.userAccounts.items;
		if (!accts || !accts.length || currAction=='use') return "";
		
		var sign = currAction=='transfer' ? currResource.sign : -1*currResource.sign;		
		
		for(var i=0; i<accts.length; i++) {
			var acct = accts[i];
			
			if (acct.account_id != currResource.account_id && acct.sign == sign) {
				if (acct.relayDefault.token) return acct.relayDefault.token
			}
		}
		
		return "";
	}

	function setFormTarget(form, inputs, resource) {
		var url = form.target ? form.target : resource ? resource['@id'] : '';
		
		if (!url) return '';
		if (!form.query) return url;
		var q=form.query.required, p = {};
		
		for(var i in q) {
			if (q[i] in inputs) p[q[i]] = inputs[q[i]];
			else {
				var prop = q[i].split('-'), val=resource;
				
				for(var j in prop) {
					val = val[prop[j]];
				}
			
				p[q[i]] = val;
			}
		}
		
		var param = $.param(p);
		return !param ? '' : url.search(/\?/)==-1 ? url + '?'+param : url + '&'+param;
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
		if (e.target.id.search('-cancel')!=-1) {
			$('#txnModal').foundation('reveal','close');
			if (params.postPayURL) window.close(); /*window.location.href = params.postPayURL
					.replace("{record_id}","record_id=0")
					.replace("{promo_id}","promo_id=0");*/
		}
		
		if (e.target.id != 'txn-submit') return;
		
		var isReversal = currInputs.indexOf('orig_record_id')!=-1;
		//currForm.query.required.map(function (param) {query[param] = currResource[param]});
		
		$('#txnModal').foundation('reveal','close');
		var inputs = {};

		currInputs.map(function (inputName) {
			inputs[inputName] = $('#txn-'+inputName).val();
			if (inputName=='amount' && isReversal && 1*inputs[inputName]>0) inputs[inputName] = -1*inputs[inputName];
		});
		
		action = {
			target: setFormTarget(currForm, inputs, currResource),
			//query: query,
			method:'post', 
			inputs: inputs
		};

		api.request(action).then(main.refreshViews, app.errHandler);
	}
	
	main.refreshViews = function (res) {
		if (params.postPayURL) {
			var record = res['@graph'][0];
			var mssg = record ? "Your payment was processed successfully." : res.error;
			alert(mssg);
			window.close();
			
			/*
			var goback = confirm(mssg +' Do you want to reload the previous page?');
	
			if (goback) {			
				window.location.href = params.postPayURL
					.replace("{record_id}","record_id="+record.record_id)
					.replace("{promo_id}","promo_id="+record.promo_id); 
			}*/
		}
		
		app.refresh(2); 
		app.budgets(); // will refresh/open records view as needed;
	}
	
	main.matchPromo = function () {
		var to = $('#txn-to').val();
		if (!to || to.search('-')==-1 || !isNaN(to.split('-')[0])) return;
		
		var searchForm = api.byType.user;
		
		api.loadId(app.api.byType['user'].promoSearch)
			.then(fillPromoSearchForm, main.errHandler);
	}
	
	function fillPromoSearchForm(res) {
		//need to think this through better
		action = {
			target: res.target, 
			query: {"for": $('#txn-to').val()},
			method:'get', 
			inputs:null
		};
		
		api.request(action).then(usePromoInfo, app.errHandler);
	}
	
	function usePromoInfo(res) {
		if (!res.items.length) {
			$('#txn-title').html('Use Budget');
			return;
		}
		
		var promo = res.items[0];
		$('#txn-amount').val(promo.amount.toFixed(2));
		$('#txn-title').html('Pay <b>'+ promo.brand_name +'</b>');
	}
	
	return main;
}