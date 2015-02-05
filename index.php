<!DOCTYPE html>
<html>
<head>
	<title>Tatag UI</title>
	<link rel="stylesheet" href="css/normalize.css">
	<link rel="stylesheet" href="css/ui.css">
	
	<script type="text/javascript" src="/common2/lib/jQuery/jquery-1.8.2.min.js"></script>
	<script type="text/javascript" src="/node_modules/q/q.js"></script>
	<script type="text/javascript" src="js/apiClass.js"></script>
	
  <link rel="stylesheet" href="/common2/lib/foundation-5.3.3/css/foundation.min.css">
	<link rel="stylesheet" href="/common2/lib/foundation-5.3.3/icons/foundation-icons.css">
	
	<style></style>
</head>
<body>
	<div class="row">
		<div class='large-12' id='titleBar'><b>Wallet</b></div>
	</div>
	<div class="row" id='accountsWrapper'></div>

<script>
	var User, currAcctItem='';
	
	$('#accountsWrapper').click(toggleAcctItem);
	
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
			acctname = alias==acct.account_name ? "" : acct.account_name; console.log(wrapperId)
			
	
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
		+ 		"<a href=''>Review</a> | <a href=''>Edit</a>"
		+		"</div>"
		+ 	"<div class='large-4 medium-4 small-4 columns'>"
		+ 		(acct.authcode.search('c')==-1 ? "" : "<button style='width:100px;'>Add</button><br />")
		+ 		"<button style='width:100px; padding-left: 1.3rem;'>Transfer</button><br />"
		+			"<button style='width:100px'>Use</button><br />"
		+		"</div>" 	
		+ "</div>"
		+ "</div>");
	}
	
	function errHandler(err) {
		console.log(err)
	}
	
	function toggleAcctItem(e) {  //console.log(e.target.id+' '+e.target.className+' '+e.target.tagName); 
		if (e.target.tagName.toUpperCase()=='A') return false;
		if (e.target.className.search('acctItem') == -1) return; console.log(e.target.id+' '+e.target.className);
		
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
	
</script>
</body>
</html>