import React from 'react';
import renderer from 'react-test-renderer';
import Scaffold from './Scaffold';
import { render } from '../../utils/test-utils';
import { trans } from '../../trans/trans';
import { BrowserRouter as Router } from 'react-router-dom';

test('should renders Scaffold component', () => {
    const scaffold = renderer.create(
        <Router>
            <Scaffold>
                <p>Test</p>
            </Scaffold>
        </Router>
    );

    expect(scaffold.toJSON()).toMatchSnapshot();
});

test('should find title in appbar', async () => {
    const { getByText } = render(
        <Router>
            <Scaffold>
                <p>Test</p>
            </Scaffold>
        </Router>
    );

    expect(getByText(trans('Components.scaffold.title'))).toBeInTheDocument();
});

test('should find child', async () => {
    const { getByText } = render(
        <Router>
            <Scaffold>
                <p>Test</p>
            </Scaffold>
        </Router>
    );

    expect(getByText('Test')).toBeInTheDocument();
});