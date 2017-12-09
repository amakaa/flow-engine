import React, { Component } from 'react';

class RuleResultsList extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    const currentProps = this.props;
    const passedRuleArray = currentProps.arrayOfRulesPassed;
    const failedRuleArray = currentProps.arrayOfRulesFailed;

  	return (
  		<div className='rule-results'>
        <div className='form-titles results-title'>
          Results
        </div>

        <div className='passed'>
          {passedRuleArray.map(passedRule => (
    		    <div className='result-item rule-passed' 
              key={passedRule}>{passedRule + ' passed.'}</div>
          ))}
        </div>

        <div className='failed'>
          {failedRuleArray.map(failedRule => (
            <div className='result-item rule-failed' 
              key={failedRule}>{failedRule + ' failed.'}</div>
          ))}
        </div>
  		</div>
  	)
  }
}

export default RuleResultsList;