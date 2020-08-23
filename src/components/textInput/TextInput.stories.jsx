import React from 'react';
import TextInput from './TextInput';
import configureStore from '../../redux/store';
import { Provider } from 'react-redux';

const TextInputWithProvider = () => (
  <Provider store={configureStore()}>
    <TextInput name="Example" value="" onChange={() => {}} label="Example" />
  </Provider>
);

export default {
  title: 'TextInput',
  component: TextInput,
};

export const NormalTexTInput = () => <TextInputWithProvider />;
