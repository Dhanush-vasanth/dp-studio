import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard';
import { serviceService, portfolioService } from '../services/api';

const Home = () => {
  const [services, setServices] = useState([]);
  const [portfolioImages, setPortfolioImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [servicesRes, portfolioRes] = await Promise.all([
          serviceService.getAllServices(),
          portfolioService.getAllImages()
        ]);
        setServices(servicesRes.data.slice(0, 3));
        setPortfolioImages(portfolioRes.data.slice(0, 6));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      text: 'DP Studio captured our wedding perfectly. Every moment was beautiful!',
      role: 'Groom'
    },
    {
      name: 'Priya Sharma',
      text: 'The pre-wedding photoshoot was amazing. Highly recommended!',
      role: 'Bride'
    },
    {
      name: 'Amit Gupta',
      text: 'Professional service and excellent quality. Best photography team ever!',
      role: 'Client'
    }
  ];

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section className="hero">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">DP Studio</h1>
          <p className="text-2xl mb-8">Capturing Life's Beautiful Moments</p>
          <Link to="/portfolio" className="btn-primary text-lg">
            View Portfolio
          </Link>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Welcome to DP Studio</h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            We specialize in capturing the most important moments of your life. 
            With years of experience and a passion for photography, we deliver 
            stunning images that tell your unique story.
          </p>
        </div>
      </section>

      {/* Services Preview */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <div className="gallery-grid mb-8">
              {services.map((service) => (
                <ServiceCard key={service._id} service={service} />
              ))}
            </div>
          )}
          <div className="text-center">
            <Link to="/services" className="btn-primary">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Portfolio Highlights</h2>
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <>
            <div className="gallery-grid mb-8">
              {portfolioImages.map((image) => (
                <div key={image._id} className="bg-gray-200 rounded overflow-hidden">
                  <img 
                    src={image.imageUrl} 
                    alt={image.title}
                    className="w-full h-64 object-cover hover:scale-110 transition-transform cursor-pointer"
                  />
                  <div className="p-4">
                    <h3 className="font-bold">{image.title}</h3>
                    <p className="text-sm text-gray-600">{image.category}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center">
              <Link to="/portfolio" className="btn-primary">
                View Full Portfolio
              </Link>
            </div>
          </>
        )}
      </section>

      {/* Testimonials */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-lg">
                <p className="text-yellow-600 mb-2">★★★★★</p>
                <p className="mb-4">{testimonial.text}</p>
                <div className="border-t border-gray-700 pt-4">
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-yellow-600 text-white py-16 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-4">Ready to Capture Your Moments?</h2>
          <p className="text-lg mb-8">Get in touch with us today</p>
          <Link to="/contact" className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-8 rounded-lg transition">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
