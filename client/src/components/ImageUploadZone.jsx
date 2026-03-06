import { useState } from 'react';

const ImageUploadZone = ({ onImageSelect, preview, fileName }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        onImageSelect(file);
      }
    }
  };

  return (
    <div>
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition ${
          dragActive
            ? 'border-yellow-600 bg-yellow-50'
            : 'border-gray-300 hover:border-yellow-600'
        }`}
      >
        <input
          type="file"
          onChange={(e) => onImageSelect(e.target.files[0])}
          accept="image/*"
          className="hidden"
          id="image-input"
        />
        <label htmlFor="image-input" className="cursor-pointer">
          <div className="text-2xl mb-2">📷</div>
          <div className="text-gray-600 font-semibold mb-2">
            Drag and drop your image here
          </div>
          <div className="text-sm text-gray-500">or click to browse</div>
        </label>
      </div>

      {fileName && (
        <p className="text-green-600 text-sm mt-2 flex items-center gap-1">
          <span>✓</span> {fileName}
        </p>
      )}

      {preview && (
        <div className="mt-6">
          <p className="text-gray-700 font-semibold mb-3">Preview</p>
          <img
            src={preview}
            alt="Preview"
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploadZone;
