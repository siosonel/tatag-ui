window.Editable = {	
	rendered: {},
	edited: {},
	
	field: function (linkRel, obj, prop) {	
		if (!(linkRel in this.rendered)) this.rendered[linkRel] = {}; 
		this.rendered[linkRel][prop] = obj[prop];
		
		return 1 // 'edit' in obj && (obj.edit.inputs.optional.indexOf(prop)!=1 || obj.edit.inputs.required.indexOf(prop)!=1)
			? <EditableSpan linkRel={linkRel} propName={prop} html={obj[prop]} editable={this.state.editStep} onChange={this.trackEdited} />
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
			display: this.state.editStep ? 'none' : 'inline-block'
		}
	},
	
	editClick: function (e) {
		this.setState({editStep: 1});
	},

	saveBtn: function () {
		return <div style={this.saveStyle()} onClick={this.saveClick}>save | </div>
	},
	
	saveStyle: function () {
		return {
			display: this.state.editStep == 1 ? 'inline-block' : 'none'
		}
	},
	
	saveClick: function (e) {
		var numRequests = 0; 
		
		for(var r in this.edited) {
			if (Object.keys(this.edited[r]).length) {	
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
				
				var match = {};
				if (this.props.keyName) match[this.props.keyName] = currResource[this.props.keyName];
				
				api.request(action, currResource['@id']).then(this.emptyFunction, this.fieldReset);
				numRequests++;
				this.edited[r] = {};
			}
		}
		
		this.setState({editStep: numRequests ? 2 : 0});
	},
	
	emptyFunction: function () {},
	
	fieldReset: function (err) { console.log(err);
		this.setState({editStep: 0});
	},
	
	progressIcon: function (html) {
		var style = {display: this.state.editStep==2 ? 'inline-block' : 'none'};
		return <div style={style}>{html}</div>;
	},
	
	cancelBtn: function () {
		return <div style={this.cancelStyle()} onClick={this.cancelClick}>cancel</div>
	},
	
	cancelStyle: function () {
		return {
			display: this.state.editStep==1 ? 'inline-block' : 'none'
		}
	},
	
	cancelClick: function (e) {
		this.setState({editStep: 0});
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
		if (!this.props.editable) this.lastHtml = '';
		
		var html = this.props.editable && this.lastHtml ? this.lastHtml : this.props.html;
		
		var editable = this.props.editable ? true : false;
	
		return <span
			onInput={this.emitChange} 
			onBlur={this.emitChange}
			contentEditable={editable}
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



