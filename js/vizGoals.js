function vizGoalsBase() {
	var currGoal=0;	
	var height = 0.9*d3.select('#vizGoals').style('height').replace('px',''); 
	var width; 
	var vizGoalsNext = "<button id='vizGoalsNext' class='tiny'>next &#9658;</button>";
		
	var budgetDivs, d3PayDivs, teamLabels, playInterval;
	var amounts = {A: 0.5, B: 0.3, pay:0.2}; //start with the same amounts when launched
	
	var	A = {
		rev: {name: "A", left: 0.1, top: 1, amount: 0, text: 'rev'},
		exp: {name: "A", left: 0.25, top: 1, amount: 0, text: 'exp'},
		pay: {
			rev: {name: "Arev", left: 0.1, top: 1-amounts.A, amount: amounts.A, text: 'pay'},
			exp: {name: "Aexp", left: 0.25, top: 1-amounts.A, amount: amounts.A, text: 'pay'},
		}
	};

	var B = {
		rev: {name: "B", left: 0.75, top: 1, amount: 0, text: 'rev'}, 
		exp: {name: "B", left: 0.9, top: 1, amount: 0, text: 'exp'},
		pay: {
			rev: {name: "Brev", left: 0.75, top: 1-amounts.B, amount: amounts.B, text: 'pay'},
			exp: {name: "Bexp", left: 0.9, top: 1-amounts.B, amount: amounts.B, text: 'pay'}
		} 
	};
	
	//always start with the same roles
	var Aacct='exp', Bacct='rev'; 
	
	//convienient pointers to example accounts within the A and B accounts below
	var srcA = A[Aacct], payA = A.pay[Aacct];
	var srcB = B[Bacct], payB = B.pay[Bacct]; 
	
	var dataset = [
		A.rev, A.exp, A.pay.rev, A.pay.exp, 
		B.rev, B.exp, B.pay.rev, B.pay.exp
	];
	

	var explanations = [{
		note: "A team issues currency as equals amounts of revenue (<b>rev</b>) and expense (<b>exp</b>) budgets.", 
		fxn: budgetPlan
	},{
		note: "We track these as obligations (<b>&minus;</b>) and credits (<b>&plus;</b>).", 
		fxn: budgetAdd
	},{
		note: "Credits are offered as payment for another team's goods and services.", 
		fxn: budgetUsePrep
	},{
		note: "The payee's <b>automated advisor</b> evaluates the payer's team reputation.",
		fxn: budgetPayOffer
	},{
		note: "An accepted payment reduces the payee's obligations and payer's credits.",
		fxn: budgetPayAccept
	},{
		note: "Rejected payments are refunded.",
		fxn: budgetPayReject
	},{
		note: "Rejected payments are refunded.",
		fxn: budgetUseVoid
	},{
		note: "Over time, a team's budgets are used up in transactions with other teams.",
		fxn: budgetDecreaseOverTime
	}];
	
	var revColor = "rgb(200,150,150)", 
		expColor = "rgb(100,200,150)",
		payColor = "rgb(100,200,150)";
	
	function main(e) {
		$('#vizGoalsNext, #acceptPaymentBtn, #rejectPaymentBtn').prop('disabled', true);
		
		width = 0.9*d3.select('#vizGoals').style('width').replace('px','');		
		currGoal = currGoal < explanations.length-1 ? currGoal+1 : 0;
		resetData(e); 
		
		$('#vizGoalsDesign').html(explanations[currGoal].note);
		teamLabels.style('left', getLeftPos)
			.style('top', getTopPos)
			.style('margin-left', getLabelMarginLeft);
		
		if (currGoal==0) {
			$('#vizGoalsNext, #acceptPaymentBtn, #rejectPaymentBtn').prop('disabled', false);
			return;
		}
		
		budgetDivs.html(getText)
			.style('border', getBorder)
			.style('background-color', getBgColor)
		.transition().duration(currGoal==2 ? 0 : 1000)
			.style('top', getTopPos)
			.style('left', getLeftPos)
			.style('height', getBudgetHeight)
		
		if (currGoal==1 || currGoal==6) setTimeout(setOpacity, 1000);
		else if (currGoal==4) {
			setTimeout(setOpacity, 1000);
			currGoal = 6;
		}
		else if (currGoal==5) {
			setTimeout(main, 1000);
			return;
		}
		
		setTimeout(enableNextBtn, 1000);
		$('#vizGoalsNext').html(currGoal==explanations.length-1 ? 'repeat &#9658;' : 'next &#9658;');
	}
	
	function init() {					
		budgetDivs = d3.select('#vizGoals')
			.selectAll('.budget')
			.data(dataset)
		.enter().append('div')
			.attr('id', getId)
			.attr('class', 'budget')
			.style('left', getLeftPos)
			.style('top', getTopPos)
			.style('height', getBudgetHeight)
			.style('border', getBorder)
			.style('background-color', getBgColor)
			.html(getText)
		
		teamLabels = d3.select('#vizGoals')
			.selectAll('.vizGoalLabels')
			.data([
				{text: 'Team A', top: 1.15, left: 0.1}, {text: 'Team B', top: 1.15, left: 0.75},
				{text: 'rev', top: 1, left: A.rev.left*1.1}, {text: 'exp', top: 1, left: A.exp.left},
				{text: 'rev', top: 1, left: B.rev.left}, {text: 'exp', top: 1, left: B.exp.left}
			])
		.enter().append('div')
			.attr('class', 'vizGoalsLabel')
			.style('font-weight', function (d) {return d.text=='rev' || d.text=='exp' ? 400 : null})
			.style('left', getLeftPos)
			.style('top', getTopPos)
			.html(getLabelText)
			.style('margin-left', getLabelMarginLeft)
		
		/*d3.select('#vizGoals')
			.selectAll('.vizGoalsFlow')
			.data([
				{left:A.rev.left, deg: 225, }, {left: A.rev.left, deg: 270}, {left: A.rev.left, deg: 315}
			])
		.enter().append('div')
			.attr('class', 'vizGoalsFlow')
			.style('left', getLeftPos)
			.style('transform', function (d) {return 'rotate('+ d.deg +'deg)'})
			.html('&rarr;');*/
					
		$('#vizGoalsNext')//.html('play &#9658')
			.html(currGoal==explanations.length-1 ? 'repeat &#9658;' : 'next &#9658;')
		
		$('#vizGoalsNext, #acceptOrRejectDiv').click(main);
			
		$('#vizGoalsDesign').html(explanations[currGoal].note);
		
		d3PayDivs = d3.selectAll('#Aexp-pay, #Arev-pay, #Bexp-pay, #Brev-pay');
	}
	
	function getId(d) {
		return d.name+'-'+d.text
	}
	
	function getLeftPos(d,i) {
		if (currGoal==0 && d.text=='pay') {
			var AorB = d.name.substr(0,1), acct = d.name.substr(1);
			d.left = AorB == 'A' ? A[acct].left : B[acct].left; 
		};
		
		return width*d.left + 'px';
	}
	
	function getTopPos(d) {
		return d.text=='pay' || !('amount' in d) 
			? height*d.top + 'px' : height*(d.top - d.amount) + 'px'
	}
	
	function getText(d) {
		if (d.text!='pay') {
			if (currGoal===0) return "";
			return d.text=='rev' ? '<b>&minus;</b>' : '<b>&plus;</b>';
		}
		else {		
			var alias = {rev: '<b>&minus;</b>', exp: '<b>&plus;</b>'};		
			
			return currGoal<2 || currGoal>5 ? null 
				: d.name == 'A'+ Aacct ? alias[Aacct]
				: d.name=='B'+Bacct ? alias[Bacct]
				: null;
		}
	}
	
	function getLabelText(d) {
		return d.text;
	}
	
	function getLabelMarginLeft(d) {
		var w0 = d.text=='rev' || d.text=='exp' 
			? 0.1*width
			: width*(A.exp.left + 0.1 - A.rev.left); 
		
		var w1 = 1*$(this).css('width').replace('px','');
		var m = w0 - w1;
		return m <= 0 ? '0px' : 0.5*m+'px';
	}
	
	function getBudgetHeight(d) {
		return height*d.amount + 'px';
	}
	
	function getBorder(d) {
		if (d.text!='pay') return;
		return (currGoal==2 || currGoal==3) && (d.name=='A'+Aacct || d.name=='B'+Bacct) 
			? '1px solid #555'
			: '1px dashed #555';
	}
	
	function setOpacity() { 
		d3.selectAll( currGoal==1
				? '#Aexp-pay, #Arev-pay, #Bexp-pay, #Brev-pay'
				: '#A'+Aacct+'-pay, #B'+Bacct+'-pay'
			)//.transition().duration(1000)
			.style('opacity', 0.001);
	}
	
	function getBgColor(d,i) {
		if (d.text=='pay' && (currGoal==0 || currGoal==1)) return 'transparent';
		return d.text=='rev' || d.name.search('rev')!=-1 ? revColor: expColor;
	}
	
	function resetData(e) {
		if (e && e.target && e.target.innerHTML=='Reject') currGoal=5;
		explanations[currGoal].fxn();
	}
	
	function budgetPlan() {
		//to vary payer and payee roles
		Aacct = A.exp.amount > B.exp.amount ? 'exp' : 'rev'; 
		Bacct = Aacct=='exp' ? 'rev' : 'exp';
		
		srcA = A[Aacct]; payA = A.pay[Aacct];
		srcB = B[Bacct]; payB = B.pay[Bacct];
		
		A.pay.rev.amount = amounts.A;
		A.pay.rev.top = 1 - amounts.A - A.rev.amount;
		A.pay.exp.amount = amounts.A;
		A.pay.exp.top = 1 - amounts.A - A.exp.amount;
		
		B.pay.rev.amount = amounts.B;
		B.pay.rev.top = 1-amounts.B - B.rev.amount;
		B.pay.exp.amount = amounts.B;
		B.pay.exp.top = 1-amounts.B - B.exp.amount;
		
		d3PayDivs.style('opacity', '1.0')
			.style('background-color', 'transparent')
			.style('border', '1px dashed #555')
			.style('left', resetLeftPos)
			.style('top', getTopPos)
			.style('height', getBudgetHeight);		
			
		toggleNextAcceptReject('inline','none');
	}
	
	function budgetAdd() {
		A.rev.amount += amounts.A;
		A.exp.amount += amounts.A;
		payA.left = srcA.left;
		
		B.rev.amount += amounts.B;
		B.exp.amount += amounts.B;
		payB.left = srcB.left;
	}
	
	function budgetUsePrep() {				
		d3.selectAll('#A'+Aacct+'-pay, #B'+Bacct+'-pay')
			.style('opacity',1)
			.style('background-color', payColor);
		
		amounts.pay = Math.min(srcA.amount, srcB.amount) * Math.max(0.3,Math.random());
		payA.amount = amounts.pay;
		payB.amount = amounts.pay; 
		
		payA.top = 1 - srcA.amount;
		payB.top = 1 - srcB.amount;
		
		srcA.amount = srcA.amount - amounts.pay;
		srcB.amount = srcB.amount - amounts.pay;
	} 
	
	function budgetPayOffer() {
		payA.left = 0.43; 
		payA.top = 0.2;
		payB.left = 0.55; 
		payB.top = 0.2;
		
		toggleNextAcceptReject('none','block');
	}
		
	function budgetPayAccept() {
		payA.left = 0.49; 
		payA.top = 0.2;
		payB.left = 0.49; 
		payB.top = 0.2;			
		toggleNextAcceptReject('inline','none');
	} 
		
	function budgetPayReject() {			
		payA.left = srcA.left; 
		payB.left = srcB.left;
		
		payA.top = 1 - srcA.amount - amounts.pay;
		payB.top = 1 - srcB.amount - amounts.pay;
		toggleNextAcceptReject('inline','none');
	} 
		
	function budgetUseVoid() {		
		payA.amount = 0;
		payB.amount = 0; 
		
		srcA.amount = srcA.amount + amounts.pay;
		srcB.amount = srcB.amount + amounts.pay;
		
		payA.top = 1 - srcA.amount;
		payB.top = 1 - srcB.amount;
		toggleNextAcceptReject('inline','none');
	}
		
	function budgetDecreaseOverTime() {		
		A.rev.amount = A.rev.amount * Math.max(0.3,Math.random());		
		A.exp.amount = A.exp.amount * Math.max(0.3,Math.random());		
		B.rev.amount = B.rev.amount * Math.max(0.3,Math.random());		
		B.exp.amount = B.exp.amount * Math.max(0.3,Math.random());
		
		setAmountsToAdd();
		amounts.pay = 0;
		toggleNextAcceptReject('inline','none');
	}
	
	function resetLeftPos(d) {
		if (d.name.length==1) return d.left;
		
		var AorB = d.name.substr(0,1), acct = d.name.substr(1);
		d.left = AorB == 'A' ? A[acct].left : B[acct].left;
		return width*d.left + 'px';
	}
	
	function enableNextBtn() {
		$('#vizGoalsNext, #acceptPaymentBtn, #rejectPaymentBtn').prop('disabled', false);
	}
	
	function toggleNextAcceptReject(nextBtnDisplay, arBtnDisplay) {
		$('#vizGoalsNext').css('display', nextBtnDisplay);
		$('#acceptOrRejectDiv').css('display', arBtnDisplay);
	}
	
	function setAmountsToAdd() {
		amounts.A = Math.min(1-A.rev.amount, 1-A.exp.amount, Math.max(0.3, Math.random()));
		amounts.B = Math.min(1-B.rev.amount, 1-B.exp.amount, Math.max(0.3, Math.random()));
	}
	
	function playOrPause(e) {
		if (e.target.tagName != 'BUTTON') return;
	
		if (e.target.innerHTML.search('play') !=-1 && !playInterval) { 
			$('#vizGoalsNext').html('pause');
			playInterval = setInterval(main, 2000);  console.log(e.target.innerHTML);
			return;
		}
		
		if (e.target.innerHTML.search('pause') !=-1 && playInterval) {
			$('#vizGoalsNext').html('play &#9658');
			clearInterval(playInterval);   console.log(e.target.innerHTML);
			playInterval = null;
			return;
		};
	}
	
	main.init = function () {
		width = 0.9*d3.select('#vizGoals').style('width').replace('px','');
		if (typeof width != 'number' || !width) return;
		
		clearInterval(main.checkWidth);
		init();
	}
	
	return main;
}