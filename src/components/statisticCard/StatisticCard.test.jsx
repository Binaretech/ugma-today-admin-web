import React from 'react';
import StatisticCard from './StatisticCard';
import {render} from '@testing-library/react';

test('Should render without crash', () => {
  render(<StatisticCard />);
});

test('Should display a title and a content', () => {
  const {getByText} = render(
    <StatisticCard title="Awesome title" content="Awesome content" />,
  );

  expect(getByText('Awesome title')).toBeInTheDocument();
  expect(getByText('Awesome content')).toBeInTheDocument();
});
