
window.App = function (resp) {
	ReactDOM.render(
		<MyHoldings concept={"my-holdings"} data={api.byConcept['my-holdings']} />,
		document.getElementById('container')
	);
}

api.omniListener(App).init('/api/').then(function () {
	api.loadConcept('my-holdings'); 
});	

