import React from 'react';
import {act} from 'react-test-renderer';
import {render} from '../../utils/test-utils';
import News from './NewsList.jsx';

const response = {
  ids: ['1-21'],
  data: {
    '1-21': {
      id: '1-21',
      title:
        "I'll never go THERE again!' said Alice indignantly. 'Ah! then yours wasn't a.",
      user: {
        id: 1,
        username: 'admin',
        status: 1,
        type: 1,
        profileImage: 'https://lorempixel.com/640/480/?50808',
      },
      likes: 1,
      comments: 14,
      preview:
        "Gryphon whispered in a more subdued tone, and she heard a little feeble, squeaking voice, ('That's Bill,' thought Alice,) 'Well, I never was so small as this is May it won't be raving mad--at least no",
      isCutted: true,
      createdAt: '2020-11-28T18:16:41.000000Z',
      updatedAt: '2020-11-28T18:16:41.000000Z',
    },
  },
};

jest.spyOn(XMLHttpRequest.prototype, 'send').mockImplementation(() => {
  Promise.resolve(response);
});

test('should render and fetch data without crash', async () => {
  await act(async () => {
    render(<News />);
  });
});
