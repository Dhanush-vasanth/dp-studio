import PortfolioImage from '../models/PortfolioImage.js';

export const getAllPortfolioImages = async (req, res) => {
  try {
    const { category } = req.query;
    let query = {};

    if (category) {
      query.category = category;
    }

    const images = await PortfolioImage.find(query).populate('uploadedBy', 'name');
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const uploadPortfolioImage = async (req, res) => {
  try {
    const { title, category } = req.body;

    if (!title || !category) {
      return res.status(400).json({ message: 'Please provide title and category' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Please upload an image' });
    }

    const portfolioImage = new PortfolioImage({
      title,
      category,
      imageUrl: req.file.path, // Cloudinary returns full URL in path property
      uploadedBy: req.userId
    });

    await portfolioImage.save();

    res.status(201).json({ 
      message: 'Portfolio image uploaded successfully',
      image: portfolioImage
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePortfolioImage = async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedImage = await PortfolioImage.findByIdAndDelete(id);
    
    if (!deletedImage) {
      return res.status(404).json({ message: 'Portfolio image not found' });
    }

    res.json({ message: 'Portfolio image deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
