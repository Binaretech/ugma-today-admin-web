import React from 'react';
import TextInput from './TextInput';
import { render, screen } from '../../utils/test-utils';
import configureStore from '../../redux/store';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { createStore } from 'redux';

const name = 'input',
  value = 'initial value',
  onChange = () => { },
  label = 'test input';

const TextInputComponent = (props) => (
  <TextInput
    name={name}
    value={value}
    onChange={onChange}
    label={label}
    {...props}
  />
);

const TextInputWithProvider = () => (
  <Provider store={configureStore()}>
    <TextInputComponent />
  </Provider>
);

const TextInputRenderer = renderer.create(<TextInputWithProvider />);

test('should snapshot TextInput Component', () => {
  const tree = TextInputRenderer.toJSON();

  expect(tree).toMatchSnapshot();
});

test('should render TextInput', async () => {
  const { findAllByRole } = render(<TextInputComponent />);

  const inputsComponents = await findAllByRole('generic');

  expect(inputsComponents[0]).toHaveTextContent(label);
});

test('should get TextInput type = text', async () => {
  const { findByText } = render(<TextInputComponent />);

  const input = await findByText('', {
    selector: 'input',
  });

  expect(input.getAttribute('type')).toBe('text');
});

test('should render error', async () => {
  const errorMessage = 'Input error';
  const { findByText } = render(<TextInputComponent />, {
    store: createStore(() => ({
      requestReducer: {
        errors: {
          input: [errorMessage],
        },
      },
    })),
  });

  expect(await findByText(errorMessage)).toBeInTheDocument();
});

test('should render TextInput with password type', async () => {
  render(<TextInputComponent type="password" />);

  const input = await screen.findByText('', {
    selector: 'input',
  });
  expect(input.getAttribute('type')).toBe('password');
});
