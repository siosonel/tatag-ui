function adminMembers(api) {
	var currURL, currBrand, currCollection;
	
	function main(brand) {
		if (brand) currBrand = brand;
		if (!currBrand || app.currView != 'members') return;
		app.currView = 'members';
		
		var url = currBrand.links.brandMembers;		
		$('#membersWrapper').children().remove();
		$('#membersWrapper').append(setTitle(currBrand))
		
		$('#brandsWrapper').animate({left: '-100%'});
		$('#membersWrapper').animate({left: '0'});

		//refresh info as needed using second argument to loadId
		api.loadId(url, app.refresh()).then(renderMembers, app.errHandler)
	}
	
	function setTitle() {
		$('#membersWrapper').append(
			"<div class='subLabel'>"
			+	 "<span style='vertical-align:top; font-weight: 700;'>&#9668; "+currBrand.name+" members, </span>"
			+  "<span style='font-weight:normal;'>&nbsp; brand#"+ currBrand.brand_id +"</span>"
			+	 "<button id='addMember' class='right tiny'>+New Member</button>"
			+"</div>"
			+"<div id='brandItemsHeading' class='row brandItem' style='margin: 5px;'>"
			+		"<div class='large-2 medium-2 small-2 columns'>Joined</div>"
			+ 	"<div class='large-7 medium-7 small-7 columns' style='text-align: left; margin-bottom:10px;'>"
			+ 		"Member Information"
			+		"</div>"
			+ 	"<div class='large-3 medium-3 small-3 columns' style='text-align: right;'>Hours/Week</div>"
			+'</div>'
		);
	}
	
	function renderMembers(members) {
		currCollection = members;
		members.items.map(renderItem)
	}
	
	function renderItem(member) { //console.log(member)
		var date = member.created.split(' ')[0].split('-');
		var divId = 'member-'+ member.member_id; //console.log(divId)
		app.resources[divId] = member;
		
		$('#membersWrapper').append(
			"<div id='"+divId+"' class='row brandItem' style='margin: 5px;'>"
			+		"<div class='large-2 medium-2 small-2 columns'>"+ date[1] +'/'+ date[2] +"<br/>"+ date[0] +"</div>"
			+ 	"<div class='large-7 medium-7 small-7 columns' style='text-align: left; margin-bottom:10px;'>"
			+ 		member.name+"<br />#"+member.member_id+', '+ member.role +'&nbsp;'
			+			"<span class='fi-pencil small'>&nbsp;</span>"
			+			"<span href='"+member.links.accounts+"' style='text-decoration:underline'>accounts</span>"
			+		"</div>"
			+ 	"<div class='large-3 medium-3 small-3 columns' style='text-align: right;'>"+ member.hours +"</div>"
			//+ 	"<div id='"+divId+"-toggle' class='memberDivToggle'>&#9660;&#9660;&#9660;</div>"
			+'</div>'
		)
	}
	
	main.clickHandler = function (e) {		
		if (e.target.id=='addMember') {
			$('#members-user_id-row').css('display','block');
			app.forms(currCollection, 'members', '/forms#member-add');
			return;
		}
		
		$('#members-user_id-row').css('display','none');			
		var cls = e.target.className, pCls = e.target.parentNode.className, ppCls = e.target.parentNode.parentNode.className;
		
		if ([cls, pCls, ppCls].indexOf('subLabel')!=-1) { 
			app('membersWrapper'); return;
		}
		
		if ($(e.target).attr('href')) { console.log($(e.target).attr('href'));
			app.currView = 'memberAccounts';
			app.memberAccounts(app.resources[e.target.parentNode.parentNode.id]);
			return;
		}
		
		var divId = app.getDivId(e, 'member');
		if (!divId) return; console.log(divId);
		
		app.forms(divId, 'members', '/forms#admin-member-edit');
	}
	
	return main;
}