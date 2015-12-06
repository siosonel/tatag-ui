window.Editable = {	
	field: function (obj, prop) {
		return 1 // 'edit' in obj && (obj.edit.inputs.optional.indexOf(prop)!=1 || obj.edit.inputs.required.indexOf(prop)!=1)
			? <EditableSpan propOf={obj['@type']} propName={prop} html={obj[prop]} editable={this.state.editInProgress} />
			: obj[prop];
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
		this.setState({editInProgress: false});
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
			return {edited: false};
		},
		
		render: function(){
        return <span
            onInput={this.emitChange} 
            onBlur={this.emitChange}
            contentEditable={this.props.editable}
						style={this.style()}
            dangerouslySetInnerHTML={{__html: this.props.html}}></span>;
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
										propOf: this.props.propOf
                }
            });
        }
        
				this.lastHtml = html;
				this.setState({edited: html != this.props.html}); 
    },
		
		style: function () {
			if (this.state.edited) var bgColor = '#ff0'; 
			else var bgColor = this.props.editable ? '#fff' : '';
		
			return {
				backgroundColor: bgColor
			}
		}
});



