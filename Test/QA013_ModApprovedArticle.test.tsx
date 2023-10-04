import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '@/pages/index';
import userEvent from '@testing-library/user-event';

jest.mock('next/router', () => ({
    useRouter: () => ({
      push: jest.fn(),
    }),
  }));
  
  describe('QA013_ModApprovedArticle Component', () => {
    it('renders the component with provided data', () => {
      const mockApprovedArticles = [
        {
          _id: '1',
          dateSubmitted: '2023-10-04',
          articleTitle: 'Test Article 1',
          status: 'Approved',
        },
      ];
  
      render(<Home approvedArticles={mockApprovedArticles} />);
  
      expect(screen.getByText('Welcome to the Analyst Page')).toBeInTheDocument();
      expect(screen.getByText('Table of moderated articles')).toBeInTheDocument();
      expect(screen.getByText('2023-10-04')).toBeInTheDocument();
      expect(screen.getByText('Test Article 1')).toBeInTheDocument();
      expect(screen.getByText('Approved')).toBeInTheDocument();
    });
  
    test('handles button click', async () => {
      const mockApprovedArticles = [
        {
          _id: '1',
          dateSubmitted: '2023-10-04',
          articleTitle: 'Test Article 1',
          status: 'Approved',
        },
      ];
  
      render(<Home approvedArticles={mockApprovedArticles} />);

      await waitFor(() => {
        expect(screen.getByText('View Detail')).toBeInTheDocument();
      });
    
      const firstDetailButton = screen.getByText('View Detail');
      expect(firstDetailButton).toBeInTheDocument();
      userEvent.click(firstDetailButton);
    });
  });