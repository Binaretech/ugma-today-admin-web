import React from 'react';
import renderer from 'react-test-renderer';
import Layout from './Layout';
import { render } from '../../utils/test-utils';
import { trans } from '../../trans/trans';
import { BrowserRouter as Router } from 'react-router-dom';

test('should renders Layout component', () => {
    const layout = renderer.create(
        <Router>
            <Layout>
                <p>Test</p>
            </Layout>
        </Router>
    );

    expect(layout.toJSON()).toMatchSnapshot();
});

test('should find title in appbar', async () => {
    const { getByText } = render(
        <Router>
            <Layout>
                <p>Test</p>
            </Layout>
        </Router>
    );

    expect(getByText(trans('Components.layout.title'))).toBeInTheDocument();
});

test('should find child', async () => {
    const { getByText } = render(
        <Router>
            <Layout>
                <p>Test</p>
            </Layout>
        </Router>
    );

    expect(getByText('Test')).toBeInTheDocument();
});