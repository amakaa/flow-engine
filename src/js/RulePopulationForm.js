import React, { Component } from 'react';
import RuleList from './RuleList.js';

class RulePopulationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rulesDataArray: [],
      arrayOfIds: [],
      rulesDataObject: {
        title: '',
        id: '',
        body: '',
        true_id: '',
        false_id: '',
        isCalled: '',
        count: 0
      },
      errors: {
        id: true,
        true_id: true,
        false_id: true
      },
      placeholderTitle: 'rule 1',
      placeholderId: '1',
      placeholderBody: '//example of rule body\nfunction (obj) {\n  return !!obj;\n}',
      placeholderTrueId: '//next rule id\n4',
      placeholderFalseId: '//next rule id\n3',
      isButtonEnabled: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const currentState = this.state;
    const rulesDataObject = currentState.rulesDataObject;

    this.setState({ rulesDataArray: [...currentState.rulesDataArray, rulesDataObject],
      arrayOfIds: [...currentState.arrayOfIds, rulesDataObject.id] });

    this.setState({ 
      isButtonEnabled: false,
      rulesDataObject: {
        title: '',
        id: '',
        body: '',
        true_id: '',
        false_id: ''
      }
    });
  }

  validate(name, value) {
    const currentState = this.state;
    const arrayOfIds = currentState.arrayOfIds;
    const errors = currentState.errors;
    const rulesDataObject = currentState.rulesDataObject;
    const isTrueOrFalseId = name === 'true_id' || name === 'false_id';

    errors[name] = Number.isInteger(Number(value));

    if (name === 'id' && arrayOfIds.length > 0 && arrayOfIds.includes(value)) {
      errors[name] = false;
    }

    if (isTrueOrFalseId && value === rulesDataObject.id) {
      errors[name] = false;
    }

    if (Object.values(errors).indexOf(false) > -1) return false;

    return true;
  }

  onChangeValue(e) {
    const target = e.target;
    const targetName = target.name;
    const currentState = this.state;
    const rulesDataObject = currentState.rulesDataObject;
    const errors = currentState.errors;
    let isButtonEnabled = currentState.isButtonEnabled;
    let validateFields = true;

    if (Object.keys(errors).indexOf(targetName) > -1) {
      validateFields = this.validate(targetName, target.value);
    }

    rulesDataObject[e.target.name] = e.target.value;

    isButtonEnabled =
      validateFields &&
      rulesDataObject.title.length > 0 &&
      rulesDataObject.id.length > 0 &&
      rulesDataObject.body.length > 0 &&
      rulesDataObject.true_id.length > 0 &&
      rulesDataObject.false_id.length > 0

    this.setState({ rulesDataObject, isButtonEnabled });
  }

  render() {
    const currentState = this.state;
    const errors = currentState.errors;
  	return (
      <div className='rules-container'>
        <div className='rule-population-form'>
          <form>
            <div className='form-item'>
              <label className='form-titles'>Rule title</label>
              <input className='rule-input rule-title rule-sm' name='title' type='text'
                placeholder={currentState.placeholderTitle} onChange={this.onChangeValue} 
                value={currentState.rulesDataObject.title} required />
            </div>

            <div className='form-item'>
              <label className='form-titles'>Rule id</label>
              <input className={'rule-input ' + (!errors.id ? 'error' : '')}
                name='id' type='text' placeholder={currentState.placeholderId}
                onChange={this.onChangeValue} value={currentState.rulesDataObject.id} required />
            </div>

            <div className='form-item'>
              <label className='form-titles'>Rule body</label>
              <textarea cols='40' rows='7' className='rule-input rule-body' name='body' type='text'
                placeholder={currentState.placeholderBody} onChange={this.onChangeValue} 
                value={currentState.rulesDataObject.body} required />
            </div>

            <div className='form-item'>
              <label className='form-titles'>If rule passed</label>
              <textarea cols='40' rows='3'
                className={'rule-input ' + (!errors.true_id ? 'error' : '')}
                name='true_id' type='text' placeholder={currentState.placeholderTrueId} 
                onChange={this.onChangeValue} value={currentState.rulesDataObject.true_id} />
            </div>

            <div className='form-item'>
              <label className='form-titles'>If rule failed</label>
              <textarea cols='40' rows='3' 
                className={'rule-input ' + (!errors.false_id ? 'error' : '')} 
                name='false_id' type='text' placeholder={currentState.placeholderFalseId}
                onChange={this.onChangeValue} value={currentState.rulesDataObject.false_id} />
            </div>

            <div className='form-item'>
              <button disabled={!currentState.isButtonEnabled} className='add-rule' type='submit' 
                onClick={this.handleSubmit}>Add new rule</button>
            </div>
          </form>
        </div>

        <RuleList {...this.state} />
      </div>
    )
  }
}


export default RulePopulationForm;
