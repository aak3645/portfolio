const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Serve static files (your frontend)
app.use(express.static(__dirname)); // Adjust this if your static files are in a subfolder

// Endpoint for contact form submissions
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  console.log(`Received contact form submission:
    Name: ${name}
    Email: ${email}
    Message: ${message}`);
  
  // Here you could add code to send an email or store the data in a database.
  // For now, we'll just return a success message.
  res.json({ success: true, message: "Thank you for contacting us!" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
