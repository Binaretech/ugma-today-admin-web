import React from 'react';
import TextInput from './TextInput';
import configureStore from '../../redux/store';
import { Provider } from 'react-redux';
import { makeStyles } from '@material-ui/core';

const TextInputWithProvider = () => (
  <Provider store={configureStore()}>
    <TextInput name="Example" value="" onChange={() => { }} label="Example" />
  </Provider>
);

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export const SelectWithProvider = () => {

  const classes = useStyles();
  return (
    <Provider store={configureStore()}>
      <div className={classes.root}>
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
      </div>
    </Provider>
  );
};

export default {
  title: 'TextInput',
  component: TextInput,
};

export const NormalTexTInput = () => <TextInputWithProvider />;
