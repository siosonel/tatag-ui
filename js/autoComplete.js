function autoComplete(opts) {
	var priv = {};
	var lastText, currText;
	var $input, $matchedDisplay, $currItem;
	var defaults = {
		source: [],
		minLength: 2,
		delimiter: ';',
		bgHighlight: '#eeee99',
		stopChars: ['+','-']
	};
	
	
	function init() {
		$.extend(priv, defaults, opts);
		$input = $(opts.selector); 
		$input.parent().append("<ul id='autoCompleteMatchedDisplay' style='width:"+$input.width()+"'></ul>");
		$matchedDisplay = $('#autoCompleteMatchedDisplay');
		$matchedDisplay.click(selectItem);
		
		$(document).on("keydown", navigateList);
	}
	
	function main(e) {
		$matchedDisplay.children().remove();
		if (!e || !e.target) return;
		
		segments = e.target.value.toLowerCase().split(priv.delimiter);
		lastText = segments.pop();
		if (!lastText || priv.stopChars.indexOf(lastText.slice(-1)) != -1) return;
		
		currText = lastText.replace(/\+/g,'').replace(/\-/g,'').trim();
		if (currText.length < priv.minLength) return;
		
		priv.source.map(listMatchedItems);	
	}
	
	function listMatchedItems(maybeText) {
		if (maybeText.search(currText)!=-1) $matchedDisplay.append("<li>"+ lastText.replace(currText,maybeText) +"</li>");
	}
	
	function selectItem(e) {
		if (e.target.tagName.toUpperCase()=='LI') {
			segments.push(e.target.innerHTML);
			$input.val(segments.join(priv.delimiter));
			$matchedDisplay.children().remove();
			$input.focus();
			$currItem=null;
		}
	}
	
	function navigateList(e) { 
		var $children = $matchedDisplay.children();
		if (!$children.length) return;
		
		if (e.which==13 || e.which==39) {
			if ($currItem) selectItem({target: $currItem.get()[0]});
		}
		else if (e.which==38) {
			if (!$currItem) $currItem = $children.last();
			else {
				$currItem.css('background-color', '');
				var $prev = $currItem.prev();
				$currItem = $prev.length ? $prev : null;
			}
			
			if ($currItem) $currItem.css('background-color', priv.bgHighlight);
		}
		else if (e.which==40) {
			if (!$currItem) $currItem = $children.first();
			else {
				$currItem.css('background-color', '');
				var $next = $currItem.next();
				$currItem = $next.length ? $next : null;
			}
			
			if ($currItem) $currItem.css('background-color', priv.bgHighlight);
		}
	}
	
	main.reset = main;
	
	init();
	return main;
}