import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import PropertyPage from './pages/PropertyPage';
import './App.css';

function App() {
  const [favourites, setFavourites] = useState([]);
  const [notification, setNotification] = useState(null);

  const addFavourite = (property) => {
    if (!favourites.some(fav => fav.id === property.id)) {
      setFavourites([...favourites, property]);
      setNotification(`✅ ${property.type} added to favourites!`);
      setTimeout(() => setNotification(null), 3000);
    } else {
      alert("Property already in favourites!");
    }
  };

  const removeFavourite = (propertyId) => {
    setFavourites(favourites.filter(fav => fav.id !== propertyId));
  };

  const clearFavourites = () => {
    setFavourites([]);
  };

  return (
    <Router>
      <div className="App">
        {notification && <div className="toast-notification">{notification}</div>}
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
            element={<PropertyPage addFavourite={addFavourite} />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;