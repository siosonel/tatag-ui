function homeViz(api) {
	var currUser, currResource, currCollection;	
	var arrowViz, chordViz;
	
	function main(user) {
		if (user) currUser = user; 
		if (!currUser || app.currView != 'viz') return;
		
		app.currView = 'viz';
		
		if (!arrowViz) {
			arrowViz = $('#vizWrapper').append(			
				"<div id='arrowFrameDiv' class='panel'>"
				+	"<iframe id='arrowFrame' src='"+location.origin+"/viz/arrow.php' width='100%' height='610px' scrolling='no' frameborder='no'></iframe>"
				+"</div>"
			)
			
			chordViz = $('#vizWrapper').append(
				"<div id='chordFrameDiv' class='panel'>"
				+	"<iframe id='chordFrame' src='"+location.origin+"/viz/chord_m.php' width='100%' height='700px' scrolling='no' frameborder='no'></iframe>"
				+"</div>"
			);
		}
		
		app.adjustHeight();
	}
	
	return main;
}