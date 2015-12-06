
var MyHoldings = React.createClass({
	getInitialState: function() {
    return {data: {items: []}};
  },
  componentDidMount: function() {
    api.init(this.props.rootURL).then(this.getServerData, errHandler);
  },
	getServerData: function () {
		api.loadConcept('personal', 'holdings').then(this.setData, errHandler);
	},	
	setData: function (resp) {
		this.setState({data: api.byId[resp['@id']]});
	},
  render: function() {
    return (
      <div className="myHoldings">
        <h1>Account Holdings</h1>
				<HoldingList data={this.state.data} />
      </div>
    );
  }
});

var HoldingList = React.createClass({
	render: function() {
    var holdingNodes = this.props.data.items.map(function(holding) {
      return (
        <Holding data={holding} key={holding.holder_id}></Holding>
      );
    });
    return (
      <div className="HoldingList">
        {holdingNodes}
      </div>
    );
  }
});


var Holding = React.createClass({
	mixins: [Editable],
	
	getInitialState: function() {
    return {editInProgress: false};
  },
	
	rawMarkup: function() {;
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return { __html: rawMarkup };
  },
	
	componentWillMount: function () {
		//this.accountName = this.field(this.props.data.account, 'name');
	},
	
  render: function() {
		var account = this.props.data.account;
		
    return (
      <div className="holding">
        <h3 className="holdingUser">
          {account.brand.name} {this.field(account,'name')}, #{account.account_id}
        </h3>
				<div className='small-4'>{account.balance}</div>
				{this.editBtn()} {this.saveBtn()} {this.cancelBtn()}
      </div>
    );
  }
});


ReactDOM.render(
  <MyHoldings rootURL='/api/' pollInterval={60000} />,
  document.getElementById('my-holdings')
);
