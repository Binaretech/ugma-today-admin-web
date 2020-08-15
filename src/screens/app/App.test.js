import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('should renders App component', () => {
  const { container } = render(<App />);
  expect(container).toBeInTheDocument();
});
