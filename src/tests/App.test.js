import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import RulePopulationForm from './RulePopulationForm.js';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('should render population form', function () {
  const wrapper = shallow(<App />);
  expect(wrapper.find(RulePopulationForm).exists()).toEqual(true);
 });
