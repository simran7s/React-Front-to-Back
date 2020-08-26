const express = require('express');
const router = express.Router();

// @route   GET api/contacts
// @des     Get all users contacts(only for the specific user)
// @access  private
router.get('/', (req, res) => {
  res.send('Get all contacts');
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
