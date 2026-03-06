import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { portfolioService, contactService, serviceService } from '../services/api';

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('upload');
  const [images, setImages] = useState([]);
  const [messages, setMessages] = useState([]);
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Wedding',
    image: null
  });
  const [serviceFormData, setServiceFormData] = useState({
    title: '',
    description: '',
    image: ''
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (activeTab === 'images') fetchImages();
    if (activeTab === 'messages') fetchMessages();
    if (activeTab === 'services') fetchServices();
  }, [activeTab]);

  const fetchImages = async () => {
    try {
      const response = await portfolioService.getAllImages();
      setImages(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await contactService.getAllMessages();
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await serviceService.getAllServices();
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file
      });
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

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
        setFormData({
          ...formData,
          image: file
        });

        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');

    try {
      const uploadFormData = new FormData();
      uploadFormData.append('title', formData.title);
      uploadFormData.append('category', formData.category);
      uploadFormData.append('image', formData.image);

      await portfolioService.uploadImage(uploadFormData);
      setSuccess('Image uploaded successfully!');
      setFormData({ title: '', category: 'Wedding', image: null });
      setImagePreview(null);
      fetchImages();
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteImage = async (id) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      try {
        await portfolioService.deleteImage(id);
        fetchImages();
      } catch (error) {
        console.error('Error deleting image:', error);
      }
    }
  };

  const handleAddService = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await serviceService.createService(serviceFormData);
      setSuccess('Service added successfully!');
      setServiceFormData({ title: '', description: '', image: '' });
      fetchServices();
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Error adding service:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteService = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await serviceService.deleteService(id);
        fetchServices();
      } catch (error) {
        console.error('Error deleting service:', error);
      }
    }
  };

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Admin Dashboard</h1>
          <p className="text-xl text-gray-300">Welcome, {user?.name}</p>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            {success}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-300">
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-6 py-3 font-bold transition ${
              activeTab === 'upload'
                ? 'border-b-4 border-yellow-600 text-yellow-600'
                : 'text-gray-600 hover:text-yellow-600'
            }`}
          >
            Upload Portfolio
          </button>
          <button
            onClick={() => setActiveTab('images')}
            className={`px-6 py-3 font-bold transition ${
              activeTab === 'images'
                ? 'border-b-4 border-yellow-600 text-yellow-600'
                : 'text-gray-600 hover:text-yellow-600'
            }`}
          >
            Manage Images
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`px-6 py-3 font-bold transition ${
              activeTab === 'services'
                ? 'border-b-4 border-yellow-600 text-yellow-600'
                : 'text-gray-600 hover:text-yellow-600'
            }`}
          >
            Manage Services
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`px-6 py-3 font-bold transition ${
              activeTab === 'messages'
                ? 'border-b-4 border-yellow-600 text-yellow-600'
                : 'text-gray-600 hover:text-yellow-600'
            }`}
          >
            Contact Messages
          </button>
        </div>

        {/* Upload Portfolio Tab */}
        {activeTab === 'upload' && (
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold mb-6">Upload Portfolio Image</h2>
            <form onSubmit={handleUploadSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-bold mb-2">Image Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="form-input"
                  placeholder="e.g., Wedding Ceremony"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="form-input"
                >
                  <option>Wedding</option>
                  <option>Events</option>
                  <option>Baby</option>
                  <option>Outdoor</option>
                  <option>PreWedding</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2">Upload Image</label>
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
                    onChange={handleImageChange}
                    accept="image/*"
                    required={!formData.image}
                    className="hidden"
                    id="image-input"
                  />
                  <label htmlFor="image-input" className="cursor-pointer">
                    <div className="text-gray-600 font-semibold mb-2">
                      Drag and drop your image here
                    </div>
                    <div className="text-sm text-gray-500">or click to browse</div>
                  </label>
                </div>
                {formData.image && (
                  <p className="text-green-600 text-sm mt-2">
                    ✓ {formData.image.name} selected
                  </p>
                )}
              </div>

              {imagePreview && (
                <div>
                  <label className="block text-gray-700 font-bold mb-2">Preview</label>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !formData.image}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Uploading...' : 'Upload Image'}
              </button>
            </form>
          </div>
        )}

        {/* Manage Images Tab */}
        {activeTab === 'images' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Portfolio Images ({images.length})</h2>
            {images.length === 0 ? (
              <div className="text-center text-gray-600 py-12">
                <p>No images uploaded yet. Start by uploading portfolio images!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {images.map((image) => (
                  <div key={image._id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition">
                    <div className="relative">
                      <img
                        src={image.imageUrl}
                        alt={image.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-yellow-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                        {image.category}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-2">{image.title}</h3>
                      <p className="text-xs text-gray-500 mb-4">
                        Uploaded: {new Date(image.createdAt).toLocaleDateString()}
                      </p>
                      <button
                        onClick={() => handleDeleteImage(image._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded w-full font-semibold transition"
                      >
                        Delete Image
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Manage Services Tab */}
        {activeTab === 'services' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
              <div>
                <h2 className="text-2xl font-bold mb-6">Add New Service</h2>
                <form onSubmit={handleAddService} className="space-y-6">
                  <div>
                    <label className="block text-gray-700 font-bold mb-2">Service Title</label>
                    <input
                      type="text"
                      value={serviceFormData.title}
                      onChange={(e) => setServiceFormData({ ...serviceFormData, title: e.target.value })}
                      required
                      className="form-input"
                      placeholder="e.g., Wedding Photography"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-bold mb-2">Description</label>
                    <textarea
                      value={serviceFormData.description}
                      onChange={(e) => setServiceFormData({ ...serviceFormData, description: e.target.value })}
                      required
                      rows="4"
                      className="form-input"
                      placeholder="Service description"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-bold mb-2">Image URL</label>
                    <input
                      type="url"
                      value={serviceFormData.image}
                      onChange={(e) => setServiceFormData({ ...serviceFormData, image: e.target.value })}
                      required
                      className="form-input"
                      placeholder="https://..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full"
                  >
                    {loading ? 'Adding...' : 'Add Service'}
                  </button>
                </form>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-6">Current Services ({services.length})</h2>
                <div className="space-y-4">
                  {services.map((service) => (
                    <div key={service._id} className="bg-gray-100 p-4 rounded-lg">
                      <h3 className="font-bold mb-2">{service.title}</h3>
                      <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                      <button
                        onClick={() => handleDeleteService(service._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded w-full"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Contact Messages ({messages.length})</h2>
            <div className="space-y-6">
              {messages.map((message) => (
                <div key={message._id} className="bg-white border rounded-lg p-6 shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold">{message.name}</h3>
                      <p className="text-sm text-gray-600">{message.email}</p>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(message.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2"><strong>Phone:</strong> {message.phone}</p>
                  <p className="text-gray-600"><strong>Message:</strong> {message.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
