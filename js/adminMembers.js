function adminMembers(api) {
	var currURL, currResource;
	
	function main(brand) {
		if (brand) currBrand = brand; console.log(currBrand)
		if (!currBrand || app.currView != 'members') return;
		app.currView = 'members';
		
		var url = currBrand.links.brandMembers;		
		$('#membersWrapper').children().remove();
		$('#membersWrapper').append(setTitle(currBrand))
		
		$('#brandsWrapper').animate({left: '-485px'});
		$('#membersWrapper').animate({left: '0px'});

		//refresh info as needed using second argument to loadId
		api.loadId(url, app.refresh()).then(renderMembers, app.errHandler)
	}
	
	function setTitle() {
		$('#membersWrapper').append(
			"<div id='brandItemsHeading' class='row brandItem' style='margin: 5px;'>"
			+		"<div class='large-2 medium-2 small-2 columns'>Joined</div>"
			+ 	"<div class='large-7 medium-7 small-7 columns' style='text-align: left; margin-bottom:10px;'>"
			+ 		"Member Information"
			+		"</div>"
			+ 	"<div class='large-3 medium-3 small-3 columns' style='text-align: right;'>Hours/Week</div>"
			+'</div>'
		);
	}
	
	function renderMembers(members) {
		members.items.map(renderItem)
	}
	
	function renderItem(member) { //console.log(member)
		var date = member.created.split(' ')[0].split('-');
		var divId = 'member-'+ member.member_id; //console.log(divId)
		
		$('#membersWrapper').append(
			"<div id='"+divId+"' class='row brandItem' style='margin: 5px;'>"
			+		"<div class='large-2 medium-2 small-2 columns'>"+ date[1] +'/'+ date[2] +"<br/>"+ date[0] +"</div>"
			+ 	"<div class='large-7 medium-7 small-7 columns' style='text-align: left; margin-bottom:10px;'>"
			+ 		member.name+"<br />#"+member.member_id+', '+ member.role
			+		"</div>"
			+ 	"<div class='large-3 medium-3 small-3 columns' style='text-align: right;'>"+ member.hours +"</div>"
			+ 	"<div id='"+divId+"-toggle' class='memberDivToggle'>&#9660;&#9660;&#9660;</div>"
			+'</div>'
		)
	}
	
	return main;
}