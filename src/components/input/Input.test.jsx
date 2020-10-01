import React from 'react';
import Input from './Input';
import { render, screen } from '../../utils/test-utils';
import { createStore } from 'redux';

const name = 'input',
  value = 'initial value',
  onChange = () => { },
  label = 'test input';

const InputComponent = (props) => (
  <Input
    name={name}
    value={value}
    onChange={onChange}
    label={label}
    {...props}
  />
);

test('should snapshot Input Component', () => {
  const InputRenderer = render(<InputComponent />);

  expect(InputRenderer).toMatchSnapshot();
});

test('should render Input', async () => {
  const { findAllByRole } = render(<InputComponent />);

  const inputsComponents = await findAllByRole('generic');

  expect(inputsComponents[0]).toHaveTextContent(label);
});

test('should get Input type = text', async () => {
  const { findByText } = render(<InputComponent />);

  const input = await findByText('', {
    selector: 'input',
  });

  expect(input.getAttribute('type')).toBe('text');
});

test('should render error', async () => {
  const errorMessage = 'Input error';
  const { findByText } = render(<InputComponent />, {
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

test('should render Input with password type', async () => {
  render(<InputComponent type="password" />);

  const input = await screen.findByText('', {
    selector: 'input',
  });
  expect(input.getAttribute('type')).toBe('password');
});

test('should render Select input', async () => {
  const element = render(
    <Input
      label="test"
      select
      options={[
        { label: "option", value: "option" }
      ]}
    />
  );

  expect(element).toMatchSnapshot();
});