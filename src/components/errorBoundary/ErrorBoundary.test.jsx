import React from 'react';
import ErrorBoundary from './ErrorBoundary';
import renderer from 'react-test-renderer';

test('should renders App component', () => {
    const app = renderer.create(
        <ErrorBoundary />
    );
    expect(app.toJSON()).toMatchSnapshot();
});