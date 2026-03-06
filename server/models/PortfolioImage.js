import mongoose from 'mongoose';

const portfolioImageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Wedding', 'Events', 'Baby', 'Outdoor', 'Engagement', 'PreWedding'],
    required: true
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('PortfolioImage', portfolioImageSchema);
