import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import PropertyCard from '../components/PropertyCard';
import data from '../data/properties.json';

function SearchPage({ favourites, addFavourite, removeFavourite, clearFavourites }) {
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

  useEffect(() => {
    setProperties(data.properties);
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const filteredProperties = properties.filter(property => {
    const typeMatch = filters.type === 'any' || property.type === filters.type;
    const priceMatch = property.price >= Number(filters.minPrice) && property.price <= Number(filters.maxPrice);
    const bedMatch = property.bedrooms >= Number(filters.minBedrooms) && property.bedrooms <= Number(filters.maxBedrooms);
    const postcodeMatch = filters.postcode === '' || property.location.toLowerCase().includes(filters.postcode.toLowerCase());
    return typeMatch && priceMatch && bedMatch && postcodeMatch;
  });

  const onDragEnd = (result) => {
    if (!result.destination) return;
    if (result.destination.droppableId === 'favourites-zone') {
        const itemID = result.draggableId;
        const itemToAdd = properties.find(p => p.id === itemID);
        if (itemToAdd) addFavourite(itemToAdd);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="search-page-container">
        <h1>Find Your Dream Home</h1>
        
        {/* Search Form */}
        <div className="search-form">
            <div className="search-form-grid">
                <label>Type <select name="type" onChange={handleFilterChange}><option value="any">Any</option><option value="House">House</option><option value="Flat">Flat</option></select></label>
                <label>Postcode <input type="text" name="postcode" placeholder="e.g. BR1" onChange={handleFilterChange}/></label>
                <label>Min Price <input type="number" name="minPrice" value={filters.minPrice} onChange={handleFilterChange}/></label>
                <label>Max Price <input type="number" name="maxPrice" value={filters.maxPrice} onChange={handleFilterChange}/></label>
                <label>Min Beds <input type="number" name="minBedrooms" value={filters.minBedrooms} onChange={handleFilterChange}/></label>
                <label>Max Beds <input type="number" name="maxBedrooms" value={filters.maxBedrooms} onChange={handleFilterChange}/></label>
            </div>
        </div>

        {/* Results Grid */}
        <Droppable droppableId="property-list" isDropDisabled={true}>
            {(provided) => (
                <div 
                    className="results-list" 
                    {...provided.droppableProps} 
                    ref={provided.innerRef}
                >
                    {filteredProperties.length === 0 && <p>No properties match your search...</p>}
                    {filteredProperties.map((property, index) => (
                        <Draggable key={property.id} draggableId={property.id} index={index}>
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{ ...provided.draggableProps.style }}
                                >
                                    <PropertyCard property={property} />
                                </div>
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>

        {/* Floating Favourites Widget */}
        <div className="favourites-widget">
            <h3 style={{marginTop: 0, fontSize: '1.1rem', color: '#28a745'}}>Favourites Zone</h3>
            <Droppable droppableId="favourites-zone">
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{ 
                            minHeight: '100px', 
                            backgroundColor: snapshot.isDraggingOver ? '#e6fffa' : 'transparent',
                            transition: 'background-color 0.2s',
                            border: '1px dashed #ccc',
                            borderRadius: '4px',
                            padding: '5px'
                        }}
                    >
                        {favourites.length === 0 && <p style={{fontSize: '0.8rem', color: '#888', textAlign: 'center'}}>Drag here!</p>}
                        {favourites.map((fav, index) => (
                             <div key={fav.id} className="fav-item">
                                <div><strong>{fav.type}</strong><br/>£{fav.price.toLocaleString()}</div>
                                <button className="remove-btn" onClick={() => removeFavourite(fav.id)}>×</button>
                             </div>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            {favourites.length > 0 && (
                <button onClick={clearFavourites} style={{width: '100%', marginTop: '10px', padding: '5px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>
                    Clear Favourites
                </button>
            )}
        </div>
      </div>
    </DragDropContext>
  );
}

export default SearchPage;