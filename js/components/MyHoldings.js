
window.MyHoldings = React.createClass({
  render: function() { 
		if (!this.props.data) return false; 
    
		return (
      <div className="myHoldings">
        <h1>Account Holdings</h1>
				<HoldingList concept={"my-holdings"} data={this.props.data} />
      </div>
    );
  }
});

var HoldingList = React.createClass({
	render: function() {
    var holdingNodes = this.props.data.items.map(function(holding) {
      return (
        <Holding concept={"my-holding"} data={holding} key={holding.holder_id} keyName={"holder_id"}></Holding>
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
    return {editStep: 0};
  },
	
	componentWillReceiveProps: function () {
		this.setState({editStep: this.state.editStep==1 ? 1 : 0});
	}, 
	
  render: function() {
		var account = this.props.data.account;
		
    return (
      <div className="holding">
        <h3 className="holdingUser">
          {account.brand.name} {this.field('_', this.props.data, 'alias')}, #{account.account_id}
        </h3>
				<div className='small-4'>{account.balance}</div>
				{this.editBtn()} {this.saveBtn()} {this.cancelBtn()} {this.progressIcon('... saving ...')}
      </div>
    );
  }
});
