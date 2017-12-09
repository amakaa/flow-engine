import React, { Component } from 'react';
import RuleResultsList from './RuleResultsList.js';

class RuleExecutionForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      setRulesParameter: [],
      placeholderObject: '//example of rule body\nfunction (obj) {\n  return !!obj;\n}',
      objectValue: '',
      arrayOfRulesPassed: [],
      arrayOfRulesFailed: [], 
      count: 0
    };

    this.handleExecuteRow = this.handleExecuteRow.bind(this);
    this.onChangeObject = this.onChangeObject.bind(this);
    this.evaluateStringAsFunction = this.evaluateStringAsFunction.bind(this);
    this.testfor = this.testfor.bind(this);
  }

  evaluateStringAsFunction(ruleToTest, paramPassed, true_id, false_id, title, id) {
    const currentState = this.state;
    const currentProps = this.props;
    const rulesDataArray = currentProps.rulesDataArray;
    const fn = new Function('return ' + ruleToTest)();
    const isRuleTrue = fn(paramPassed);
    const trueIdRule = rulesDataArray.find(function(element, index) {
      return element.id === true_id && index !== 0;
    });
    const falseIdRule = rulesDataArray.find(function(element, index) {
      return element.id === false_id && index !== 0;
    });

    let arrayOfRulesPassed = currentState.arrayOfRulesPassed;
    let arrayOfRulesFailed = currentState.arrayOfRulesFailed;

    if (isRuleTrue) arrayOfRulesPassed.push(title);
    if (!isRuleTrue) arrayOfRulesFailed.push(title);

    this.setState({ arrayOfRulesPassed: [...currentState.arrayOfRulesPassed],
      arrayOfRulesFailed: [...currentState.arrayOfRulesFailed] });

    if (!trueIdRule && !falseIdRule) return null;

    if (isRuleTrue) {
      this.evaluateStringAsFunction(trueIdRule.body, paramPassed, trueIdRule.true_id,
        trueIdRule.false_id, trueIdRule.title, trueIdRule.id);
    }

    if (!isRuleTrue) {
      this.evaluateStringAsFunction(falseIdRule.body, paramPassed, falseIdRule.true_id,
        falseIdRule.false_id, falseIdRule.title, falseIdRule.id);
    }

    return isRuleTrue;
  }

  handleExecuteRow() {
    const currentState = this.state;
    const currentProps = this.props;
    const rulesDataArray = currentProps.rulesDataArray;

    const stringToObjectLiteral = JSON.parse(JSON.stringify(currentState.objectValue));

    this.state.arrayOfRulesPassed = [];
    this.state.arrayOfRulesFailed = [];

    this.evaluateStringAsFunction(rulesDataArray[0].body, stringToObjectLiteral,
      rulesDataArray[0].true_id, rulesDataArray[0].false_id, rulesDataArray[0].title,
      rulesDataArray[0].id);
  }

  onChangeObject(e) {
    const target = e.target;
    const currentState = this.state;

    let objectValue = currentState.objectValue;

    objectValue = target.value;

    this.setState({ objectValue });
  }

  render() {
    const currentState = this.state;

  	return (
  		<div className='rule-execution-form'>
        <div className='form-item'>
          <label className='form-titles'>Object</label>
          <textarea cols='40' rows='7' className='rule-input object-input' type='text'
            placeholder={currentState.placeholderObject} value={currentState.objectValue} 
            onChange={this.onChangeObject}></textarea>
        </div>

        <div className='form-item'>
          <button className='execute-flow' type='submit' onClick={this.handleExecuteRow}>
            Execute Flow
          </button>
        </div>

        <RuleResultsList {...this.state} />
      </div>
    )
  }
}

export default RuleExecutionForm;