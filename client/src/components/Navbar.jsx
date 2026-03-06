import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-gray-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-yellow-600">
            DP Studio
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="hover:text-yellow-600 transition">Home</Link>
            <Link to="/about" className="hover:text-yellow-600 transition">About</Link>
            <Link to="/services" className="hover:text-yellow-600 transition">Services</Link>
            <Link to="/portfolio" className="hover:text-yellow-600 transition">Portfolio</Link>
            <Link to="/contact" className="hover:text-yellow-600 transition">Contact</Link>

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm">Welcome, {user?.name}</span>
                {user?.role === 'admin' && (
                  <Link 
                    to="/dashboard" 
                    className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded transition"
                  >
                    Dashboard
                  </Link>
                )}
                <button 
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link 
                  to="/login" 
                  className="border border-yellow-600 hover:bg-yellow-600 px-4 py-2 rounded transition"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded transition"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-xl"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link to="/" className="block hover:text-yellow-600">Home</Link>
            <Link to="/about" className="block hover:text-yellow-600">About</Link>
            <Link to="/services" className="block hover:text-yellow-600">Services</Link>
            <Link to="/portfolio" className="block hover:text-yellow-600">Portfolio</Link>
            <Link to="/contact" className="block hover:text-yellow-600">Contact</Link>
            
            {isAuthenticated ? (
              <>
                {user?.role === 'admin' && (
                  <Link 
                    to="/dashboard" 
                    className="block bg-yellow-600 px-4 py-2 rounded"
                  >
                    Dashboard
                  </Link>
                )}
                <button 
                  onClick={handleLogout}
                  className="block w-full text-left bg-red-600 px-4 py-2 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="block border border-yellow-600 px-4 py-2 rounded"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="block bg-yellow-600 px-4 py-2 rounded"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
