import React from 'react';
import { Link } from 'react-router-dom';

// We accept a 'property' object as a prop
function PropertyCard({ property }) {
  return (
    <div className="property-card" style={{ border: '1px solid #ddd', padding: '15px', margin: '10px', borderRadius: '8px' }}>
      {/* Image Placeholder - we will fix real images later */}
      <div style={{ backgroundColor: '#eee', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span>{property.picture}</span>
      </div>

      <h3>{property.type} - {property.location}</h3>
      <p className="price">£{property.price.toLocaleString()}</p>
      <p>{property.bedrooms} Bedrooms</p>
      <p>{property.description.substring(0, 60)}...</p>
      
      {/* Link to the details page */}
      <Link to={`/property/${property.id}`}>
        <button style={{ backgroundColor: '#007bff', color: 'white', padding: '10px', border: 'none', cursor: 'pointer' }}>
          View Details
        </button>
      </Link>
    </div>
  );
}

export default PropertyCard;