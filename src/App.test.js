import '@testing-library/jest-dom'; 
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

// TEST 1: Does the main page render correctly?
test('renders the search page title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Find Your Dream Home/i);
  expect(titleElement).toBeInTheDocument();
});

// TEST 2: Do the properties load from JSON?
test('renders property cards', () => {
  render(<App />);
  // Checks for specific text from the first property in your JSON
  const propertyLocation = screen.getByText(/Petts Wood Road/i);
  expect(propertyLocation).toBeInTheDocument();
});

// TEST 3: Does the Filter logic work?
test('filters properties when type is changed', () => {
  render(<App />);
  
  // 1. Change filter to "Flat"
  const typeSelect = screen.getByLabelText(/Type:/i);
  fireEvent.change(typeSelect, { target: { value: 'Flat' } });
  
  // 2. Ensure House is gone
  const houseElement = screen.queryByText(/Petts Wood Road/i);
  expect(houseElement).not.toBeInTheDocument();

  // 3. Ensure Flat remains
  const flatElement = screen.getByText(/Crofton Road/i);
  expect(flatElement).toBeInTheDocument();
});

// TEST 4: Does the Favourites Sidebar render?
test('renders the favourites sidebar', () => {
  render(<App />);
  // Checks for the header text we added to the sidebar
  const favTitle = screen.getByText(/Favourites Zone/i);
  expect(favTitle).toBeInTheDocument();
});

// TEST 5: Does the Clear Favourites button exist?
test('renders clear favourites button', () => {
  render(<App />);
  // Looks for the button by its accessible role and text name
  const clearButton = screen.getByRole('button', { name: /Clear Favourites/i });
  expect(clearButton).toBeInTheDocument();
});