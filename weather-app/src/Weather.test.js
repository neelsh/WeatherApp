import React from 'react';
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';
import Weather from './Weather';

describe('weather app', () => {
  it('tests the app gets rendered', () => {
    const component = renderer.create(<Weather />).toJSON;
    expect(component).toMatchSnapshot();
  });
})
