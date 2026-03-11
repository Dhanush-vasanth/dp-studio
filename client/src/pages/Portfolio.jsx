import { useState, useEffect } from 'react';
import ImageLightbox from '../components/ImageLightbox';
import { portfolioService, getAssetUrl } from '../services/api';

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
        imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&q=80&w=500&h=400&fit=crop'
      },
      {
        _id: '2',
        title: 'Couple Portrait',
        category: 'Wedding',
        imageUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&q=80&w=500&h=400&fit=crop'
      },
      {
        _id: '3',
        title: 'Elegant Wedding Reception',
        category: 'Wedding',
        imageUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&q=80&w=500&h=400&fit=crop'
      },
      {
        _id: '4',
        title: 'Wedding Vows Exchange',
        category: 'Wedding',
        imageUrl: 'https://images.unsplash.com/photo-1531788752726-b67f8ffad3a6?ixlib=rb-4.0.3&q=80&w=500&h=400&fit=crop'
      },
      {
        _id: '5',
        title: 'Event Celebration',
        category: 'Events',
        imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&q=80&w=500&h=400&fit=crop'
      },
      {
        _id: '6',
        title: 'Grand Party Event',
        category: 'Events',
        imageUrl: 'https://images.unsplash.com/photo-1519671482677-e0e99c9fdd63?ixlib=rb-4.0.3&q=80&w=500&h=400&fit=crop'
      },
      {
        _id: '7',
        title: 'Corporate Event',
        category: 'Events',
        imageUrl: 'https://images.unsplash.com/photo-1540575467063-178f50002cbc?ixlib=rb-4.0.3&q=80&w=500&h=400&fit=crop'
      },
      {
        _id: '8',
        title: 'Birthday Celebration',
        category: 'Events',
        imageUrl: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-4.0.3&q=80&w=500&h=400&fit=crop'
      },
      {
        _id: '9',
        title: 'Baby Portrait',
        category: 'Baby',
        imageUrl: 'https://images.unsplash.com/photo-1493657671411-b21b27c24c74?ixlib=rb-4.0.3&q=80&w=500&h=400&fit=crop'
      },
      {
        _id: '10',
        title: 'Newborn Photography',
        category: 'Baby',
        imageUrl: 'https://images.unsplash.com/photo-1522898322262-3d45b8bd2a6e?ixlib=rb-4.0.3&q=80&w=500&h=400&fit=crop'
      },
      {
        _id: '11',
        title: 'Cute Baby Moments',
        category: 'Baby',
        imageUrl: 'https://images.unsplash.com/photo-1503454537706-e88874d11e9d?ixlib=rb-4.0.3&q=80&w=500&h=400&fit=crop'
      },
      {
        _id: '12',
        title: 'Family with Baby',
        category: 'Baby',
        imageUrl: 'https://images.unsplash.com/photo-1511104277397-bdc0205e3f4d?ixlib=rb-4.0.3&q=80&w=500&h=400&fit=crop'
      },
      {
        _id: '13',
        title: 'Outdoor Photoshoot',
        category: 'Outdoor',
        imageUrl: 'https://images.unsplash.com/photo-1516035069371-29c4764c5ce0?ixlib=rb-4.0.3&q=80&w=500&h=400&fit=crop'
      },
      {
        _id: '14',
        title: 'Mountain Adventure Photography',
        category: 'Outdoor',
        imageUrl: 'https://images.unsplash.com/photo-1495252585518-9e892cf1d4d7?ixlib=rb-4.0.3&q=80&w=500&h=400&fit=crop'
      },
      {
        _id: '15',
        title: 'Beach Portrait Session',
        category: 'Outdoor',
        imageUrl: 'https://images.unsplash.com/photo-1510316996212-50e0b5af6c5e?ixlib=rb-4.0.3&q=80&w=500&h=400&fit=crop'
      },
      {
        _id: '16',
        title: 'Nature Engagement',
        category: 'Outdoor',
        imageUrl: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?ixlib=rb-4.0.3&q=80&w=500&h=400&fit=crop'
      },
      {
        _id: '17',
        title: 'Pre-Wedding Shoot',
        category: 'PreWedding',
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&q=80&w=500&h=400&fit=crop'
      },
      {
        _id: '18',
        title: 'Romantic Pre-Wedding',
        category: 'PreWedding',
        imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&q=80&w=500&h=400&fit=crop'
      },
      {
        _id: '19',
        title: 'Prewedding at Sunset',
        category: 'PreWedding',
        imageUrl: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?ixlib=rb-4.0.3&q=80&w=500&h=400&fit=crop'
      },
      {
        _id: '20',
        title: 'Intimate Couple Moment',
        category: 'PreWedding',
        imageUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&q=80&w=500&h=400&fit=crop'
      }
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
                    src={getAssetUrl(image.imageUrl)}
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
