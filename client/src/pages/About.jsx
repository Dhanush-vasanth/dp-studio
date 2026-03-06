
import { getAssetUrl } from '../services/api';


const About = () => {
  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">About DP Studio</h1>
          <p className="text-xl text-gray-300">Professional Photography Excellence</p>
        </div>
      </section>

      {/* About Content */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-4xl font-bold mb-6">About Us</h2>
            <p className="text-gray-600 mb-4">
              DP Studio is a premier photography studio specializing in capturing life's 
              most precious moments. With a passion for visual storytelling and a commitment 
              to excellence, we've been creating stunning photography for weddings, events, 
              and special occasions.
            </p>
            <p className="text-gray-600 mb-4">
              Our team of experienced photographers combines technical expertise with 
              creative vision to deliver photographs that exceed expectations. Every 
              project is treated with the utmost care and attention to detail.
            </p>
          </div>
          <div className="bg-gray-300 rounded-lg overflow-hidden h-96">
            <img 
              src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=800&h=600&fit=crop" 
              alt="Studio"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Experience */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <h3 className="text-4xl font-bold text-yellow-600 mb-2">500+</h3>
            <p className="text-gray-600">Events Covered</p>
          </div>
          <div className="text-center">
            <h3 className="text-4xl font-bold text-yellow-600 mb-2">10+</h3>
            <p className="text-gray-600">Years Experience</p>
          </div>
          <div className="text-center">
            <h3 className="text-4xl font-bold text-yellow-600 mb-2">1000+</h3>
            <p className="text-gray-600">Happy Clients</p>
          </div>
        </div>

        {/* Equipment */}
        <div className="bg-gray-100 p-12 rounded-lg mb-16">
          <h2 className="text-3xl font-bold mb-6">Our Equipment</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold mb-2">Cameras</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Canon EOS 5D Mark IV</li>
                <li>• Canon EOS R5</li>
                <li>• Nikon D850</li>
                <li>• Sony A7RIII</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">Lenses</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 24-70mm f/2.8L</li>
                <li>• 70-200mm f/2.8L</li>
                <li>• 16-35mm f/2.8L</li>
                <li>• 50mm f/1.8</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">Lighting</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Professional LED Lights</li>
                <li>• Strobes & Flashes</li>
                <li>• Light Modifiers</li>
                <li>• Tripods & Stands</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">Accessories</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Drone Photography</li>
                <li>• Gimbals</li>
                <li>• Stabilizers</li>
                <li>• Studio Equipment</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Team */}
        <div>
          <h2 className="text-3xl font-bold mb-8 text-center">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Deepak Sharma', role: 'Lead Photographer', experience: '10+ years', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop' },
              { name: 'Priya Verma', role: 'Creative Director', experience: '8+ years', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop' },
              { name: 'Rahul Singh', role: 'Video Specialist', experience: '6+ years', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop' }
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="bg-gray-300 rounded-lg h-64 mb-4 flex items-center justify-center overflow-hidden">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
                <p className="text-yellow-600 text-sm">{member.experience}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
