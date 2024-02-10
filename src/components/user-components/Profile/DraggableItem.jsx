import React, { useState } from 'react';
import { useDrop } from 'react-dnd';

const DraggableItem = () => {
  const [image, setImage] = useState(null);

  // Function to handle image drop
  const handleDrop = (item, monitor) => {
    if (monitor) {
      const droppedFiles = monitor.getItem().files;
      console.log('drop');
      setImage(droppedFiles[0]);
    }
  };

  // Hook to enable drop functionality
  const [{ isOver }, drop] = useDrop({
    accept: 'image',
    drop: (item, monitor) => handleDrop(item, monitor),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      
    }),
  });

  // Function to handle file selection
  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
  };

  return (
    <div>
      <div
        ref={drop}
        style={{
          width: '100%',
          height: '10rem',
          border: isOver ? '2px solid #008000' : '2px dashed #aaaaaa',
          borderRadius: '5px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {image ? (
          <>
            <img src={URL.createObjectURL(image)} alt='Selected' style={{ maxWidth: '100px', maxHeight: '100px' }} />
          </>
        ) : (
          <>
            <p>Drop image here or click to select</p>
          </>
        )}
      </div>
      <input type='file' accept='image/*' onChange={handleFileSelect} style={{ marginTop: '10px' }} />
    </div>
  );
};

export default DraggableItem;
