import { useState, useEffect } from 'react';
import ServiceCard from '../components/ServiceCard';
import { serviceService } from '../services/api';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await serviceService.getAllServices();
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const defaultServices = [
    {
      _id: '1',
      title: 'Wedding Photography',
      description: 'Complete wedding coverage from pre-wedding shoots to reception. Capture every beautiful moment of your special day.',
      image: '/uploads/wp1.jpg'
    },
    {
      _id: '2',
      title: 'Pre-Wedding Shoot',
      description: 'Romantic pre-wedding sessions at scenic locations. Create timeless memories before your big day.',
      image: '/uploads/pwp3.jpg'
    },
    {
      _id: '3',
      title: 'Outdoor Photography',
      description: 'Beautiful outdoor photography sessions at scenic locations. Perfect for couples and family portraits.',
      image: '/uploads/od1.jpg'
    },
    {
      _id: '4',
      title: 'Baby Shoot',
      description: 'Capture your newborn and baby milestones. Beautiful, safe, and professional photography for your precious moments.',
      image: '/uploads/bb1.jpg'
    },
    {
      _id: '5',
      title: 'Event Photography',
      description: 'Professional coverage for corporate events, parties, and celebrations. Document every important moment.',
      image: '/uploads/event2.jpg'
    }
  ];

  const displayServices = services.length > 0 ? services : defaultServices;

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl text-gray-300">Professional Photography for Every Occasion</p>
        </div>
      </section>

      {/* Services */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        {loading ? (
          <div className="text-center">Loading services...</div>
        ) : (
          <>
            <div className="gallery-grid">
              {displayServices.map((service) => (
                <ServiceCard key={service._id} service={service} />
              ))}
            </div>

            {/* Service Details */}
            <div className="mt-16 space-y-12">
              <div className="border-l-4 border-yellow-600 pl-6">
                <h3 className="text-2xl font-bold mb-3">Wedding Photography</h3>
                <p className="text-gray-600 mb-4">
                  Our signature wedding photography service covers your entire wedding day from getting ready 
                  to the grand reception. We capture candid moments, beautiful portraits, and all the intricate 
                  details that make your day special. Multiple photographers ensure no moment is missed.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>✓ Pre-wedding preparation coverage</li>
                  <li>✓ Ceremony documentation</li>
                  <li>✓ Reception and celebration</li>
                  <li>✓ Professional editing and albums</li>
                </ul>
              </div>

              <div className="border-l-4 border-yellow-600 pl-6">
                <h3 className="text-2xl font-bold mb-3">Event Photography</h3>
                <p className="text-gray-600 mb-4">
                  From corporate events to private celebrations, we provide comprehensive photography services 
                  that capture the essence of your event. Our experienced team works discreetly to document 
                  all the important moments.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>✓ Corporate events</li>
                  <li>✓ Birthday parties</li>
                  <li>✓ Anniversaries</li>
                  <li>✓ Product launches</li>
                </ul>
              </div>

              <div className="border-l-4 border-yellow-600 pl-6">
                <h3 className="text-2xl font-bold mb-3">Baby & Maternity</h3>
                <p className="text-gray-600 mb-4">
                  Celebrate the joy of new life with our beautiful baby and maternity photography. We create 
                  safe, comfortable sessions that result in timeless images you'll treasure forever.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>✓ Maternity portraits</li>
                  <li>✓ Newborn photography</li>
                  <li>✓ Baby milestone sessions</li>
                  <li>✓ Family portraits</li>
                </ul>
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default Services;
