import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import SearchBar, { SearchBarProps } from '@/pages/components/search/SearchBar';

describe('SearchBar', () => {
  const mockOnSearch = jest.fn();
  const defaultProps: SearchBarProps = {
    onSearch: mockOnSearch,
  };

  it('renders SearchBar component', () => {
    const { getByPlaceholderText } = render(<SearchBar {...defaultProps} />);
    expect(getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  it('handles input change', async () => {
    const { getByPlaceholderText } = render(<SearchBar {...defaultProps} />);
    const input = getByPlaceholderText('Search...');
  
    fireEvent.change(input, { target: { value: 'test' } });
  
    expect(input).toHaveValue('test');
  });

  it('handles search', async () => {
    const mockData = [{ articleTitle: 'test' }];
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ topics: mockData }),
    });
    const { getByPlaceholderText, getByText } = render(<SearchBar {...defaultProps} />);
    const input = getByPlaceholderText('Search...');
    const button = getByText('Search');
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.click(button);
  
    console.log('fetch calls:', global.fetch.mock.calls.length);
    console.log('fetch args:', global.fetch.mock.calls[0]);
    console.log('mockOnSearch calls:', mockOnSearch.mock.calls.length);
    console.log('mockOnSearch args:', mockOnSearch.mock.calls[0]);
  
    await waitFor(() => expect(mockOnSearch).toHaveBeenCalledWith(mockData));
  });
});
