import { render, screen } from '@testing-library/react';
import App from './App';
import * as test from "node:test";

test('renders learn react link', () => {
  render(<App />);
  screen.getByText(/learn react/i);
});
