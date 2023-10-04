/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Articles from '@/pages/index';

describe('Articles Component', () => {
  it('renders without crashing', () => {
    render(<Articles articles={[]} />);
  });

  it('submits an article for moderation', async () => {
    render(<Articles articles={[]} />);

    await waitFor(() => {
      const input = screen.getByPlaceholderText('Enter article title here');
      // eslint-disable-next-line testing-library/no-wait-for-side-effects
      fireEvent.change(input, { target: { value: 'Test Article' } });

      const submitButton = screen.getByText('Submit');
      // eslint-disable-next-line testing-library/no-wait-for-side-effects
      fireEvent.click(submitButton);
    });
  });
});
