const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Contact Schema
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  subject: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Contact Model
const Contact = mongoose.model('Contact', contactSchema);

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ggs699000@gmail.com',
    pass: 'uuwf ctzd uuvx rxhf'
  }
});

// Function to send email notification
const sendEmailNotification = async (contactData) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, 
      subject: `New Contact Form Submitted: ${contactData.subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${contactData.name}</p>
        <p><strong>Email:</strong> ${contactData.email}</p>
        <p><strong>Phone:</strong> ${contactData.phone}</p>
        <p><strong>Subject:</strong> ${contactData.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${contactData.message}</p>
        <p><strong>Submitted at:</strong> ${new Date(contactData.createdAt).toLocaleString()}</p>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email notification sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('Failed to send email notification:', error);
    return false;
  }
};

// Routes
app.post('/api/contact', async (req, res) => {
  try {
    const { name, phone, email, subject, message } = req.body;
    
    // Validate required fields
    if (!name || !phone || !email || !subject || !message) {
      return res.status(400).json({ success: false, error: 'All fields are required' });
    }
    
    // Create new contact entry
    const newContact = new Contact({
      name,
      email,
      phone,
      subject,
      message
    });
    
    // Save to database
    await newContact.save();
    
    // Send email notification
    await sendEmailNotification(newContact);
    
    // Send success response
    res.status(201).json({
      success: true,
      message: 'Your message has been received. We will get back to you soon.',
      data: newContact
    });
  } catch (error) {
    console.error('Error saving contact form:', error);
    res.status(500).json({
      success: false,
      error: 'An error occurred while submitting your message. Please try again.'
    });
  }
});

// Get all contacts (admin endpoint, should be protected in production)
app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch contacts' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export for testing or if using this file as a module
module.exports = app;