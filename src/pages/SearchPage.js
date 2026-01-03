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
        
        {/* LEFT SIDE: SEARCH & RESULTS */}
        <div style={{ flex: 3 }}>
            <h1>Find Your Dream Home</h1>
            <div className="search-form" style={{ background: '#f4f4f4', padding: '15px', marginBottom: '20px', borderRadius: '8px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <label>Type: <select name="type" onChange={handleFilterChange}><option value="any">Any</option><option value="House">House</option><option value="Flat">Flat</option></select></label>
                    <label>Postcode: <input type="text" name="postcode" placeholder="e.g. BR1" onChange={handleFilterChange}/></label>
                    <label>Min Price: <input type="number" name="minPrice" value={filters.minPrice} onChange={handleFilterChange}/></label>
                    <label>Max Price: <input type="number" name="maxPrice" value={filters.maxPrice} onChange={handleFilterChange}/></label>
                </div>
            </div>

            <Droppable droppableId="property-list" isDropDisabled={true}>
                {(provided) => (
                    <div 
                        className="results-list" 
                        {...provided.droppableProps} 
                        ref={provided.innerRef}
                        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '15px' }}
                    >
                        {filteredProperties.map((property, index) => (
                            <Draggable key={property.id} draggableId={property.id} index={index}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
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
        </div>

        {/* RIGHT SIDE: FAVOURITES SECTION */}
        <div className="favourites-sidebar" style={{ flex: 1, border: '2px dashed green', padding: '10px', background: '#eeffee', minHeight: '500px', marginLeft: '20px' }}>
            <h2 style={{color: 'green'}}>Favourites Zone</h2>
            
            <button onClick={clearFavourites} style={{width: '100%', padding: '5px', background: 'red', color: 'white', border: 'none', cursor: 'pointer', marginBottom: '10px'}}>
                Clear Favourites
            </button>

            <Droppable droppableId="favourites-zone">
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{ 
                            minHeight: '300px', 
                            backgroundColor: snapshot.isDraggingOver ? '#c3ffc3' : 'transparent'
                        }}
                    >
                        {favourites.length === 0 && <p style={{textAlign: 'center', color: '#666'}}>Drag houses here!</p>}
                        
                        {favourites.map((fav, index) => (
                             <div key={fav.id} style={{ border: '1px solid #ccc', padding: '10px', background: 'white', marginBottom: '5px' }}>
                                <b>{fav.type}</b> <br/> {fav.location}
                                <button onClick={() => removeFavourite(fav.id)} style={{fontSize: '0.8rem', color: 'red', marginTop: '5px'}}>Remove</button>
                             </div>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>

      </div>
    </DragDropContext>
  );
}

export default SearchPage;