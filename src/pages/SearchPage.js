import React, { useState, useEffect } from 'react';
import PropertyCard from '../components/PropertyCard';
import data from '../data/properties.json'; // Importing your JSON data

function SearchPage() {
  // 1. STATE: Holds all properties and the user's search inputs
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({
    type: 'any',
    minPrice: 0,
    maxPrice: 1000000,
    minBedrooms: 0,
    maxBedrooms: 10,
    dateFrom: '',
    dateTo: '',
    postcode: ''
  });

  // 2. LOAD DATA: When the page loads, set the properties from JSON
  useEffect(() => {
    setProperties(data.properties);
  }, []);

  // 3. HANDLE CHANGE: Updates state when user types in the form
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  // 4. SEARCH LOGIC: The "Brain" of the app
  const filteredProperties = properties.filter(property => {
    // Check Type (House/Flat/Any)
    const typeMatch = filters.type === 'any' || property.type === filters.type;
    
    // Check Price
    const priceMatch = property.price >= Number(filters.minPrice) && property.price <= Number(filters.maxPrice);
    
    // Check Bedrooms
    const bedMatch = property.bedrooms >= Number(filters.minBedrooms) && property.bedrooms <= Number(filters.maxBedrooms);
    
    // Check Postcode (Search for "BR1", "NW1" etc)
    const postcodeMatch = filters.postcode === '' || property.location.toLowerCase().includes(filters.postcode.toLowerCase());

    // Check Date (Complex logic to parse Month/Day/Year)
    let dateMatch = true;
    if (filters.dateFrom || filters.dateTo) {
      // Create a JavaScript Date object from the property data
      const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      const monthIndex = monthNames.indexOf(property.added.month);
      const propertyDate = new Date(property.added.year, monthIndex, property.added.day);
      
      if (filters.dateFrom && new Date(filters.dateFrom) > propertyDate) dateMatch = false;
      if (filters.dateTo && new Date(filters.dateTo) < propertyDate) dateMatch = false;
    }

    // RETURN: If all match, keep the property
    return typeMatch && priceMatch && bedMatch && postcodeMatch && dateMatch;
  });

  // 5. RENDER: The Search Form and the Results List
  return (
    <div style={{ padding: '20px' }}>
      <h1>Find Your Dream Home</h1>
      
      {/* SEARCH FORM */}
      <div className="search-form" style={{ background: '#f4f4f4', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          
          {/* Type Filter */}
          <label>
            Type:
            <select name="type" onChange={handleFilterChange}>
              <option value="any">Any</option>
              <option value="House">House</option>
              <option value="Flat">Flat</option>
            </select>
          </label>

          {/* Postcode Filter */}
          <label>
            Postcode Area (e.g. BR1):
            <input type="text" name="postcode" placeholder="Postcode..." onChange={handleFilterChange} />
          </label>

          {/* Price Filters */}
          <label>Min Price: <input type="number" name="minPrice" value={filters.minPrice} onChange={handleFilterChange} /></label>
          <label>Max Price: <input type="number" name="maxPrice" value={filters.maxPrice} onChange={handleFilterChange} /></label>

          {/* Bedroom Filters */}
          <label>Min Beds: <input type="number" name="minBedrooms" value={filters.minBedrooms} onChange={handleFilterChange} /></label>
          <label>Max Beds: <input type="number" name="maxBedrooms" value={filters.maxBedrooms} onChange={handleFilterChange} /></label>

          {/* Date Filters */}
          <label>Added After: <input type="date" name="dateFrom" onChange={handleFilterChange} /></label>
          <label>Added Before: <input type="date" name="dateTo" onChange={handleFilterChange} /></label>
        </div>
      </div>

      {/* RESULTS LIST */}
      <div className="results-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {filteredProperties.length > 0 ? (
          filteredProperties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))
        ) : (
          <p>No properties match your search.</p>
        )}
      </div>
    </div>
  );
}

export default SearchPage;