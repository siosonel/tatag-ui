function homeAbout(api) {
	var currUser, currResource, currCollection;	
	var arrowViz, chordViz;
	
	function main(user) { //console.log(app.currView);
		if (user) currUser = user; 
		if (!currUser || app.currView != 'about') return;
		
		app.currView = 'about';
		app.adjustHeight();
	}
	
	return main;
}