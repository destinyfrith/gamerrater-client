import { render, screen } from '@testing-library/react';
import { GamerRater } from './components/GamerRater';

test('renders learn react link', () => {
  render(<GamerRater />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
