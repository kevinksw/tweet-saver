import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders app header title', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Tweet Saver/i);
  expect(linkElement).toBeInTheDocument();
});
