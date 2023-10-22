import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios'; 
import Moderation from '../pages/moderation';

jest.mock('axios');

const mockArticles = [
  {
    _id: '1',
    dateSubmitted: '2023-10-01',
    articleTitle: 'Test Article 1',
    status: 'Awaiting Approval',
  },
  {
    _id: '2',
    dateSubmitted: '2023-10-02',
    articleTitle: 'Test Article 2',
    status: 'Approved',
  },
];

describe('QA013_ModApprovedArticle Component', () => {
  axios.get.mockResolvedValueOnce({ data: { submittedArticles: mockArticles } });

  it('renders the component', async () => {
    render(<Moderation submittedArticles={[]} />);
    const pageTitle = screen.getByText('MODERATOR PAGE');
    expect(pageTitle).toBeInTheDocument();
  });

  it('displays articles fetched from the server', async () => {
    render(<Moderation submittedArticles={mockArticles} />);
    const articleTitles = mockArticles.map((article) => screen.getByText(article.articleTitle));
    articleTitles.forEach((title) => expect(title).toBeInTheDocument());
  });
  

  it('handles button click', async () => {
    const initialArticles = [
      {
        _id: '1',
        dateSubmitted: '2023-10-01',
        articleTitle: 'Test Article 1',
        status: 'Awaiting Approval',
      },
    ];
  
    render(<Moderation submittedArticles={initialArticles} />);
  
    const approveButton = screen.getByText('Approve');
    expect(approveButton).toBeInTheDocument();
    fireEvent.click(approveButton);
  });
  
});
