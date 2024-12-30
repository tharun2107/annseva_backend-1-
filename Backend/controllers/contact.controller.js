const Contact = require('../Models/contact.model'); // Make sure the path to your Contact model is correct

// Function to post a new contact form
async function postContactForm(req, res) {
  try {
    const { name, email, subject, message } = req.body;

    // Create a new contact
    const newContact = new Contact({
      name,
      email,
      subject,
      message,
    });

    // Save the contact to the database
    const savedContact = await newContact.save();

    // Send a success response
    res.status(201).json(savedContact);
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: error.message });
  }
}

// Function to get all contacts
async function getContacts(req, res) {
  try {
    // Fetch all contacts from the database
    const contacts = await Contact.find();

    // Send the contacts as a response
    res.status(200).json(contacts);
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: error.message });
  }
}

module.exports = { postContactForm, getContacts };