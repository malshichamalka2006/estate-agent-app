import React from 'react';
import { Link } from 'react-router-dom';

function PropertyCard({ property }) {
  if (!property) return null;

  return (
    <div className="property-card">
      <div className="card-image-container">
        <img 
          // FIX: We add process.env.PUBLIC_URL to handle the sub-folder on GitHub
          src={property.picture ? `${process.env.PUBLIC_URL}/${property.picture}` : "https://via.placeholder.com/300x200"} 
          alt={property.type || "Property"}
          style={{ width: '100%', height: '200px', objectFit: 'cover', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}
          onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/300x200?text=No+Image+Found"; }}
        />
      </div>

      <div style={{ padding: '15px' }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '1.2rem' }}>
            {property.location || "Unknown Location"}
        </h3>
        <p style={{ margin: '5px 0' }}>
            {property.type} - {property.bedrooms} Beds
        </p>
        <p style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#28a745', margin: '10px 0' }}>
            £{property.price ? property.price.toLocaleString() : '0'}
        </p>
        
        <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
            <Link to={`/property/${property.id}`} style={{ flex: 1 }}>
                <button 
                    style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    View Details
                </button>
            </Link>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;