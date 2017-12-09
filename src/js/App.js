import React, { Component } from 'react';
import RulePopulationForm from './RulePopulationForm.js';
import '../styles/App.css';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
    	<div className='container'>
      	<RulePopulationForm />
      </div>
    )
  }
}

export default App;