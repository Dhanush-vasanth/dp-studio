import { useState } from 'react';

const ImageLightbox = ({ image, onClose }) => {
  if (!image) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className="relative max-w-3xl max-h-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <img 
          src={image.imageUrl} 
          alt={image.title}
          className="w-full h-full object-contain"
        />
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-3xl bg-black bg-opacity-50 w-10 h-10 flex items-center justify-center rounded-full hover:bg-opacity-75"
        >
          ×
        </button>
        <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-70 text-white p-4 rounded">
          <h3 className="text-xl font-bold">{image.title}</h3>
          <p className="text-sm">{image.category}</p>
        </div>
      </div>
    </div>
  );
};

export default ImageLightbox;
