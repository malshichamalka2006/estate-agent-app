import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import PropertyPage from './pages/PropertyPage';
import './App.css';

function App() {
  // 1. STATE: List of saved properties
  const [favourites, setFavourites] = useState([]);
  
  // 2. STATE: The popup message (null means hidden)
  const [notification, setNotification] = useState(null);

  // Helper: Add to favourites
  const addFavourite = (property) => {
    // Check if it's already in the list to prevent duplicates
    if (!favourites.some(fav => fav.id === property.id)) {
      setFavourites([...favourites, property]);
      
      // TRIGGER THE POPUP
      setNotification(`✅ ${property.type} added to favourites!`);
      
      // Auto-hide after 3 seconds
      setTimeout(() => {
        setNotification(null);
      }, 3000);
      
    } else {
      // Optional: You could show a red error notification here instead
      alert("Property already in favourites!");
    }
  };

  // Helper: Remove from favourites
  const removeFavourite = (propertyId) => {
    setFavourites(favourites.filter(fav => fav.id !== propertyId));
  };

  // Helper: Clear all favourites
  const clearFavourites = () => {
    setFavourites([]);
  };

  return (
    <Router>
      <div className="App">
        
        {/* TOAST NOTIFICATION COMPONENT */}
        {/* This only renders if 'notification' has text */}
        {notification && (
          <div className="toast-notification">
            {notification}
          </div>
        )}

        {/* ROUTES */}
        <Routes>
          <Route 
            path="/" 
            element={
              <SearchPage 
                favourites={favourites} 
                addFavourite={addFavourite} 
                removeFavourite={removeFavourite} 
                clearFavourites={clearFavourites}
              />
            } 
          />
          <Route 
            path="/property/:id" 
            element={
              <PropertyPage 
                addFavourite={addFavourite} 
              />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;