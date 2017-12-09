import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';

import RulePopulationForm from './RulePopulationForm.js';
import RuleList from './RuleList.js';

it('should render form fields', function () {
  const wrapper = shallow(<RulePopulationForm />);
  expect(wrapper.find('.rule-input').to.have.length.of(5);
  expect(wrapper.find('.form-titles').to.have.length.of(5);
  expect(wrapper.find('.form-titles').first().text()).to.eql('Rule title');
});

it('should render button', function () {
  const wrapper = shallow(<RulePopulationForm />);
  expect(wrapper.find('.add-rule').to.have.length.of(1);
});

it('simulates click events', () => {
    const onButtonClick = sinon.spy();
    const wrapper = shallow(<RulePopulationForm onButtonClick={onButtonClick} />);
    wrapper.find('.add-rule').simulate('click');
    expect(onButtonClick).to.have.property('callCount', 1);
});

it('simulates text entry', () => {
  const component = mount(<RulePopulationForm />);
	const input = component.find('input');
	input.simulate('change', { target: { value: 'Hello World' } })
	expect(input.get(0).value).to.equal('Hello World');
});

it('should render rules list', function () {
  const wrapper = shallow(<RuleList />);
  expect(wrapper.find('.rule-list').to.have.length.of(1);
});