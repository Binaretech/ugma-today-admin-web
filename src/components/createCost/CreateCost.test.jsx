import React from 'react';
import { render } from '../../utils/test-utils';
import CreateCost from './CreateCost';

test('should render dialog', () => {
    const dialog = render(<CreateCost open />);

    expect(dialog).toMatchSnapshot();
});