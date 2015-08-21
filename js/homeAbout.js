function homeAbout(api) {
	var currUser, currResource, currCollection;	
	var arrowViz, chordViz;
	
	function main(user) {
		if (user) currUser = user; 
		if (!currUser || app.currView != 'about') return;
		
		app.currView = 'about';
	}
	
	return main;
}