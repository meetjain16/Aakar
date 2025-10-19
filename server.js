import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Google Sheets API endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, company, subject, message, inquiryType } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message || !inquiryType) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        message: 'Please fill in all required fields'
      });
    }

    // Prepare data for Google Sheets
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    const rowData = [
      timestamp,
      name,
      email,
      phone || 'Not provided',
      company || 'Not provided',
      inquiryType,
      subject,
      message,
      'New' // Status column
    ];

    // Send data to Google Sheets
    const response = await fetch(`https://script.google.com/macros/s/${process.env.GOOGLE_SCRIPT_ID}/exec`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'addRow',
        data: rowData
      })
    });

    if (!response.ok) {
      throw new Error('Failed to save to Google Sheets');
    }

    // Send email notification using EmailJS (free alternative)
    if (process.env.EMAILJS_SERVICE_ID && process.env.EMAILJS_TEMPLATE_ID && process.env.EMAILJS_PUBLIC_KEY) {
      try {
        await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            service_id: process.env.EMAILJS_SERVICE_ID,
            template_id: process.env.EMAILJS_TEMPLATE_ID,
            user_id: process.env.EMAILJS_PUBLIC_KEY,
            template_params: {
              to_email: process.env.BUSINESS_EMAIL,
              from_name: name,
              from_email: email,
              phone: phone || 'Not provided',
              company: company || 'Not provided',
              inquiry_type: inquiryType,
              subject: subject,
              message: message,
              timestamp: timestamp
            }
          })
        });
      } catch (emailError) {
        console.log('Email notification failed, but form submission succeeded:', emailError);
      }
    }

    res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully!' 
    });

  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).json({ 
      error: 'Failed to send message',
      message: 'Please try again later or contact us directly'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Contact API server running on port ${PORT}`);
});

export default app;