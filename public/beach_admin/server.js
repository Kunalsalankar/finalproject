const express = require('express');
const cors = require('cors');
const twilio = require('twilio');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Load Twilio credentials from .env file
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken  = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;
const client = twilio(accountSid, authToken);

app.post('/send-notification', async (req, res) => {
  const { name, beach, email, phone } = req.body;

  const messageBody = `Hello ${name},\nYou have been added as Activity In-Charge for ${beach}.`;

  try {
    await client.messages.create({
      body: messageBody,
      from: twilioPhone,
      to: phone // e.g., '+911234567890'
    });

    res.status(200).json({ message: 'SMS sent successfully!' });
  } catch (error) {
    console.error('Twilio Error:', error);
    res.status(500).json({ message: 'Failed to send SMS.' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
