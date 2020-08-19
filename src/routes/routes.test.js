// import React from 'react';
// import { render } from '@testing-library/react';
// import Routes from './routes';
import routeList from './routeList';

// test('should render Routes component', () => {
//   const { container } = render(<Routes />);

//   expect(container).toBeInTheDocument();
// });

test('should returns routes array', () => {
  expect(routeList).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        path: '*',
      }),
    ])
  );
});
