import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'; 
import data from '../data/properties.json'; 
import { FaHeart, FaArrowLeft } from 'react-icons/fa'; 

function PropertyPage({ addFavourite }) {
  const { id } = useParams(); 
  const property = data.properties.find(p => p.id === id); 

  // Initialize mainImage with the property's main picture
  const [mainImage, setMainImage] = useState(property ? property.picture : null);

  if (!property) {
    return <h2>Property not found!</h2>;
  }

  // UPDATED: Use the specific images from the JSON file
  // If 'images' array exists in JSON, use it. Otherwise, fallback to just the main picture.
  const images = property.images || [property.picture];

  return (
    <div className="property-page" style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* Back Button */}
      <Link to="/" style={{ textDecoration: 'none', color: '#333', display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <FaArrowLeft style={{ marginRight: '5px' }}/> Back to Search
      </Link>

      {/* Title Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
        <div>
            <h1 style={{margin: '0 0 10px 0'}}>{property.location}</h1>
            <h3 style={{margin: 0}}>{property.type} - £{property.price.toLocaleString()}</h3>
        </div>
        
        <button 
            onClick={() => addFavourite(property)}
            style={{ background: 'white', border: '1px solid #dc3545', color: '#dc3545', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
        >
            <FaHeart /> Save to Favourites
        </button>
      </div>

      {/* === GALLERY SECTION === */}
      <div className="gallery-container" style={{ margin: '20px 0' }}>
        
        {/* Large Main Image */}
        <div style={{ width: '100%', height: '500px', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px', borderRadius: '8px', overflow: 'hidden' }}>
            <img 
                src={`/${mainImage}`} 
                alt="Main View" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => { e.target.src = "https://via.placeholder.com/800x500?text=No+Image+Found"; }}
            />
        </div>
        
        {/* Thumbnails */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
            {images.map((img, index) => (
                <div 
                    key={index} 
                    onClick={() => setMainImage(img)}
                    style={{ 
                        height: '100px', 
                        cursor: 'pointer',
                        borderRadius: '4px',
                        overflow: 'hidden',
                        border: mainImage === img ? '3px solid #007bff' : '1px solid #ddd',
                        opacity: mainImage === img ? 1 : 0.7
                    }}
                >
                    <img 
                        src={`/${img}`} 
                        alt={`thumbnail-${index}`} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => { e.target.src = "https://via.placeholder.com/150?text=No+Img"; }}
                    />
                </div>
            ))}
        </div>
      </div>

      {/* === TABS SECTION === */}
      <Tabs style={{ marginTop: '30px' }}>
        <TabList style={{borderBottom: '1px solid #ccc', marginBottom: '20px'}}>
          <Tab>Description</Tab>
          <Tab>Floor Plan</Tab>
          <Tab>Map</Tab>
        </TabList>

        <TabPanel>
          <div style={{ padding: '20px', background: '#fff', border: '1px solid #eee', borderRadius: '8px', lineHeight: '1.6' }}>
            <h3 style={{marginTop: 0}}>Property Details</h3>
            <p>{property.description}</p>
            <hr style={{border: '0', borderTop: '1px solid #eee', margin: '20px 0'}}/>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px'}}>
                {/* Note: Ensure property.tenure exists in your JSON or this might be blank */}
                <p><strong>Tenure:</strong> {property.tenure || 'Freehold'}</p>
                <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
                <p><strong>Added:</strong> {property.added.day} {property.added.month} {property.added.year}</p>
                <p><strong>Postcode:</strong> {property.postcode}</p>
            </div>
          </div>
        </TabPanel>

        <TabPanel>
          <div style={{ padding: '40px', background: '#f9f9f9', border: '1px solid #eee', borderRadius: '8px', textAlign: 'center', minHeight: '300px' }}>
            <h3>Floor Plan</h3>
            <p>Interactive floor plan would be displayed here.</p>
          </div>
        </TabPanel>

        <TabPanel>
          <div style={{ padding: '40px', background: '#eef', border: '1px solid #eee', borderRadius: '8px', textAlign: 'center', minHeight: '300px' }}>
             <h3>Map View</h3>
             <p>Google Maps integration would go here showing: <strong>{property.location}</strong></p>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default PropertyPage;