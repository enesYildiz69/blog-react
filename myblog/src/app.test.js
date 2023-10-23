import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom/extend-expect';

test('it fetches and displays JSON data from the API', async () => {
  // Mock the fetch function to return your sample data
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          {
            id: '1',
            title: 'Book Review: The Name of the Wind',
          },
          {
            id: '2',
            title: 'Game Review: Pokemon Brilliant Diamond',
          },
          {
            id: '3',
            title: 'Show Review: Alice in Borderland',
          },
        ]),
    })
  );

  render(<App />);

  // Wait for the API call to complete
  await waitFor(() => {
    const blogElements = screen.getAllByTestId('blog-element');

    // Check if the correct number of elements are displayed
    expect(blogElements.length).toBe(3);

    // Check if the titles are displayed correctly
    expect(screen.getByText('Book Review: The Name of the Wind')).toBeInTheDocument();
    expect(screen.getByText('Game Review: Pokemon Brilliant Diamond')).toBeInTheDocument();
    expect(screen.getByText('Show Review: Alice in Borderland')).toBeInTheDocument();
  });
});
