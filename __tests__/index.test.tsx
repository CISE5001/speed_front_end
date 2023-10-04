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

  it('displays the home page title', () => {
    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });

  it('submits an article for moderation', async () => {
    const input = screen.getByPlaceholderText('Enter article title here');
    fireEvent.change(input, { target: { value: 'Test Article' } });

    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'https://speed-back-end-git-feature-working-cise5001.vercel.app/api/articles/submittedarticles',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            dateSubmitted: expect.any(String),
            articleTitle: 'Test Article',
            status: 'Awaiting Approval',
          }),
        })
      );
    });
  });
});