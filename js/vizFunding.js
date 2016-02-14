var vizFunding = vizMini({
		containerId: '#funding', 
		duration: 1500,
		jumpTo: {
			'funding-team': [1],
			'funding-market': [2],
			'funding-regulation': [3]
		}
},
[
	[
		{id: "funding-team", top: 0.15, left: 0.18, opacity: 1, duration: 1500},
		{id: "funding-market", top: 0.15, left: 0.45, opacity: 1},
		{id: "funding-regulation", top: 0.15, left: 0.7, opacity: 1},

		{id: "funding-rightUpper", top: 0.55, left: 0, opacity: 1, html: "<h4>Tatag is a platform for recognizing value in what people do.</h4>"},
		{id: "funding-rightLower", top: 0.65, left: 0, opacity: 0, html: ""},

		{id: "funding-nextBtn", top: 0.4, left: 0.44, opacity: 1}
	],	
	[
		{id: "funding-team", top: 0.15, left: 0.18, opacity: 1, duration: 1500},
		{id: "funding-market", top: 0.15, left: 0.45, opacity: 0.5},
		{id: "funding-regulation", top: 0.15, left: 0.7, opacity: 0.5},

		{id: "funding-rightUpper", top: 0.4, opacity: 1, html: "<h4>Guaranteed Funding</h4>"},
		{id: "funding-rightLower", top: 0.5, left: 0, opacity: 1, html: 
			"<ul>"
			+ "<li>No need to compete for scarce funding.</li>"
			+ "<li>The challenge is in getting your funds accepted as payment by other teams.</li>"
			+ "<li>We'll actively recruit users after the testing period, so there'll be more teams to transact with.</li>"
			+ "</ul>"
		},
		{id: "funding-nextBtn", top: 0.3, left: 0.44, opacity: 1}
	],	
	[
		{id: "funding-team", top: 0.15, left: 0.18, opacity: 0.5, duration: 1500},
		{id: "funding-market", top: 0.15, left: 0.45, opacity: 1},
		{id: "funding-regulation", top: 0.15, left: 0.7, opacity: 0.5},

		{id: "funding-rightUpper", top: 0.4, opacity: 1, html: "<h4>Sustainable Markets</h4>"},
		{id: "funding-rightLower", top: 0.5, left: 0, opacity: 1, html: 
			"<ul>"
			+ "<li>Reject payments from disreputable teams.</li>"
			+ "<li>Accept payments from reputable teams.</li>"
			+ "<li>Sell goods and services to other teams who are not viably funded through other means.</li>"
			+ "</ul>"
		},
		{id: "funding-nextBtn", top: 0.3, left: 0.44, opacity: 1}
	],	
	[
		{id: "funding-team", top: 0.15, left: 0.18, opacity: 0.5, duration: 1500},
		{id: "funding-market", top: 0.15, left: 0.45, opacity: 0.5},
		{id: "funding-regulation", top: 0.15, left: 0.7, opacity: 1},

		{id: "funding-rightUpper", top: 0.4, opacity: 1, html: "<h4>Rewarding Challenge</h4>"},
		{id: "funding-rightLower", top: 0.5, left: 0, opacity: 1, html: 
			"<ul>"
			+ "<li>Infrastructure: should Tatag's ledger be decentralized, and how?</li>"
			+ "<li>Reporting: auditable aggregation of hashed/chained reports + algorithm used.</li>"
			+ "<li>Advising: evaluate teams and offer real-time advise on whether to accept or reject a payment offer.</li>"
			+ "</ul>"
		},
		{id: "funding-nextBtn", top: 0.3, left: 0.44, opacity: 1}
	]
]).init(0);

$('#funding-nextBtn').click(vizFunding);


function vizMini(opts, elems) {
	var currIndex = -1;
	var maxWidth = 480, maxHeight = 100;
	var container;
	var divs;
	var duration = opts.duration;
	var paused = false;
	var jumpedId = '';

	function main(i) {
		if (!arguments.length) {
			if (!paused) currIndex++;
			else return;
		}
		else if (typeof i=='number') {
			currIndex=i;
		}
		else if (i.target && i.target.id=='vizFundingNext') {
			/*if (currIndex) paused = !paused; 
			else*/ currIndex++;

			/*if (paused) {
				$('#vizFundingNext').html('next &#9658'); //('play &#9658;');
				return;
			}*/			
		}
		else return;

		if (currIndex >= elems.length) currIndex=0;
		$('#vizFundingNext').html('next &#9658;'); //(currIndex ? 'pause ||' : 'play &#9658;');

		maxHeight = 1*container.style('height').replace('px','');
		maxWidth = 1*container.style('width').replace('px',''); 

		if ('duration' in elems[currIndex][0]) duration = elems[currIndex][0].duration; 

		divs.data(elems[currIndex])
			.html(html)
		.transition().duration(duration)
			.style('opacity', opacity)
			.style('top', top)
			.style('left', left);

		//if (currIndex!=0 && currIndex!=3) setTimeout(main, duration+1000);
	}

	function bindKey(d) {
		return d.id;
	}

	function html(d) {
		return 'html' in d ? d.html : this.innerHTML;
	}

	function top(d) {
		if (!d || !('top' in d)) return this.style.top;
		return maxHeight*d.top+'px';
	}

	function left(d) {
		if (!d || !('left' in d)) return this.style.left;
		return maxWidth*d.left+'px';
	}

	function opacity(d) {
		return d.opacity;
	}

	function jumpTo(e) {
		if (!e || !e.target) return;
		if (!e.target || !e.target.id) e.target = e.target.parentNode;
		if (!e.target.id || !(e.target.id in opts.jumpTo)) return;
		jumpedId = e.target.id;
		main(opts.jumpTo[jumpedId][0]);
	}

	main.init = function (ms) {
		if (arguments.length) duration = ms;

		container = d3.select(opts.containerId);
		divs = container.selectAll('.funding-wrapper');
		main(0);
		
		if (opts.jumpTo) {
			for(var id in opts.jumpTo) {
				$('#'+id).click(jumpTo)
			}
		}

		duration = opts.duration;
		return main;
	}

	return main;
}

