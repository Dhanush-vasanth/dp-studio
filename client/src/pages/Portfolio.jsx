import { useState, useEffect } from 'react';
import ImageLightbox from '../components/ImageLightbox';
import { portfolioService } from '../services/api';

const Portfolio = () => {
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Wedding', 'Events', 'Baby', 'Outdoor', 'PreWedding'];

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await portfolioService.getAllImages();
      setImages(response.data);
      setFilteredImages(response.data);
    } catch (error) {
      console.error('Error fetching portfolio images:', error);
      // Set default images for demo
      setImages(getDefaultImages());
      setFilteredImages(getDefaultImages());
    } finally {
      setLoading(false);
    }
  };

  const getDefaultImages = () => {
    return [
      {
        _id: '1',
        title: 'Beautiful Wedding Ceremony',
        category: 'Wedding',
        imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=500&h=400&fit=crop'
      },
      {
        _id: '2',
        title: 'Couple Portrait',
        category: 'Wedding',
        imageUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=500&h=400&fit=crop'
      },
      {
        _id: '3',
        title: 'Event Celebration',
        category: 'Events',
        imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&h=400&fit=crop'
      },
      {
        _id: '4',
        title: 'Baby Portrait',
        category: 'Baby',
        imageUrl: 'https://images.unsplash.com/photo-1493517792181-cc1b2b5e9f14?w=500&h=400&fit=crop'
      },
      {
        _id: '5',
        title: 'Outdoor Photoshoot',
        category: 'Outdoor',
        imageUrl: 'https://images.unsplash.com/photo-1516035069371-29c4764c5ce0?w=500&h=400&fit=crop'
      },
    ];
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredImages(images);
    } else {
      setFilteredImages(images.filter(img => img.category === category));
    }
  };

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Portfolio</h1>
          <p className="text-xl text-gray-300">Explore Our Recent Works</p>
        </div>
      </section>

      {/* Gallery */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        {/* Category Filter */}
        <div className="mb-12 flex flex-wrap gap-3 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-6 py-2 rounded-lg transition ${
                selectedCategory === category
                  ? 'bg-yellow-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="text-center">Loading portfolio...</div>
        ) : filteredImages.length > 0 ? (
          <>
            <div className="gallery-grid">
              {filteredImages.map((image) => (
                <div
                  key={image._id}
                  className="relative bg-gray-200 rounded-lg overflow-hidden cursor-pointer group"
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image.imageUrl}
                    alt={image.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-end justify-start">
                    <div className="bg-black bg-opacity-70 text-white p-4 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="font-bold">{image.title}</h3>
                      <p className="text-sm text-gray-300">{image.category}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center text-gray-600">
            No images found in this category
          </div>
        )}
      </section>

      {/* Lightbox */}
      <ImageLightbox 
        image={selectedImage} 
        onClose={() => setSelectedImage(null)}
      />
    </div>
  );
};

export default Portfolio;
