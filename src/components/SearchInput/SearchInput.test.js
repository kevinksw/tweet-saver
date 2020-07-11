import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { SearchInput } from './SearchInput';

describe('SearchInput test suite', () => {
    const searchInputTestId = 'test-search-input';
    const mockHandler = jest.fn();

    beforeEach(() => {
        mockHandler.mockClear();
    });

    it('test default render', () => {
        render(<SearchInput testID={searchInputTestId} />)
        const input = screen.getByTestId(searchInputTestId);

        expect(input.value).toBe('');
    });

    it('test component with initial value', () => {
        const initialValue = 'test-value';
        render(<SearchInput testID={searchInputTestId} initValue={initialValue} />)
        const input = screen.getByTestId(searchInputTestId);

        expect(input.value).toBe(initialValue);
    });

    it('test search action called with value of the search input', () => {
        const initialValue = 'test-value';
        render(<SearchInput testID={searchInputTestId} initValue={initialValue} searchTweetAction={mockHandler} />)
        const searchButton = screen.getByTestId(`${searchInputTestId}-button`);

        fireEvent.click(searchButton);
        expect(mockHandler).toBeCalledWith(initialValue);
    });

    it('test initial value of length less than 3 will disable search button', () => {
        const initialValue = '12';
        render(<SearchInput testID={searchInputTestId} initValue={initialValue} searchTweetAction={mockHandler} />)
        const searchButton = screen.getByTestId(`${searchInputTestId}-button`);
        const input = screen.getByTestId(searchInputTestId);
        fireEvent.keyUp(input);

        expect(searchButton.disabled).toBeTruthy();
    });

    it('test initial value of length less than 3 will show error message with error class set', () => {
        const initialValue = '12';
        render(<SearchInput testID={searchInputTestId} initValue={initialValue} searchTweetAction={mockHandler} />)
        const errorMessage = screen.getByTestId(`${searchInputTestId}-error-text`);
        const input = screen.getByTestId(searchInputTestId);
        fireEvent.change(input);

        expect(errorMessage.classList.contains('error')).toBeTruthy();
    });

    
    it('test initial value of length 3 or more will not disable search button', () => {
        const initialValue = '1234';
        render(<SearchInput testID={searchInputTestId} initValue={initialValue} searchTweetAction={mockHandler} />)
        const searchButton = screen.getByTestId(`${searchInputTestId}-button`);
        const input = screen.getByTestId(searchInputTestId);
        fireEvent.keyUp(input);

        expect(searchButton.disabled).toBeFalsy();
    });

    it('test initial value of length 3 or more will not show error message with error class not set', () => {
        const initialValue = '1234';
        render(<SearchInput testID={searchInputTestId} initValue={initialValue} searchTweetAction={mockHandler} />)
        const errorMessage = screen.getByTestId(`${searchInputTestId}-error-text`);
        const input = screen.getByTestId(searchInputTestId);
        fireEvent.change(input);
        
        expect(errorMessage.classList.contains('error')).toBeFalsy();
    });

    

});