function vizSimpleBase() {
	var dataset, min, max, dataPtDivs;
	var xProp='qty', yProp='qtySk2', skew=2;
	var totalPts=300;
	var bins, binSize=0.01;
	
	var height = 0.9*d3.select('#vizSimple').style('height').replace('px',''); 
	var width; 
	
	var explanation = {
		qtySk2: {
			exp: "Right now, there are many whose needs are not addressed by the market.",
			note: "Growing inequality"
		},
		qRepute: {
			exp: "Can reputation moderate the market influence of the wealthy?",
			note: "Fight undue influence"
		},
		bqRepute: {
			exp: "Can digital currencies restore equitable access to goods and services?",
			note: "Raise the bottom"
		}
	};
	
	function main(xName, yName) {
		if (typeof xName=='string') xProp = xName;
		if (typeof yName=='string') yProp = yName;
		
		setMinMax(dataset); 		
		width = 0.9*d3.select('#vizSimple').style('width').replace('px','');
		
		/*d3.select('#vizSimple').selectAll('.datapt')
			.data(dataset)*/
		dataPtDivs.transition().duration(2000)
			.style('top', getTopPos)
			.style('left', getLeftPos);
		
		$('#vizSimpleExplained').html(explanation[yName].exp);
		$('#vizSimpleNote').html(explanation[yName].note);
	}
	
	function init() {			
		setData();
		setMinMax(dataset);
		
		dataPtDivs = d3.select('#vizSimple')
			.selectAll('.datapt')
			.data(dataset)
		.enter().append('div')
			.attr('class', 'datapt')
			.style('left', getLeftPos)
			.style('top', getTopPos)
			.style('font-weight', function (d) {return 200+d[yProp]*5})
			.style('font-size', function (d) {return (0.7+d[yProp]) + 'rem'})
			.style('line-height', function (d) {return (0.7+d[yProp]) + 'rem'})
			//.style('opacity', function (d) {return Math.max(0.6, d[yProp]);})
			.html('$');
		
		var propNames = [/*'qtySk',*/ 'qtySk2', 'qRepute', 'bqRepute'];
		var btnLabels = {
			//qtySk: 'Income Only', 
			qtySk2: "Income Only",
			qRepute: ' ... with Reputation', 
			bqRepute: ' ... and Issuance'
		};
		
		d3.select('#vizSimpleBtnDiv').selectAll('button')
			.data(propNames)
		.enter().append('button')
			.attr('class', 'tiny')
			.html(function (d) {return btnLabels[d];});
			
		$('button', '#vizSimpleBtnDiv').click(function (e) {
			main('qty', e.target.__data__);
		});			
		
		$('#vizSimpleExplained').html(explanation[yProp].exp);
		$('#vizSimpleNote').html(explanation[yProp].note);
	}
	
	function setData() {
		var d = [];
		var x0 = 0.00001, x1 = 1; //value range
		var n = 2, p = n+1, q = 1/p; //exponents
		var y0 = Math.pow(x0,p), y1 = Math.pow(x1,p), yDiff = y1-y0; //simplifies the qty formula below
		var reputeMin = 0.4, reputeVar = 1 - reputeMin; //reputation settings
		var budgetVar = 0.5; //simulates the variation in how much budget a currency brand could issue
		
		// qty formula adapted from Wolfram as described in
		// http://stackoverflow.com/questions/918736/random-number-generator-that-produces-a-power-law-distribution
		for(var i=0; i<totalPts; i++) {
			var qty = 1 - Math.pow((yDiff*Math.random() + y0),q);
			var qtySk = qty;
			for(var w=1; w<skew; w++) qtySk = qtySk*qty;
			
			var repute = reputeMin + Math.random()*reputeVar;
			var budget = qtySk + Math.random()*budgetVar;
			
			d.push({
				i: i/100,
				qty: qty,
				qtySk: qtySk,
				qtySk2: qtySk*qtySk,
				qRepute: qtySk*repute,
				bqRepute: budget*repute,
				budget: budget
			});
		}
		
		d.sort(sortIncr);
		dataset = d; return;
		
		//to simulate power law curve -- will use skew instead
		/*bins = [];
		for(var b=0; b < 100; b++) bins.push({min:b*binSize, max:(b+1)*binSize, qty:0, val:b*binSize+binSize/2});

		d.sort(sortIncr);
		var k=0;
		for(var s=0; s < d.length; s++) {
			while (k<bins.length && d[s].qty > bins[k].max) k++; 
			if (k<100 && d[s].qty >= bins[k].min && d[s].qty < bins[k].max) bins[k].qty++;
		}*/
	}
	
	function setMinMax(d) {
		var xArr=[], yArr=[], xRange, yRange;
		for(var i=0; i<d.length; i++) {
			xArr.push(d[i][xProp]);
			yArr.push(d[i][yProp]);
		}
		
		xRange = d3.extent(xArr);
		xMin = xRange[0];
		xMax = xRange[1];
		
		yRange = d3.extent(yArr);
		yMin = yRange[0];
		yMax = yRange[1];
	}
	
	function sortIncr(a,b) {
		return a[yProp]-b[yProp]
	}
	
	function sortDecr(a,b) {
		return b[yProp]-a[yProp]
	}
	
	function getLeftPos(d,i) {
		return width*(1 - (xMax - d[xProp])/xMax) + 'px';
	}
	
	function getTopPos(d) {
		return height*(yMax - d[yProp])/yMax + 'px'
	}
	
	main.init = function () {
		width = 0.9*d3.select('#vizSimple').style('width').replace('px','');
		if (typeof width != 'number' || !width) return;
		
		clearInterval(main.checkWidth);
		init();
	}
	
	main.resetData = function () {
		skew = $('#accessSkew').val();
		setData();
		main(xProp, yProp);
	}
	
	return main;
}