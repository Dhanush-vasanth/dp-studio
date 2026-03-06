import ContactMessage from '../models/ContactMessage.js';

export const sendContactMessage = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const contactMessage = new ContactMessage({
      name,
      email,
      phone,
      message
    });

    await contactMessage.save();

    res.status(201).json({ 
      message: 'Message sent successfully',
      contact: contactMessage
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllContactMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
