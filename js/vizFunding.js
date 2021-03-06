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
		{id: "funding-team", top: 0.15, left: 0.25, opacity: 1, duration: 1500},
		{id: "funding-market", top: 0.15, left: 0.5, opacity: 1},
		{id: "funding-regulation", top: 0.15, left: 0.75, opacity: 1},

		{id: "funding-rightUpper", top: 0.55, left: 0, opacity: 1, html: "<h4>Tatag is a platform for recognizing value in what people do.</h4>"},
		{id: "funding-rightLower", top: 0.65, left: 0, opacity: 0, html: ""},

		{id: "funding-nextBtn", top: 0.45, left: 0.5, opacity: 1}
	],	
	[
		{id: "funding-team", top: 0.15, left: 0.25, opacity: 1, duration: 1500},
		{id: "funding-market", top: 0.15, left: 0.5, opacity: 0.5},
		{id: "funding-regulation", top: 0.15, left: 0.75, opacity: 0.5},

		{id: "funding-rightUpper", top: 0.45, opacity: 1, html: "<h4>Guaranteed Funding</h4>"},
		{id: "funding-rightLower", top: 0.55, left: 0, opacity: 1, html: 
			"<ul>"
			+ "<li>No need to compete for scarce funding.</li>"
			+ "<li>The challenge is in getting your funds accepted as payment by other teams.</li>"
			+ "<li>We'll actively recruit users after the testing period, so there'll be more teams to transact with.</li>"
			+ "</ul>"
		},
		{id: "funding-nextBtn", top: 0.35, left: 0.5, opacity: 1}
	],	
	[
		{id: "funding-team", top: 0.15, left: 0.25, opacity: 0.5, duration: 1500},
		{id: "funding-market", top: 0.15, left: 0.5, opacity: 1},
		{id: "funding-regulation", top: 0.15, left: 0.75, opacity: 0.5},

		{id: "funding-rightUpper", top: 0.45, opacity: 1, html: "<h4>Sustainable Markets</h4>"},
		{id: "funding-rightLower", top: 0.55, left: 0, opacity: 1, html: 
			"<ul>"
			+ "<li>Select an Advisor application that best fits your team's values.</li>"
			+ "<li>Reject payments from disreputable teams.</li>"
			+ "<li>Accept payments from reputable teams, especially those who are not viably funded through other means.</li>"
			+ "</ul>"
		},
		{id: "funding-nextBtn", top: 0.35, left: 0.5, opacity: 1}
	],	
	[
		{id: "funding-team", top: 0.15, left: 0.25, opacity: 0.5, duration: 1500},
		{id: "funding-market", top: 0.15, left: 0.5, opacity: 0.5},
		{id: "funding-regulation", top: 0.15, left: 0.75, opacity: 1},

		{id: "funding-rightUpper", top: 0.45, opacity: 1, html: "<h4>Rewarding Challenge</h4>"},
		{id: "funding-rightLower", top: 0.55, left: 0, opacity: 1, html: 
			"<ul>"
			+ "<li>Infrastructure: should Tatag's ledger be decentralized, and how?</li>"
			+ "<li>Reporting: auditable aggregation of hashed/chained reports + algorithm used.</li>"
			+ "<li>Advising: evaluate teams and offer real-time advise on whether to accept or reject a payment offer.</li>"
			+ "</ul>"
		},
		{id: "funding-nextBtn", top: 0.35, left: 0.5, opacity: 1}
	]
]);

$('#funding-nextBtn').click(vizFunding);


function vizMini(opts, elems) {
	var currIndex = -1;
	var maxWidth = 480, maxHeight = 100;
	var container;
	var divs;
	var duration = opts.duration;
	var paused = false;
	var jumpedId = '';
	var halfWidth = {};

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
		var hw = this.id in halfWidth ? halfWidth[this.id] : 0;
		return (maxWidth*d.left - hw) +'px';
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

		setTimeout(function () {		
			halfWidth = {
				'funding-team': 1*d3.select('#funding-team').style('width').replace('px','')/2,
				'funding-market': 1*d3.select('#funding-market').style('width').replace('px','')/2,
				'funding-regulation': 1*d3.select('#funding-regulation').style('width').replace('px','')/2,
				'funding-nextBtn': 1*d3.select('#funding-nextBtn').style('width').replace('px','')/2
			};

			main(0);
		}, 1000);
		
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

