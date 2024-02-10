import React, { useState } from 'react';

const ImageUploader = () => {
  const [droppedImages, setDroppedImages] = useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter((file) => file.type.startsWith('image'));
    const imageUrl = imageFiles.map((file) => URL.createObjectURL(file));
    setDroppedImages(imageUrl);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '10px' }}>
      <h1>Upload from your device</h1>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        style={{
          border: '2px dashed #aaaaaa',
          padding: '20px',
          textAlign: 'center',
          borderRadius: '5px',
          marginBottom: '20px',
        }}
      >
        {droppedImages ? (
          <img src={droppedImages} alt='Dropped' style={{ maxWidth: '200px', maxHeight: '200px' }} />
        ) : (
          !droppedImages && <p>Drag and drop images here</p>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
