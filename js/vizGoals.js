function vizGoalsBase() {
	var currGoal=0;	
	var height = 0.9*d3.select('#vizGoals').style('height').replace('px',''); 
	var width; 
	var vizGoalsNext = "<button id='vizGoalsNext' class='tiny'>next &#9658;</button>";
	var amounts = {A: 0.5, B: 0.3, pay:0.2}
	var Aacct='exp', Bacct='rev'; 
	
	var budgetDivs, d3PayDivs, playInterval;
	
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
	
	var dataset = [
		A.rev, A.exp, A.pay.rev, A.pay.exp, 
		B.rev, B.exp, B.pay.rev, B.pay.exp
	];
	

	var explanations = [{
		exp: "Budget-as-Currency", 
		note: "",
	},{
		exp: "Decentralized Issuance", 
		note: ""
	},{
		exp: "Payment Offer", 
		note: ""
	},{
		exp: "Payment Offer",
		note: ""
	},{
		exp: "An accepted payment leads to budgets being used up.",
		note: ""
	},{
		exp: "Rejected payments are refunded.",
		note: ""
	},{
		exp: "Rejected payments are refunded.",
		note: ""
	},{
		exp: "Over time, budgets are used up in transactions.",
		note: ""
	}];
	
	var payColor = "rgb(100,200,150)";
	
	function main(e) {
		$('#vizGoalsNext, #acceptPaymentBtn, #rejectPaymentBtn').prop('disabled', true);
		
		width = 0.9*d3.select('#vizGoals').style('width').replace('px','');		
		currGoal = currGoal < explanations.length-1 ? currGoal+1 : 0;
		resetData(e); 
		$('#vizGoalsDesign').html(explanations[currGoal].exp);
		
		if (currGoal==0) {
			$('#vizGoalsNext, #acceptPaymentBtn, #rejectPaymentBtn').prop('disabled', false);
			return;
		}
		
		budgetDivs.html(getText)
			.style('border', getBorder)
		.transition().duration(currGoal==2 ? 0 : 1000)
			.style('top', getTopPos)
			.style('left', getLeftPos)
			.style('height', getBudgetHeight)
		
		if (currGoal==1 || currGoal==6) setTimeout(setOpacity, 1000);
		else if (currGoal==4) {
			setTimeout(setOpacity, 1000);
			currGoal = 6;
		}
		else if (currGoal==2 || currGoal==5) {
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
		
		d3.select('#vizGoals')
			.selectAll('.vizGoalLabels')
			.data([{
				text: 'Team A', top: 1.15, left: 0.1
			},{
				text: 'Team B', top: 1.15, left: 0.75
			}])
		.enter().append('div')
			.attr('class', 'vizGoalsLabel')
			.style('left', getLeftPos)
			.style('top', function (d) {return height*d.top +'px'})
			.html(getText)
		
		$('#vizGoalsNext')//.html('play &#9658')
			.html(currGoal==explanations.length-1 ? 'repeat &#9658;' : 'next &#9658;')
		
		$('#vizGoalsNext, #acceptOrRejectDiv').click(main);
			
		$('#vizGoalsDesign').html(explanations[currGoal].exp);
		
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
		return d.text=='pay' ? height*d.top + 'px' : height*(d.top - d.amount) + 'px'
	}
	
	function getText(d) {
		if (d.text!='pay') return d.text;
		var alias = {rev: 'debits', exp: 'credits'}
		
		return currGoal !=2 && currGoal !=3 ? null 
			: d.name == 'A'+ Aacct ? alias[Aacct]
			: d.name=='B'+Bacct ? alias[Bacct]
			: null;
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
		if (d.text=='pay') return currGoal==0 ? 'transparent' : payColor;
	}
	
	function resetData(e) {
		if (e && e.target && e.target.innerHTML=='Reject') currGoal=5;
	
		if (currGoal==0) {			
			Aacct = A.exp.amount > B.exp.amount ? 'exp' : 'rev'; 
			Bacct = Aacct=='exp' ? 'rev' : 'exp';
			
			A.pay.rev.amount = amounts.A;
			A.pay.rev.top = 1 - amounts.A - A.rev.amount;
			A.pay.exp.amount = amounts.A;
			A.pay.exp.top = 1-amounts.A - A.exp.amount;
			
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
		else if (currGoal==1) {			
			A.rev.amount += amounts.A;
			A.exp.amount += amounts.A;
			A.pay[Aacct].left = A[Aacct].left;
			
			B.rev.amount += amounts.B;
			B.exp.amount += amounts.B;
			B.pay[Bacct].left = B[Bacct].left;
		}
		else if (currGoal==2) {		
			document.getElementById('A'+Aacct+'-pay').style.opacity=1;
			document.getElementById('B'+Bacct+'-pay').style.opacity=1;
			
			d3.selectAll('#A'+Aacct+'-pay, #B'+Bacct+'-pay')
				.style('background-color', payColor);
			
			amounts.pay = Math.min(A[Aacct].amount, B[Bacct].amount) * Math.max(0.3,Math.random());
			A.pay[Aacct].amount = amounts.pay;
			B.pay[Bacct].amount = amounts.pay; 
			
			A.pay[Aacct].top = 1 - A[Aacct].amount;
			B.pay[Bacct].top = 1 - B[Bacct].amount;
			
			A[Aacct].amount = A[Aacct].amount - amounts.pay;
			B[Bacct].amount = B[Bacct].amount - amounts.pay;
		} 
		else if (currGoal==3) {
			A.pay[Aacct].left = 0.43; 
			A.pay[Aacct].top = 0.3;
			B.pay[Bacct].left = 0.55; 
			B.pay[Bacct].top = 0.3;
			
			toggleNextAcceptReject('none','block');
		}
		else if (currGoal==4) {
			//if approved
			A.pay[Aacct].left = 0.49; 
			A.pay[Aacct].top = 0.3;
			B.pay[Bacct].left = 0.49; 
			B.pay[Bacct].top = 0.3;			
			toggleNextAcceptReject('inline','none');
		} 
		else if (currGoal==5) {
			//if rejected
			
			A.pay[Aacct].left = A[Aacct].left; 
			B.pay[Bacct].left = B[Bacct].left;
			
			A.pay[Aacct].top = 1 - A[Aacct].amount - amounts.pay;
			B.pay[Bacct].top = 1 - B[Bacct].amount - amounts.pay;
			toggleNextAcceptReject('inline','none');
		} 
		else if (currGoal==6) {		
			A.pay[Aacct].amount = 0;
			B.pay[Bacct].amount = 0; 
			
			A[Aacct].amount = A[Aacct].amount + amounts.pay;
			B[Bacct].amount = B[Bacct].amount + amounts.pay;
			
			A.pay[Aacct].top = 1 - A[Aacct].amount;
			B.pay[Bacct].top = 1 - B[Bacct].amount;
			toggleNextAcceptReject('inline','none');
		}
		else if (currGoal==7) {
			var periodicUse = Math.min(A[Aacct].amount, B[Bacct].amount) * Math.max(0.3,Math.random());			
			A.rev.amount = A.rev.amount - periodicUse;		
			A.exp.amount = A.exp.amount - periodicUse;		
			B.rev.amount = B.rev.amount - periodicUse;		
			B.exp.amount = B.exp.amount - periodicUse;
			
			setAmountsToAdd();
			amounts.pay = 0;
			toggleNextAcceptReject('inline','none');
		}
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
		
		/*if (amounts.A < 0.005 && amounts.B < 0.005) {
			currGoal=1;
			A.pay[Aacct].left = A[Aacct].left;
			B.pay[Bacct].left = B[Bacct].left;
		}*/
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