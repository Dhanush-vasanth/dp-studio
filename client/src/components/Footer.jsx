import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold text-yellow-600 mb-4">DP Studio</h3>
            <p className="text-gray-400">
              Professional photography portfolio capturing life's beautiful moments.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/" className="hover:text-yellow-600 transition">Home</Link></li>
              <li><Link to="/about" className="hover:text-yellow-600 transition">About</Link></li>
              <li><Link to="/services" className="hover:text-yellow-600 transition">Services</Link></li>
              <li><Link to="/portfolio" className="hover:text-yellow-600 transition">Portfolio</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Wedding Photography</li>
              <li>Pre-Wedding Shoot</li>
              <li>Event Photography</li>
              <li>Baby Shoot</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Email: info@dpstudio.com</li>
              <li>Phone: +91 XXXX XXXX XX</li>
              <li>Address: City, State</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="text-center text-gray-400">
            <p>&copy; {currentYear} DP Studio. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
