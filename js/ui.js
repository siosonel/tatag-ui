var User, currAcctItem='', Resources={};

$('#accountsWrapper').click(toggleAcctItem);
$('#txnForm').click(formClick);

var api = apiClass({
	'userid': '21', 
	'pass': 'pass2',
	'baseURL': '/tatag' //will be used as prefix
});

api.init('/')
.then(loadUser)
.then(setUserAccounts, errHandler);

function loadUser(res) {
	return api.loadType('user');
}

function setUserAccounts(res) {
	User = res; 
	User.userAccounts = api.byId[User.links.userAccounts];
	User.userAccounts.items.map(listAccounts);
}

function listAccounts(acct) {
	var wrapperId = "acct-"+ acct.account_id,
		alias = acct.alias ? acct.alias : acct.account_name,
		acctname = alias==acct.account_name ? "" : acct.account_name;
	
	Resources[wrapperId] = acct;
	
	//will make test conditions simpler
	if (!acct.relay) acct.relay = {};
	if (!acct.links) acct.links = {};
	
	
	$('#accountsWrapper').append("<div class='large-12 acctItem' id='"+wrapperId+"'>"
	+ "<div class='row' style='margin-bottom:30px;' id='"+ wrapperId +"-label'>"
	+ 	"<div class='large-8 medium-8 small-8 columns acctLabel'>"
	+			"<img id='"+ wrapperId +"-img' class='left' src='http://placehold.it/25x25&text=[img]'/>"
	+ 		"<span style='vertical-align:top'>&nbsp;"+alias+"</span><br />"
	+     "<span id='"+ wrapperId +"-name' style='font-weight:normal; display: none;'>&nbsp;#"+acct.account_id +' '+acctname+"</span>"
	+		"</div>"
	+ 	"<div class='large-4 medium-4 small-4 columns acctBal'>"+ (acct.sign*acct.balance).toFixed(2) +"</div>"
	+ "</div>"
	+ "<div class='row acctFormDiv' id='"+ wrapperId +"-forms'>"
	+ 	"<div class='large-8 medium-8 small-8 columns'>"
	//+			"<span>Relay:</span><br />"
	//+ 		"<h1>"+ acct.holder_id +"-"+ acct.limkey +"</h1><br />"
	+			"<a href=''>Review</a> | <a href=''>Edit</a><br />"
	+			"<img id='"+ wrapperId +"-viz' class='left' src='http://placehold.it/300x150&text=[img]'/>"
	+		"</div>"
	+ 	"<div class='large-4 medium-4 small-4 columns'>"
	+ 		((acct.relay['add-budget'] || acct.links['add-budget']) ? "<button style='width:100px;' id='"+wrapperId+"-add'>Add</button><br />" : "")
	+ 		((acct.relay['transfer-budget'] || acct.links['transfer-budget']) ? "<button id='"+wrapperId+"-transfer' style='width:100px; padding-left: 1.3rem;'>Transfer</button><br />" : "")
	+			((acct.relay['use-budget'] || acct.links['use-budget']) ? "<button id='"+wrapperId+"-use' style='width:100px'>Use</button><br />" : "")
	+		"</div>" 	
	+ "</div>"
	+ "</div>");
}

function errHandler(err) {
	console.log(err)
}

function toggleAcctItem(e) {
	if (e.target.tagName.toUpperCase()=='BUTTON') {showForm(e.target.id); return;}
	if (e.target.tagName.toUpperCase()=='A') return false;
	if (e.target.className.search('acctItem') == -1) return; 
	
	$('#'+currAcctItem).animate({height: '50px'});
	$('#'+currAcctItem+'-forms').css('display', 'none');
	$('#'+currAcctItem+'-label').css('font-weight', 'normal');
	$('#'+currAcctItem+'-img').animate({height:'25px', width:'25px'});
	$('#'+currAcctItem+'-name').css('display', 'none');
	
	if (currAcctItem==e.target.id) {currAcctItem = '';}
	else {
		currAcctItem =  e.target.id;
		$('#'+currAcctItem).animate({height: '300px'});	
		$('#'+currAcctItem+'-forms').css('display', 'block');
		$('#'+currAcctItem+'-label').css('font-weight', '700');
		$('#'+currAcctItem+'-img').animate({height:'50px', width:'50px'});
		$('#'+currAcctItem+'-name').css('display','inline');
	}
}

function showForm(id) {
	var arr = id.split("-"), action=arr.pop(), wrapperId = arr.join("-");
	var relay = Resources[wrapperId].relay[action+'-budget'];
	var form = api.byId[Resources[wrapperId].links[action+'-budget']];
	
	if (relay && form) $('#txnFormContent').html(renderTxnForm(form, Resources[wrapperId]) +"<hr/><span><i>-- OR --</i></span>" + renderTxnRelay(relay));
	else if (relay) $('#txnFormContent').html(renderTxnRelay(relay))
	else $('#txnFormContent').html(renderTxnForm(form, Resources[wrapperId]))
	
	$('#txnForm').foundation('reveal','open');
}

function renderTxnForm(form, Resource) {
	var elems="", inputs = form.inputs.required.concat(form.inputs.optional);

	for(var i=0; i<inputs.length; i++) {
		var name = inputs[i], disabled="", value="";
		if (name=='from') {
			disabled="disabled='disabled'";
			value=Resource.relay['default'];
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

function renderTxnRelay(relay) {
	return "<span><br/><br/>Authorize the transaction originator with this 'to' value:<br/><br/><h1>"+ relay +"</h1></span>";
}

function formClick(e) {
	if (e.target.id != 'form-submit') return;
	
	action = {target:'/budget/104/issued', method:'post', inputs:{}};
	$('#txnForm').foundation('reveal','close');
	$('input','#txnForm').map(function (i,elem) {action.inputs[elem.id.split('-')[1]] = elem.value});
	api.request(action)
}
