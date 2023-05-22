import React, { useState } from 'react';

interface SliderProps {
  images: string[];
}

const Slider: React.FC<SliderProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <img
          src={images[currentIndex]}
          alt={`Image ${currentIndex}`}
          style={{ minWidth: '340px', maxHeight: '400px', marginTop: '10px' }}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Image ${index}`}
            style={{
              width: '75px',
              height: '75px',
              objectFit: 'cover',
              margin: '5px',
              boxSizing: 'content-box',
              padding: '5px',
              border: index === currentIndex ? '1px solid #D81D24' : 'none',
              borderRadius: '25px',
              cursor: 'pointer',
            }}
            onClick={() => handleImageClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;