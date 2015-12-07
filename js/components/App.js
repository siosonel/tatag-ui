
window.App = function (resp) {
	ReactDOM.render(
		<MyHoldings concept={"personal-holdings"} data={api.byConcept['personal-holdings']} />,
		document.getElementById('container')
	);
}

api.omniListener(App).init('/api/').then(function () {
	api.loadConcept('personal', 'holdings'); //.then(App);
});	

