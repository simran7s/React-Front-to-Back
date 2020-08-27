const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { body, validationResult, check } = require('express-validator');

const User = require('../models/User');
const Contact = require('../models/Contact');

// @route   GET api/contacts
// @des     Get all users contacts(only for the specific user)
// @access  private
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/contacts
// @des     Add new contact
// @access  private
router.post(
  '/',
  [auth, [check('name', 'Enter Name').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });
      const contact = await newContact.save();
      res.json(contact);
    } catch (err) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/contact/:id
// @des     Update contact
// @access  private
router.put('/:id', (req, res) => {
  res.send('Update contact');
});

// @route   DELETE api/contact:id
// @des     Delete contact
// @access  private
router.delete('/:id', (req, res) => {
  res.send('Delete contact');
});

module.exports = router;
