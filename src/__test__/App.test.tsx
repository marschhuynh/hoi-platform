import React from 'react';
import { render } from '@testing-library/react';
import { RootApplication } from '../app';

test('renders learn react link', () => {
  const { getByText } = render(<RootApplication />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
