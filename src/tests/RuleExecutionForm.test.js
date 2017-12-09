import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import RuleExecutionForm from './RuleExecutionForm.js';
import RuleResultsList from './RuleResultsList.js';

it('should render object form field', function () {
  const wrapper = shallow(<RuleExecutionForm />);
  expect(wrapper.find('.object-input').to.have.length.of(1);
  expect(wrapper.find('.form-titles').to.have.length.of(1);
  expect(wrapper.find('.form-titles').first().text()).to.eql('Object');
});

it('should render rules results list', function () {
  const wrapper = shallow(<RuleResultsList />);
  expect(wrapper.find('.results-title').to.have.length.of(1);
  expect(wrapper.find('.passed').to.have.lengthOf.above(0);
  expect(wrapper.find('.failed').to.have.lengthOf.above(0);
});