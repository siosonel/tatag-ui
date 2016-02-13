<div id='vizWrapper'></div>
<script src='/ui/js/homeViz.js'></script>
<script src='/ui/js/homeMain.js'></script>	

<script>	
	resize();
	$(window).resize(resize);
	
	function resize() {
		var width = $('body').width();
		$('#arrowFrame').attr('height', width<400 ? 710 : 610);
		$('#chordFrame').attr('height', width<400 ? 400 : width+100);
	}
</script>