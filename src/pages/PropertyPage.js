import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'; // Standard CSS for tabs
import data from '../data/properties.json'; 

import { FaHeart, FaArrowLeft } from 'react-icons/fa'; // Icons

// STEP 7 UPDATE: We now accept '{ addFavourite }' as a prop
function PropertyPage({ addFavourite }) {
  const { id } = useParams(); // Get the ID from the URL (e.g., "prop1")
  const property = data.properties.find(p => p.id === id); // Find the house

  // State for the Image Gallery (Default to the main picture)
  const [mainImage, setMainImage] = useState(property ? property.picture : null);

  // Safety Check: If someone types a wrong URL
  if (!property) {
    return <h2>Property not found!</h2>;
  }

  // Gallery Images (Simulated array - in a real app, these would be in the JSON)
  const images = [
    property.picture,
    "kitchen.jpg",
    "livingroom.jpg",
    "bedroom.jpg"
  ];

  return (
    <div className="property-page" style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* Back Button */}
      <Link to="/" style={{ textDecoration: 'none', color: '#333', display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <FaArrowLeft style={{ marginRight: '5px' }}/> Back to Search
      </Link>

      {/* Title Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
            <h1>{property.location}</h1>
            <h3>{property.type} - £{property.price.toLocaleString()}</h3>
        </div>
        
        {/* STEP 7 UPDATE: The button now calls the addFavourite function */}
        <button 
            onClick={() => addFavourite(property)}
            style={{ background: 'transparent', border: '1px solid red', color: 'red', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
        >
            <FaHeart /> Save to Favourites
        </button>
      </div>

      {/* GALLERY SECTION (5% Marks) */}
      <div className="gallery-container" style={{ margin: '20px 0' }}>
        {/* Large Main Image */}
        <div style={{ width: '100%', height: '400px', backgroundColor: '#ddd', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
            <h2>Displaying: {mainImage}</h2>
        </div>
        
        {/* Thumbnails */}
        <div style={{ display: 'flex', gap: '10px' }}>
            {images.map((img, index) => (
                <div 
                    key={index} 
                    onClick={() => setMainImage(img)}
                    style={{ 
                        width: '100px', 
                        height: '80px', 
                        backgroundColor: '#eee', 
                        border: mainImage === img ? '2px solid blue' : '1px solid #ccc',
                        cursor: 'pointer',
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center'
                    }}
                >
                    <small>{img}</small>
                </div>
            ))}
        </div>
      </div>

      {/* TABS SECTION (7% Marks) */}
      <Tabs>
        <TabList>
          <Tab>Description</Tab>
          <Tab>Floor Plan</Tab>
          <Tab>Map</Tab>
        </TabList>

        <TabPanel>
          <div style={{ padding: '20px', background: '#fff', border: '1px solid #ccc' }}>
            <h3>Full Description</h3>
            <p>{property.description}</p>
            <p><strong>Tenure:</strong> {property.tenure}</p>
            <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
            <p><strong>Added:</strong> {property.added.day} {property.added.month} {property.added.year}</p>
          </div>
        </TabPanel>

        <TabPanel>
          <div style={{ padding: '20px', background: '#fff', border: '1px solid #ccc', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <h3>Floor Plan Image Goes Here</h3>
          </div>
        </TabPanel>

        <TabPanel>
          <div style={{ padding: '20px', background: '#fff', border: '1px solid #ccc', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <h3>Google Map Goes Here</h3>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default PropertyPage;