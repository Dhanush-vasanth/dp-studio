import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import User from './models/User.js';
import Service from './models/Service.js';
import PortfolioImage from './models/PortfolioImage.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

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
        image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop'
      },
      {
        title: 'Pre-Wedding Shoot',
        description: 'Romantic pre-wedding sessions at scenic locations. Create timeless memories before your big day with stunning outdoor photography.',
        image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=600&fit=crop'
      },
      {
        title: 'Outdoor Photography',
        description: 'Beautiful outdoor photography sessions at scenic locations. Perfect for couples, family portraits, and nature shoots.',
        image: 'https://images.unsplash.com/photo-1516035069371-29c4764c5ce0?w=800&h=600&fit=crop'
      },
      {
        title: 'Baby Shoot',
        description: 'Capture your newborn and baby milestones. Beautiful, safe, and professional photography for your precious moments with expert handling.',
        image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&h=600&fit=crop'
      },
      {
        title: 'Event Photography',
        description: 'Professional coverage for corporate events, parties, and celebrations. Document every important moment with multiple photographers and angles.',
        image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop'
      }
    ];

    await Service.insertMany(services);
    console.log('Created services');

    // Create portfolio images
    const portfolioImages = [
      // Wedding (12 images)
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
      {
        title: 'Bride Portrait',
        imageUrl: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&h=600&fit=crop',
        category: 'Wedding',
        uploadedBy: adminUser._id
      },
      {
        title: 'Wedding Rings Exchange',
        imageUrl: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&h=600&fit=crop',
        category: 'Wedding',
        uploadedBy: adminUser._id
      },
      {
        title: 'Wedding Reception',
        imageUrl: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=600&fit=crop',
        category: 'Wedding',
        uploadedBy: adminUser._id
      },
      {
        title: 'Bride and Bridesmaids',
        imageUrl: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&h=600&fit=crop',
        category: 'Wedding',
        uploadedBy: adminUser._id
      },
      {
        title: 'Groom Getting Ready',
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
        category: 'Wedding',
        uploadedBy: adminUser._id
      },
      {
        title: 'Wedding Cake Cutting',
        imageUrl: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=800&h=600&fit=crop',
        category: 'Wedding',
        uploadedBy: adminUser._id
      },
      {
        title: 'Romantic Wedding Moment',
        imageUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&h=600&fit=crop',
        category: 'Wedding',
        uploadedBy: adminUser._id
      },
      {
        title: 'Wedding Bouquet',
        imageUrl: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&h=600&fit=crop',
        category: 'Wedding',
        uploadedBy: adminUser._id
      },
      {
        title: 'Wedding Venue Decor',
        imageUrl: 'https://images.unsplash.com/photo-1478146059981-8eff1e30b78d?w=800&h=600&fit=crop',
        category: 'Wedding',
        uploadedBy: adminUser._id
      },
      // Pre-Wedding (10 images)
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
      {
        title: 'Couple in Nature',
        imageUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&h=600&fit=crop',
        category: 'PreWedding',
        uploadedBy: adminUser._id
      },
      {
        title: 'Urban Couple Shoot',
        imageUrl: 'https://images.unsplash.com/photo-1522556189639-b150ed9c4330?w=800&h=600&fit=crop',
        category: 'PreWedding',
        uploadedBy: adminUser._id
      },
      {
        title: 'Romantic Garden Walk',
        imageUrl: 'https://images.unsplash.com/photo-1529634117570-ba7e06c6f789?w=800&h=600&fit=crop',
        category: 'PreWedding',
        uploadedBy: adminUser._id
      },
      {
        title: 'Couple at Golden Hour',
        imageUrl: 'https://images.unsplash.com/photo-1523438097201-512ae7d59c44?w=800&h=600&fit=crop',
        category: 'PreWedding',
        uploadedBy: adminUser._id
      },
      {
        title: 'Cafe Date Shoot',
        imageUrl: 'https://images.unsplash.com/photo-1516589091380-5d8e87df6999?w=800&h=600&fit=crop',
        category: 'PreWedding',
        uploadedBy: adminUser._id
      },
      {
        title: 'Couple Laughing Together',
        imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&h=600&fit=crop',
        category: 'PreWedding',
        uploadedBy: adminUser._id
      },
      {
        title: 'Romantic Picnic',
        imageUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&h=600&fit=crop',
        category: 'PreWedding',
        uploadedBy: adminUser._id
      },
      // Baby (10 images)
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
      {
        title: 'Baby Smiling',
        imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600&fit=crop',
        category: 'Baby',
        uploadedBy: adminUser._id
      },
      {
        title: 'Baby with Parents',
        imageUrl: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=600&fit=crop',
        category: 'Baby',
        uploadedBy: adminUser._id
      },
      {
        title: 'Baby First Birthday',
        imageUrl: 'https://images.unsplash.com/photo-1520483601560-4b97c78b3c75?w=800&h=600&fit=crop',
        category: 'Baby',
        uploadedBy: adminUser._id
      },
      {
        title: 'Toddler Playing',
        imageUrl: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=600&fit=crop',
        category: 'Baby',
        uploadedBy: adminUser._id
      },
      {
        title: 'Baby in Basket',
        imageUrl: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&h=600&fit=crop',
        category: 'Baby',
        uploadedBy: adminUser._id
      },
      {
        title: 'Baby Feet Close-up',
        imageUrl: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&h=600&fit=crop',
        category: 'Baby',
        uploadedBy: adminUser._id
      },
      {
        title: 'Siblings with Newborn',
        imageUrl: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=600&fit=crop',
        category: 'Baby',
        uploadedBy: adminUser._id
      },
      // Outdoor (10 images)
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
      {
        title: 'Sunset Beach Session',
        imageUrl: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&h=600&fit=crop',
        category: 'Outdoor',
        uploadedBy: adminUser._id
      },
      {
        title: 'Lake Portrait',
        imageUrl: 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=800&h=600&fit=crop',
        category: 'Outdoor',
        uploadedBy: adminUser._id
      },
      {
        title: 'Waterfall Adventure',
        imageUrl: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&h=600&fit=crop',
        category: 'Outdoor',
        uploadedBy: adminUser._id
      },
      {
        title: 'Desert Landscape Shoot',
        imageUrl: 'https://images.unsplash.com/photo-1516541196182-6bdb0516ed27?w=800&h=600&fit=crop',
        category: 'Outdoor',
        uploadedBy: adminUser._id
      },
      {
        title: 'Garden Portrait Session',
        imageUrl: 'https://images.unsplash.com/photo-1516714819001-8ee7a13b71d7?w=800&h=600&fit=crop',
        category: 'Outdoor',
        uploadedBy: adminUser._id
      },
      {
        title: 'Countryside Photoshoot',
        imageUrl: 'https://images.unsplash.com/photo-1502224562085-639556652f33?w=800&h=600&fit=crop',
        category: 'Outdoor',
        uploadedBy: adminUser._id
      },
      {
        title: 'Autumn Forest Session',
        imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop',
        category: 'Outdoor',
        uploadedBy: adminUser._id
      },
      // Events (10 images)
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
      },
      {
        title: 'Corporate Event',
        imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop',
        category: 'Events',
        uploadedBy: adminUser._id
      },
      {
        title: 'Birthday Party',
        imageUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=600&fit=crop',
        category: 'Events',
        uploadedBy: adminUser._id
      },
      {
        title: 'Conference Coverage',
        imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop',
        category: 'Events',
        uploadedBy: adminUser._id
      },
      {
        title: 'Anniversary Celebration',
        imageUrl: 'https://images.unsplash.com/photo-1464347744102-11db6282f854?w=800&h=600&fit=crop',
        category: 'Events',
        uploadedBy: adminUser._id
      },
      {
        title: 'Graduation Ceremony',
        imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop',
        category: 'Events',
        uploadedBy: adminUser._id
      },
      {
        title: 'Festival Coverage',
        imageUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=600&fit=crop',
        category: 'Events',
        uploadedBy: adminUser._id
      },
      {
        title: 'Gala Night',
        imageUrl: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&h=600&fit=crop',
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
