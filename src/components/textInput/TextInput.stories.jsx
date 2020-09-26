import React from 'react';
import TextInput from './TextInput';
import configureStore from '../../redux/store';
import { Provider } from 'react-redux';

const TextInputWithProvider = () => (
  <Provider store={configureStore()}>
    <TextInput name="Example" value="" onChange={() => { }} label="Example" />
  </Provider>
);

export const SelectWithProvider = () => (
  <Provider store={configureStore()}>
    <TextInput name="Example" value="" onChange={() => { }} label="Example" select
      options={[
        {
          value: 'USD',
          label: '$',
        },
        {
          value: 'EUR',
          label: '€',
        },
        {
          value: 'BTC',
          label: '฿',
        },
        {
          value: 'JPY',
          label: '¥',
        },
      ]}
    />
  </Provider>
);

export default {
  title: 'TextInput',
  component: TextInput,
};

export const NormalTexTInput = () => <TextInputWithProvider />;
