import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { contactService, serviceService, portfolioService } from '../services/api';

const Admin = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('messages');
  const [messages, setMessages] = useState([]);
  const [services, setServices] = useState([]);
  const [portfolioImages, setPortfolioImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [newService, setNewService] = useState({ title: '', description: '', price: '' });
  const [newImage, setNewImage] = useState({ title: '', category: '', imageUrl: '' });
  const [imageFile, setImageFile] = useState(null);
  const [uploadLoading, setUploadLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      navigate('/login');
      return;
    }

    fetchData();
  }, [isAuthenticated, isAdmin, navigate]);

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const [messagesRes, servicesRes, portfolioRes] = await Promise.all([
        contactService.getAllMessages(),
        serviceService.getAllServices(),
        portfolioService.getAllImages()
      ]);
      setMessages(messagesRes.data || []);
      setServices(servicesRes.data || []);
      setPortfolioImages(portfolioRes.data || []);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddService = async (e) => {
    e.preventDefault();
    if (!newService.title || !newService.description || !newService.price) {
      alert('Please fill all fields');
      return;
    }

    try {
      await serviceService.createService(newService);
      setNewService({ title: '', description: '', price: '' });
      fetchData();
      alert('Service added successfully!');
    } catch (err) {
      alert('Error adding service: ' + err.message);
    }
  };

  const handleDeleteService = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await serviceService.deleteService(id);
        fetchData();
        alert('Service deleted successfully!');
      } catch (err) {
        alert('Error deleting service: ' + err.message);
      }
    }
  };

  const handleAddImage = async (e) => {
    e.preventDefault();
    if (!newImage.title || !newImage.category) {
      alert('Please fill all required fields');
      return;
    }

    setUploadLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', newImage.title);
      formData.append('category', newImage.category);
      
      if (imageFile) {
        formData.append('image', imageFile);
      } else if (newImage.imageUrl) {
        formData.append('imageUrl', newImage.imageUrl);
      } else {
        alert('Please provide an image file or URL');
        setUploadLoading(false);
        return;
      }

      await portfolioService.uploadImage(formData);
      setNewImage({ title: '', category: '', imageUrl: '' });
      setImageFile(null);
      fetchData();
      alert('Image uploaded successfully!');
    } catch (err) {
      alert('Error uploading image: ' + err.message);
    } finally {
      setUploadLoading(false);
    }
  };

  const handleDeleteImage = async (id) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      try {
        await portfolioService.deleteImage(id);
        fetchData();
        alert('Image deleted successfully!');
      } catch (err) {
        alert('Error deleting image: ' + err.message);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="fade-in min-h-screen bg-gray-50">
      {/* Admin Header */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold">Admin Panel</h1>
            <button
              onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('isAdmin');
                navigate('/login');
              }}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>
        </div>
      </section>

      {/* Admin Content */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b overflow-x-auto">
          <button
            onClick={() => setActiveTab('messages')}
            className={`px-6 py-3 font-semibold transition whitespace-nowrap ${
              activeTab === 'messages'
                ? 'border-b-4 border-yellow-600 text-gray-900'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Client Messages ({messages.length})
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`px-6 py-3 font-semibold transition whitespace-nowrap ${
              activeTab === 'services'
                ? 'border-b-4 border-yellow-600 text-gray-900'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Services ({services.length})
          </button>
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`px-6 py-3 font-semibold transition whitespace-nowrap ${
              activeTab === 'portfolio'
                ? 'border-b-4 border-yellow-600 text-gray-900'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Portfolio ({portfolioImages.length})
          </button>
        </div>

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Client Messages & Requirements</h2>
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 py-12">
                No messages yet.
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg._id}
                    className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
                    onClick={() =>
                      setSelectedMessage(selectedMessage?._id === msg._id ? null : msg)
                    }
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold">{msg.name}</h3>
                        <p className="text-gray-600">{msg.email}</p>
                        <p className="text-gray-600">{msg.phone}</p>
                        <p className="text-sm text-gray-400 mt-2">
                          {new Date(msg.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {selectedMessage?._id === msg._id && (
                      <div className="mt-4 pt-4 border-t">
                        <p className="text-gray-700 whitespace-pre-wrap">{msg.message}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Services Tab */}
        {activeTab === 'services' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Add New Service Form */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow sticky top-8">
                <h3 className="text-xl font-bold mb-6">Add New Service</h3>
                <form onSubmit={handleAddService} className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-bold mb-2">
                      Service Title
                    </label>
                    <input
                      type="text"
                      value={newService.title}
                      onChange={(e) =>
                        setNewService({
                          ...newService,
                          title: e.target.value
                        })
                      }
                      className="form-input w-full"
                      placeholder="e.g., Wedding Photography"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-bold mb-2">
                      Description
                    </label>
                    <textarea
                      value={newService.description}
                      onChange={(e) =>
                        setNewService({
                          ...newService,
                          description: e.target.value
                        })
                      }
                      className="form-input w-full"
                      rows="4"
                      placeholder="Service description..."
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-bold mb-2">
                      Price
                    </label>
                    <input
                      type="number"
                      value={newService.price}
                      onChange={(e) =>
                        setNewService({
                          ...newService,
                          price: e.target.value
                        })
                      }
                      className="form-input w-full"
                      placeholder="0.00"
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full">
                    Add Service
                  </button>
                </form>
              </div>
            </div>

            {/* Services List */}
            <div className="lg:col-span-2">
              <h3 className="text-xl font-bold mb-6">Current Services</h3>
              {services.length === 0 ? (
                <div className="text-center text-gray-500 py-12">
                  No services yet. Add one from the form.
                </div>
              ) : (
                <div className="space-y-4">
                  {services.map((service) => (
                    <div
                      key={service._id}
                      className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-bold">{service.title}</h3>
                          <p className="text-gray-600 mt-2">{service.description}</p>
                          <p className="text-yellow-600 font-bold text-lg mt-3">
                            ${service.price}
                          </p>
                        </div>
                        <button
                          onClick={() => handleDeleteService(service._id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Portfolio Tab */}
        {activeTab === 'portfolio' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Add New Image Form */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow sticky top-8">
                <h3 className="text-xl font-bold mb-6">Add New Image</h3>
                <form onSubmit={handleAddImage} className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-bold mb-2">
                      Image Title
                    </label>
                    <input
                      type="text"
                      value={newImage.title}
                      onChange={(e) =>
                        setNewImage({
                          ...newImage,
                          title: e.target.value
                        })
                      }
                      className="form-input w-full"
                      placeholder="e.g., Wedding Ceremony"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-bold mb-2">
                      Category
                    </label>
                    <select
                      value={newImage.category}
                      onChange={(e) =>
                        setNewImage({
                          ...newImage,
                          category: e.target.value
                        })
                      }
                      className="form-input w-full"
                    >
                      <option value="">Select Category</option>
                      <option value="Wedding">Wedding</option>
                      <option value="Events">Events</option>
                      <option value="Baby">Baby</option>
                      <option value="Outdoor">Outdoor</option>
                      <option value="PreWedding">PreWedding</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-bold mb-2">
                      Image File
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImageFile(e.target.files[0])}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-bold mb-2">
                      Or Image URL
                    </label>
                    <input
                      type="url"
                      value={newImage.imageUrl}
                      onChange={(e) =>
                        setNewImage({
                          ...newImage,
                          imageUrl: e.target.value
                        })
                      }
                      className="form-input w-full"
                      placeholder="https://..."
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={uploadLoading}
                    className="btn-primary w-full"
                  >
                    {uploadLoading ? 'Uploading...' : 'Add Image'}
                  </button>
                </form>
              </div>
            </div>

            {/* Portfolio Images List */}
            <div className="lg:col-span-2">
              <h3 className="text-xl font-bold mb-6">Portfolio Images</h3>
              {portfolioImages.length === 0 ? (
                <div className="text-center text-gray-500 py-12">
                  No images yet. Add one from the form.
                </div>
              ) : (
                <div className="space-y-4">
                  {portfolioImages.map((image) => (
                    <div
                      key={image._id}
                      className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
                    >
                      <div className="flex gap-4">
                        <img 
                          src={image.imageUrl} 
                          alt={image.title}
                          className="w-24 h-24 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="text-lg font-bold">{image.title}</h3>
                          <p className="text-gray-600">Category: {image.category}</p>
                          <button
                            onClick={() => handleDeleteImage(image._id)}
                            className="mt-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Admin;
