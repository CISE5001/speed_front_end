import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import Analyst from '@/pages/Analyst';

jest.mock('axios');

jest.mock('next/router', () => require('./nextRouterMock'));

describe('Analyst', () => {
  const mockSubmittedArticles = {
    _id: 'article-id',
    dateSubmitted: '2023-10-04',
    articleTitle: 'Test Article',
    status: 'Submitted',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the Analyst component', () => {
    const { getByText } = render(<Analyst />);
    expect(getByText('Welcome to the Analyst Page')).toBeInTheDocument();
    expect(getByText('Table of moderated articles')).toBeInTheDocument();
  });
  
});
