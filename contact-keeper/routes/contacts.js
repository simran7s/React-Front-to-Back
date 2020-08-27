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

// @route   POST api/auth
// @des     Auth user & get token
// @access  private
router.post('/', (req, res) => {
  res.send('Add contact');
});

// @route   POST api/auth
// @des     Update contact
// @access  private
router.put('/:id', (req, res) => {
  res.send('Update contact');
});

// @route   POST api/auth
// @des     Delete contact
// @access  private
router.put('/:id', (req, res) => {
  res.send('Delete contact');
});

module.exports = router;
