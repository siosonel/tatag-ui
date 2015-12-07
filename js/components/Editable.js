window.Editable = {	
	rendered: {},
	edited: {},
	
	field: function (linkRel, obj, prop) {
		if (!(linkRel in this.rendered)) this.rendered[linkRel] = {}; 
		this.rendered[linkRel][prop] = obj[prop];
		
		return 1 // 'edit' in obj && (obj.edit.inputs.optional.indexOf(prop)!=1 || obj.edit.inputs.required.indexOf(prop)!=1)
			? <EditableSpan linkRel={linkRel} propName={prop} html={obj[prop]} editable={this.state.editInProgress} onChange={this.trackEdited} />
			: obj[prop];
	},
	
	trackEdited: function (e) {
		if (!(e.target.linkRel in this.edited)) this.edited[e.target.linkRel] = {};
		
		var r = this.edited[e.target.linkRel];
		var wasEdited = e.target.value != this.rendered[e.target.linkRel][e.target.key];
		
		if (wasEdited) r[e.target.key] = e.target.value;
		else if (e.target.key in r && !wasEdited) delete r[e.target.key];
	},
	
	editBtn: function () {
		return <div style={this.editStyle()} onClick={this.editClick}>edit</div>
	},

	editStyle: function () {
		return {
			display: this.state.editInProgress ? 'none' : 'inline-block'
		}
	},
	
	editClick: function (e) {
		this.setState({editInProgress: true});
	},

	saveBtn: function () {
		return <div style={this.saveStyle()} onClick={this.saveClick}>save | </div>
	},
	
	saveStyle: function () {
		return {
			display: this.state.editInProgress ? 'inline-block' : 'none'
		}
	},
	
	saveClick: function (e) {
		for(var r in this.edited) {
			if (Object.keys(this.edited[r]).length) { console.log(this.edited[r]);					
				var currResource = r=='_' ? this.props.data : this.props.data[r];
				var currForm = currResource.edit;
				var query = {};
				if (currForm.query) currForm.query.required.map(function (param) {query[param] = currResource[param]});
				
				var action = {
					target: currForm.target ? currForm.target : currResource['@id'], 
					query: query,
					method:'post', 
					inputs: this.edited[r]
				};
				
				api.request(action).then(function (resp) {console.log(resp)}, function (r) {console.log('error'); console.log(r);});
			}
		}
		
		//this.setState({editInProgress: false});
	},
	
	cancelBtn: function () {
		return <div style={this.cancelStyle()} onClick={this.cancelClick}>cancel</div>
	},
	
	cancelStyle: function () {
		return {
			display: this.state.editInProgress ? 'inline-block' : 'none'
		}
	},
	
	cancelClick: function (e) {
		this.setState({editInProgress: false});
	}
};



window.EditableSpan = React.createClass({
	getInitialState: function () {
		return {edited: false, html: 'test'};
	},
	
	componentWillReceiveProps: function () {
		this.setState({edited: false, html: this.props.html});
	},
	
	render: function(){
		var html = this.props.editable ? this.state.html : this.props.html;
	
		return <span
			onInput={this.emitChange} 
			onBlur={this.emitChange}
			contentEditable={this.props.editable}
			style={this.style()}
			dangerouslySetInnerHTML={{__html: html}}></span>;
	},
	
	emitChange: function(e) {
		var self = ReactDOM.findDOMNode(this), html = self.innerHTML;
		
		if (this.props.onChange && html !== this.lastHtml) {
			html = html.replace("\n", "").replace("<br>", "");
			if (html.slice(-4)=='<br>') html = html.slice(0,-4);
			self.innerHTML = html;
			
			this.props.onChange({
				target: {
					value: html,
					key: this.props.propName,
					linkRel: this.props.linkRel
				}
			});
		}
		
		this.lastHtml = html;
		this.setState({edited: html != this.props.html, html: html}); 
	},
	
	style: function () {
		if (this.state.edited) var bgColor = '#ff0'; 
		else var bgColor = this.props.editable ? '#fff' : '';
	
		return {
			backgroundColor: bgColor
		}
	}
});



