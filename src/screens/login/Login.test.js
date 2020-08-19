import React from 'react';
import Login from '../login';

import { render } from '@testing-library/react';

test('should render Login screen', () => {
  const { container } = render(<Login />);

  expect(container).toBeInTheDocument();
});

test('should render Ingresar word in Login', () => {
  const { getByText } = render(<Login />);
  expect(getByText('Ingresar')).toBeInTheDocument();
});
