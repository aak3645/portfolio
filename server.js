const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

// --- MongoDB Connection ---
const mongoURI = 'mongodb://localhost:27017/portfolio'; // Change this if you are using MongoDB Atlas or a different DB name
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (error) => console.error('MongoDB connection error:', error));
db.once('open', () => console.log('Connected to MongoDB'));

// --- Define a Mongoose Schema and Model for Contact Messages ---
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now },
});

const Contact = mongoose.model('Contact', contactSchema);

// --- Middleware ---
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Serve static files (your frontend files)
app.use(express.static(__dirname + '/public')); // If your frontend files are in a folder named "public"

// --- Endpoint for Contact Form Submissions ---
app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;
  console.log(`Received contact form submission:
    Name: ${name}
    Email: ${email}
    Message: ${message}`);
  
  try {
    // Create a new contact document and save it to the database
    const contact = new Contact({ name, email, message });
    await contact.save();
    
    // Respond with a success message
    res.json({ success: true, message: "Thank you for contacting us! Your message has been saved." });
  } catch (error) {
    console.error("Error saving contact message:", error);
    res.status(500).json({ success: false, message: "There was an error saving your message. Please try again later." });
  }
});

// --- Start the Server ---
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
