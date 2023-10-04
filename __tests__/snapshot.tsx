/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render } from '@testing-library/react';
import Home from '@/pages/moderation';  // Adjust the path accordingly

describe('<Home />', () => {
  const mockArticles = [
    {
      _id: '1',
      dateSubmitted: '2023-09-30',
      articleTitle: 'Test Article 1',
      status: 'Awaiting Approval'
    },
    {
      _id: '2',
      dateSubmitted: '2023-09-29',
      articleTitle: 'Test Article 2',
      status: 'Approved'
    }
  ];

  it('matches snapshot', () => {
    const { asFragment } = render(<Home submittedArticles={mockArticles} />);
    expect(asFragment()).toMatchSnapshot();
  });
});