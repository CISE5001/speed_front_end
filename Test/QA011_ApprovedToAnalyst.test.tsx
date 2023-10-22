import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '@/pages/index';

jest.mock('axios', () => ({
  put: jest.fn(),
  get: jest.fn().mockResolvedValue({ data: { submittedArticles: [] } }),
}));

describe('Home Component', () => {
  it('renders the component with provided data', async () => {
    const mockSubmittedArticles = [
      {
        _id: '1',
        dateSubmitted: '2023-10-04',
        articleTitle: 'Test Article 1',
        status: 'Awaiting Approval',
      },
    ];

    render(<Home submittedArticles={mockSubmittedArticles} />);

    expect(screen.getByText('Welcome to the Moderation Page')).toBeInTheDocument();
    expect(screen.getByText('Table of submitted articles')).toBeInTheDocument();
    expect(screen.getByText('2023-10-04')).toBeInTheDocument();
    expect(screen.getByText('Test Article 1')).toBeInTheDocument();
    expect(screen.getByText('Awaiting Approval')).toBeInTheDocument();
  });

  it('handles button click to approve an article', async () => {
    const mockSubmittedArticles = [
      {
        _id: '1',
        dateSubmitted: '2023-10-04',
        articleTitle: 'Test Article 1',
        status: 'Awaiting Approval',
      },
    ];

    render(<Home submittedArticles={mockSubmittedArticles} />);

    await waitFor(() => {
      expect(screen.getByText('Approve')).toBeInTheDocument();
    });

    jest.spyOn(require('axios'), 'put').mockResolvedValueOnce({});

    const approveButton = screen.getByText('Approve');
    expect(approveButton).toBeInTheDocument();
    userEvent.click(approveButton);

    expect(require('axios').put).toHaveBeenCalledWith(
      'https://speed-back-end-git-feature-working-cise5001.vercel.app/api/articles/submittedarticles/approveArticle/1'
    );
  });
});
