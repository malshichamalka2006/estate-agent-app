import '@testing-library/jest-dom'; 
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

// TEST 1: Does the main page render correctly?
test('renders the search page title', () => {
  render(<App />);
  // Note: If you changed your title to "FarmSmart", update this text to match!
  // regex /i means case insensitive
  const titleElement = screen.getByText(/Find Your Dream Home|FarmSmart/i);
  expect(titleElement).toBeInTheDocument();
});

// TEST 2: Do the properties load from JSON?
test('renders property cards', () => {
  render(<App />);
  // We look for a specific address from your JSON data
  const propertyLocation = screen.getByText(/Petts Wood Road/i);
  expect(propertyLocation).toBeInTheDocument();
});

// TEST 3: Does the Filter logic work?
test('filters properties when type is changed', () => {
  render(<App />);
  
  // 1. Find the dropdown
  const typeSelect = screen.getByLabelText(/Type:/i);
  
  // 2. Change value to 'Flat'
  fireEvent.change(typeSelect, { target: { value: 'Flat' } });
  
  // 3. Check that the House is gone
  const houseElement = screen.queryByText(/Petts Wood Road/i);
  expect(houseElement).not.toBeInTheDocument();

  // 4. Check that the Flat is visible
  const flatElement = screen.getByText(/Crofton Road/i);
  expect(flatElement).toBeInTheDocument();
});

// TEST 4: Does the Favourites Sidebar render?
test('renders the favourites sidebar', () => {
  render(<App />);
  const favTitle = screen.getByText(/Favourites/i);
  expect(favTitle).toBeInTheDocument();
});

// TEST 5: Does the Clear Favourites button exist?
test('renders clear favourites button', () => {
  render(<App />);
  // Using getByRole is the most robust way to find buttons
  const clearButton = screen.getByRole('button', { name: /Clear Favourites/i });
  expect(clearButton).toBeInTheDocument();
});