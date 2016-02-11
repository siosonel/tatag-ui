var vizFunding = vizMini({
		containerId: '#funding', 
		duration: 1500,
		jumpTo: {
			'funding-team': [1,2,3],
			'funding-market': [4,5,6],
			'funding-regulation': [7,8,9]
		}
},
[
	[ // 0
		{id: "funding-leftUpper", top: 0.25, left: 0.1, opacity: 0, duration: 1500},
		{id: "funding-leftLower", top: 0.45, left: 0.1, opacity: 0},

		{id: "funding-team", top: 0.25, left: 0.46, opacity: 1},
		{id: "funding-market", top: 0.5, left: 0.45, opacity: 1},
		{id: "funding-regulation", top: 0.75, left: 0.45, opacity: 1},

		{id: "funding-rightUpper", top: 0.25, left: 0.67, opacity: 0},
		{id: "funding-rightLower", top: 0.45, left: 0.67, opacity: 0},
		
		{id: "funding-arrow", top: 0.6, left: 0.8, opacity: 0},		
		{id: "funding-funder", top: 0.8, left: 0.5, opacity: 0}
	],
	[ // 1
		{id: "funding-leftUpper", top: 0.25, left: 0.1, opacity: 1,  html: "Automatic, recurring funding issued as team budgets."},
		{id: "funding-leftLower", top: 0.45, left: 0.1, opacity: 0},

		{id: "funding-team", top: 0.25, left: 0.46, opacity: 1},
		{id: "funding-market", top: 0.5, left: 0.45, opacity: 0},
		{id: "funding-regulation", top: 0.75, left: 0.45, opacity: 0},

		{id: "funding-rightUpper", top: 0.25, left: 0.67, opacity: 1, html: "Scarce funding from lenders, investors, donors, etc."},
		{id: "funding-rightLower", top: 0.45, left: 0.67, opacity: 0},
		
		{id: "funding-arrow", top: 0.6, left: 0.8, opacity: 0},		
		{id: "funding-funder", top: 0.5, left: 0.8, opacity: 0}
	],
	[ // 2
		{id: "funding-leftUpper", top: 0.25, left: 0.1, opacity: 1},
		{id: "funding-leftLower", top: 0.45, left: 0.1, opacity: 1, html: "<span  class='funding-advantage'>Advantage<br/></span>Anyone can start or join a team with guaranteed funding. Defaults to 10.00 XTE units/week."},

		{id: "funding-team", top: 0.25, left: 0.46, opacity: 1},
		{id: "funding-market", top: 0.5, left: 0.45, opacity: 0},
		{id: "funding-regulation", top: 0.75, left: 0.45, opacity: 0},

		{id: "funding-rightUpper", top: 0.25, left: 0.67, opacity: 1},
		{id: "funding-rightLower", top: 0.45, left: 0.67, opacity: 1, html: "<br/>Teams have to compete for funding."},

		{id: "funding-arrow", top: 0.6, left: 0.8, opacity: 0},		
		{id: "funding-funder", top: 0.5, left: 0.8, opacity: 0}
	],
	[ // 3
		{id: "funding-leftUpper", top: 0.25, left: 0.1, opacity: 0},
		{id: "funding-leftLower", top: 0.45, left: 0.1, opacity: 0},

		{id: "funding-team", top: 0.25, left: 0.46, opacity: 0},
		{id: "funding-market", top: 0.25, left: 0.45, opacity: 1},
		{id: "funding-regulation", top: 0.75, left: 0.45, opacity: 0},

		{id: "funding-rightUpper", top: 0.25, left: 0.67, opacity: 0},
		{id: "funding-rightLower", top: 0.45, left: 0.67, opacity: 0},

		{id: "funding-arrow", top: 0.6, left: 0.8, opacity: 0},		
		{id: "funding-funder", top: 0.5, left: 0.8, opacity: 0}
	],
	[ // 4
		{id: "funding-leftUpper", top: 0.25, left: 0.1, opacity: 1, html: "Informed decision on whether to accept or reject a payment.", duration: 1500},
		{id: "funding-leftLower", top: 0.45, left: 0.1, opacity: 0},

		{id: "funding-team", top: 0.25, left: 0.46, opacity: 0},
		{id: "funding-market", top: 0.25, left: 0.45, opacity: 1},
		{id: "funding-regulation", top: 0.75, left: 0.45, opacity: 0},

		{id: "funding-rightUpper", top: 0.25, left: 0.67, opacity: 1, html: "Guaranteed acceptability of payments."},
		{id: "funding-rightLower", top: 0.45, left: 0.67, opacity: 0},
		
		{id: "funding-arrow", top: 0.6, left: 0.8, opacity: 0},		
		{id: "funding-funder", top: 0.8, left: 0.5, opacity: 0}
	],
	[ // 5
		{id: "funding-leftUpper", top: 0.25, left: 0.1, opacity: 1},
		{id: "funding-leftLower", top: 0.5, left: 0.1, opacity: 1, html: "<span  class='funding-advantage'>Advantage<br/></span>Goods and service providers encourage sustainable activity by rejecting payments from disreputable teams."},

		{id: "funding-team", top: 0.25, left: 0.46, opacity: 0},
		{id: "funding-market", top: 0.25, left: 0.45, opacity: 1},
		{id: "funding-regulation", top: 0.75, left: 0.45, opacity: 0},

		{id: "funding-rightUpper", top: 0.25, left: 0.67, opacity: 1},
		{id: "funding-rightLower", top: 0.5, left: 0.67, opacity: 1, html: "Goods and service providers passively support any economic activity represented by a team's currency."},
		
		{id: "funding-arrow", top: 0.6, left: 0.8, opacity: 0},		
		{id: "funding-funder", top: 0.5, left: 0.8, opacity: 0}
	],
	[ // 6
		{id: "funding-leftUpper", top: 0.25, left: 0.1, opacity: 0},
		{id: "funding-leftLower", top: 0.45, left: 0.1, opacity: 0},

		{id: "funding-team", top: 0.25, left: 0.46, opacity: 0},
		{id: "funding-market", top: 0.25, left: 0.45, opacity: 0},
		{id: "funding-regulation", top: 0.25, left: 0.45, opacity: 1},

		{id: "funding-rightUpper", top: 0.25, left: 0.67, opacity: 0},
		{id: "funding-rightLower", top: 0.45, left: 0.67, opacity: 0},

		{id: "funding-arrow", top: 0.6, left: 0.8, opacity: 0},		
		{id: "funding-funder", top: 0.5, left: 0.8, opacity: 0}
	],
	[ // 7
		{id: "funding-leftUpper", top: 0.25, left: 0.1, opacity: 1, fastForward: true, html: "Tatag.cc does not need payment intermediaries or settlement."},
		{id: "funding-leftLower", top: 0.55, left: 0.1, opacity: 0},

		{id: "funding-team", top: 0.25, left: 0.46, opacity: 0},
		{id: "funding-market", top: 0.25, left: 0.45, opacity: 0},
		{id: "funding-regulation", top: 0.25, left: 0.45, opacity: 1},

		{id: "funding-rightUpper", top: 0.25, left: 0.67, opacity: 1, html: "Transactions involve at least one payment intermediary, such as credit card companies."},
		{id: "funding-rightLower", top: 0.55, left: 0.67, opacity: 0},
		
		{id: "funding-arrow", top: 0.6, left: 0.8, opacity: 0},		
		{id: "funding-funder", top: 0.8, left: 0.5, opacity: 0}
	],
	[ // 8
		{id: "funding-leftUpper", top: 0.25, left: 0.1, opacity: 1, fastForward: true},
		{id: "funding-leftLower", top: 0.55, left: 0.1, opacity: 1, 
		html: "<span class='funding-advantage'>Advantage<br/></span>No transaction fees, ever. Simply post a <a href='https://tatag.cc/for/ad-1' target='ad-1' style='text-decoration: underline'>payment link</a> in an online article, code, or video, and it should work!"},

		{id: "funding-team", top: 0.25, left: 0.46, opacity: 0},
		{id: "funding-market", top: 0.25, left: 0.45, opacity: 0},
		{id: "funding-regulation", top: 0.25, left: 0.45, opacity: 1},

		{id: "funding-rightUpper", top: 0.25, left: 0.67, opacity: 1},
		{id: "funding-rightLower", top: 0.55, left: 0.67, opacity: 1, html: "Additional fees may apply that decreases funding."},
		
		{id: "funding-arrow", top: 0.6, left: 0.8, opacity: 0},		
		{id: "funding-funder", top: 0.5, left: 0.8, opacity: 0}
	],
	[ // 9
		{id: "funding-leftUpper", top: 0.25, left: 0.1, opacity: 1},
		{id: "funding-leftLower", top: 0.55, left: 0.1, opacity: 1},

		{id: "funding-team", top: 0.25, left: 0.46, opacity: 0},
		{id: "funding-market", top: 0.25, left: 0.45, opacity: 0},
		{id: "funding-regulation", top: 0.25, left: 0.45, opacity: 1},

		{id: "funding-rightUpper", top: 0.25, left: 0.67, opacity: 1},
		{id: "funding-rightLower", top: 0.55, left: 0.67, opacity: 1},

		{id: "funding-arrow", top: 0.6, left: 0.8, opacity: 0},		
		{id: "funding-funder", top: 0.5, left: 0.8, opacity: 0}
	]
]).init(0);

$('#vizFundingNext').click(vizFunding);


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

		if (currIndex!=0 && currIndex!=2 && currIndex!=5 && currIndex!=9) setTimeout(main, duration+1000);
	}

	function bindKey(d) {
		return d.id;
	}

	function html(d) {
		return 'html' in d ? d.html : this.innerHTML;
	}

	function top(d) {
		if (!d || !('top' in d)) return;
		return maxHeight*d.top+'px';
	}

	function left(d) {
		if (!d || !('left' in d)) return;
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

