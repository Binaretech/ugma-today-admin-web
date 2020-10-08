import React from 'react';
import Input from './Input';
import configureStore from '../../redux/store';
import { Provider } from 'react-redux';
import { makeStyles } from '@material-ui/core';

const InputWithProvider = () => (
  <Provider store={configureStore()}>
    <Input name="Example" value="" onChange={() => { }} label="Example" />
  </Provider>
);

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiSelect-root': {
      width: '25ch',
    },
  },
}));

export const SelectWithProvider = () => {

  const classes = useStyles();
  return (
    <Provider store={configureStore()}>
      <div className={classes.root}>
        <Input name="Example" value="" onChange={() => { }} label="Example" select
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
  title: 'Input',
  component: Input,
};

export const NormalInput = () => <InputWithProvider />;
