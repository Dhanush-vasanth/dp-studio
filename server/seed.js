import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Service from './models/Service.js';
import PortfolioImage from './models/PortfolioImage.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Service.deleteMany({});
    await PortfolioImage.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@dpstudio.com',
      password: 'admin123',
      role: 'admin'
    });
    await adminUser.save();
    console.log('Created admin user');

    // Create regular user
    const regularUser = new User({
      name: 'Regular User',
      email: 'user@dpstudio.com',
      password: 'user123',
      role: 'user'
    });
    await regularUser.save();
    console.log('Created regular user');

    // Create services
    const services = [
      {
        title: 'Wedding Photography',
        description: 'Complete wedding coverage from pre-wedding shoots to reception. Capture every beautiful moment of your special day with our experienced team.',
        image: '/uploads/wp1.jpg'
      },
      {
        title: 'Pre-Wedding Shoot',
        description: 'Romantic pre-wedding sessions at scenic locations. Create timeless memories before your big day with stunning outdoor photography.',
        image: '/uploads/pwp3.jpg'
      },
      {
        title: 'Outdoor Photography',
        description: 'Beautiful outdoor photography sessions at scenic locations. Perfect for couples, family portraits, and nature shoots.',
        image: '/uploads/od1.jpg'
      },
      {
        title: 'Baby Shoot',
        description: 'Capture your newborn and baby milestones. Beautiful, safe, and professional photography for your precious moments with expert handling.',
        image: '/uploads/bb1.jpg'
      },
      {
        title: 'Event Photography',
        description: 'Professional coverage for corporate events, parties, and celebrations. Document every important moment with multiple photographers and angles.',
        image: '/uploads/event1.jpg'
      }
    ];

    await Service.insertMany(services);
    console.log('Created services');

    // Create portfolio images
    const portfolioImages = [
      // Wedding
      {
        title: 'Bride & Groom First Kiss',
        imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop',
        category: 'Wedding',
        uploadedBy: adminUser._id
      },
      {
        title: 'Bride and Groom First Dance',
        imageUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=600&fit=crop',
        category: 'Wedding',
        uploadedBy: adminUser._id
      },
      {
        title: 'Wedding Ceremony',
        imageUrl: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&h=600&fit=crop',
        category: 'Wedding',
        uploadedBy: adminUser._id
      },
      // Pre-Wedding
      {
        title: 'Couple at Sunset',
        imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=600&fit=crop',
        category: 'PreWedding',
        uploadedBy: adminUser._id
      },
      {
        title: 'Romantic Beach Portrait',
        imageUrl: 'https://images.unsplash.com/photo-1606995613802-c8003a4f9e39?w=800&h=600&fit=crop',
        category: 'PreWedding',
        uploadedBy: adminUser._id
      },
      {
        title: 'Couple Adventure',
        imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
        category: 'PreWedding',
        uploadedBy: adminUser._id
      },
      // Baby
      {
        title: 'Newborn Portrait',
        imageUrl: 'https://images.unsplash.com/photo-1493657671411-b21b27c24c74?w=800&h=600&fit=crop',
        category: 'Baby',
        uploadedBy: adminUser._id
      },
      {
        title: 'Baby Milestone',
        imageUrl: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&h=600&fit=crop',
        category: 'Baby',
        uploadedBy: adminUser._id
      },
      {
        title: 'Newborn Sleep',
        imageUrl: 'https://images.unsplash.com/photo-1467571534411-620b28c4e6da?w=800&h=600&fit=crop',
        category: 'Baby',
        uploadedBy: adminUser._id
      },
      // Outdoor
      {
        title: 'Mountain Photoshoot',
        imageUrl: 'https://images.unsplash.com/photo-1516035069371-29c4764c5ce0?w=800&h=600&fit=crop',
        category: 'Outdoor',
        uploadedBy: adminUser._id
      },
      {
        title: 'Forest Photoshoot',
        imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop',
        category: 'Outdoor',
        uploadedBy: adminUser._id
      },
      {
        title: 'Nature Portrait',
        imageUrl: 'https://images.unsplash.com/photo-1552881388-8efb79a3e49c?w=800&h=600&fit=crop',
        category: 'Outdoor',
        uploadedBy: adminUser._id
      },
      // Events
      {
        title: 'Event Celebration',
        imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop',
        category: 'Events',
        uploadedBy: adminUser._id
      },
      {
        title: 'Concert Photography',
        imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=600&fit=crop',
        category: 'Events',
        uploadedBy: adminUser._id
      },
      {
        title: 'Party Moments',
        imageUrl: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&h=600&fit=crop',
        category: 'Events',
        uploadedBy: adminUser._id
      }
    ];

    await PortfolioImage.insertMany(portfolioImages);
    console.log('Created portfolio images');
    console.log('\nDemo Credentials:');
    console.log('Admin - Email: admin@dpstudio.com, Password: admin123');
    console.log('User - Email: user@dpstudio.com, Password: user123');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
