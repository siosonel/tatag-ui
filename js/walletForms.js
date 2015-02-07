function walletForms(api) {
	function main() {}

	main.showTxnForm = function showTxnForm(arg, action) {
		if (typeof arg=='string') {
			var arr = arg.split("-"), action=arr.pop(), wrapperId = arr.join("-");
			var resource = app.resources[wrapperId];
		}
		else resource = arg; console.log(resource); console.log(api.byId); console.log(action);
		
		var relay = resource.relay[action+'-budget'];
		var form = api.byId[resource.links[action+'-budget']];
		
		if (arguments.length==1 && relay && form) $('#txnFormContent').html(
			main.renderTxnForm(form, resource) +"<hr/><span><i>-- OR --</i></span>" + main.renderTxnRelay(relay)
		);
		else if (arguments.length==1 && relay) $('#txnFormContent').html(main.renderTxnRelay(relay));
		else $('#txnFormContent').html(main.renderTxnForm(form, resource));
		
		$('#txnForm').foundation('reveal','open');
	}

	main.renderTxnForm = function renderTxnForm(form, resource) {
		var elems="", inputs = form.inputs.required.concat(form.inputs.optional);

		for(var i=0; i<inputs.length; i++) {
			var name = inputs[i], disabled="", value="";
			if (name=='from') {
				disabled="disabled='disabled'";
				value=resource.relay['default'];
			}
			
			if (name != 'note') elems += "\n<div id='"+name+"' class='columns large-4 medium-4 small-4'>"
				+ "<label>"+name+"<input type='text' id='form-"+ name +"' value='"+value+"' "+disabled+"/></label>"
				+ "</div>";
			
			else elems += "\n<div id='"+name+"' class='columns large-12 medium-12 small-12'>"
				+ "<label>"+name+"<input type='text' id='form-"+ name +"' placeholder='' /></label>"
				+ "</div>";
		}
		
		return "<h4>"+form.title+"</h4>"
			+"<form><div class='row'>"+elems+"</div></form>"
			+"<button id='form-submit'>Submit</button>"
	}
	
	main.renderTxnRelay = function renderTxnRelay(relay) {
		return "<span><br/><br/>Authorize the transaction originator with this 'to' value:<br/><br/><h1>"+ relay +"</h1></span>";
	}

	main.formClick = function formClick(e) {
		if (e.target.id != 'form-submit') return;
		
		action = {target:'/budget/104/issued', method:'post', inputs:{}};
		$('#txnForm').foundation('reveal','close');
		$('input','#txnForm').map(function (i,elem) {action.inputs[elem.id.split('-')[1]] = elem.value});
		api.request(action).done(function (res) {console.log(res)}, app.errHandler)
	}
	
	return main;
}