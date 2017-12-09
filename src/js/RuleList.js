import React, { Component } from 'react';
import RuleExecutionForm from './RuleExecutionForm.js';

class RuleList extends Component {
	constructor(props) {
    super(props);

    this.onClose = this.onClose.bind(this);
  }

  componentWillReceiveProps(nextProps){
    this.setState({rulesDataArray: nextProps.rulesDataArray})
  }

  onClose(e) {
  	const target = e.target;
  	const currentProps = this.props;
  	const propsArray = currentProps.rulesDataArray;

  	propsArray.map((item, index) => {
  		if (target.id === item.id) propsArray.splice(index, 1);
  	});

  	this.setState({ rulesDataArray: [...currentProps.rulesDataArray, propsArray] });
  }

  render() {
    const rulesDataArray = this.props.rulesDataArray;

		if (rulesDataArray.length > 0) {
			return (
				<div className='rule-list'>
					<h2>List of Rules</h2>
					{rulesDataArray.map(rule => (
			    <div className='rule-container' id={rule.id} key={rule.id}>
						<div className='list-item' id={'item-' + rule.id} 
							key={'item-' + rule.id}>{rule.title}</div>
						<div className='close-button' id={rule.id} 
							key={'close-' + rule.id} onClick={this.onClose}>X</div>
					</div>
					))}

				  <div className='expansion'>
				    <RuleExecutionForm {...this.props} />
				  </div>
	     	</div>
			);
		}
		return null;
  }
}

export default RuleList;