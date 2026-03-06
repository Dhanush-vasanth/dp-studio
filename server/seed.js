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
        imageUrl: '/uploads/wp1.jpg',
        category: 'Wedding',
        uploadedBy: adminUser._id
      },
      {
        title: 'Bride and Groom First Dance',
        imageUrl: '/uploads/wp2.jpg',
        category: 'Wedding',
        uploadedBy: adminUser._id
      },
      {
        title: 'wedding ceremony',
        imageUrl: '/uploads/wp3.jpg',
        category: 'Wedding',
        uploadedBy: adminUser._id
      },
      // Pre-Wedding
      {
        title: 'Couple at Sunset',
        imageUrl: '/uploads/pwp1.jpg',
        category: 'PreWedding',
        uploadedBy: adminUser._id
      },
      {
        title: 'Romantic Beach Portrait',
        imageUrl: '/uploads/pwp2.jpg',
        category: 'PreWedding',
        uploadedBy: adminUser._id
      },
      {
        title: 'Couple Adventure',
        imageUrl: '/uploads/pwp3.jpg',
        category: 'PreWedding',
        uploadedBy: adminUser._id
      },

      // Baby
      {
        title: 'Newborn Portrait',
        imageUrl: '/uploads/bb3.jpg',
        category: 'Baby',
        uploadedBy: adminUser._id
      },
      {
        title: 'Baby Milestone',
        imageUrl: '/uploads/bb1.jpg',
        category: 'Baby',
        uploadedBy: adminUser._id
      },
      {
        title: 'Newborn',
        imageUrl: '/uploads/bb2.jpg',
        category: 'Baby',
        uploadedBy: adminUser._id
      },
      // Outdoor
      {
        title: 'norway photoshoot',
        imageUrl: '/uploads/od1.jpg',
        category: 'Outdoor',
        uploadedBy: adminUser._id
      },
      {
        title: 'greenland photoshoot',
        imageUrl: '/uploads/od2.jpg',
        category: 'Outdoor',
        uploadedBy: adminUser._id
      },
      {
        title: 'forest photoshoot',
        imageUrl: '/uploads/od3.jpg',
        category: 'Outdoor',
        uploadedBy: adminUser._id
      },
      // Events
      {
        title: 'Event Crowd',
        imageUrl: '/uploads/event1.jpg',
        category: 'Events',
        uploadedBy: adminUser._id
      },
      {
        title: 'music concert',
        imageUrl: '/uploads/event2.jpg',
        category: 'Events',
        uploadedBy: adminUser._id
      },
      {
        title: 'wedding reception',
        imageUrl: '/uploads/event3.jpg',
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
