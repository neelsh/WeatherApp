import React from 'react';
import {shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Weather from './Weather';
import currentTemp from './Weather';

describe('weather app', () => {
  it('should render the weather app', () => {
    const component = renderer.create(<Weather />).toJSON;
    expect(component).toMatchSnapshot();
  });

  it('should have a location of London', () => {
    const weather = shallow(<Weather />)
    weather.find('button').simulate('click');
    expect(weather.find('.focus').text()).toEqual('London')
  });

  it('displays the temperature', () => {
    const weather = shallow(<Weather />)
    weather.find('temp')
    expect(weather.find('currentTemp')).toEqual(temp)
  });

  it('displays the condition', () => {
    const weather = shallow(<Weather />)
    weather.find('condition')
    expect(weather.find('currentCondition')).toEqual(condition)
  });
})
