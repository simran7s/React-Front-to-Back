const express = require('express');
const router = express.Router();
// DOCUMENTATOR FOR VALIADTOR: https://express-validator.github.io/docs/
const { body, validationResult, check } = require('express-validator');

const User = require('../models/User');

// @route   POST api/users
// @des     Register a user
// @access  public
router.post(
  '/',
  // Validation
  [
    check('name', 'Please add a name').not().isEmpty(),
    check('email', 'Please include a unique valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    // If there is an error
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    res.send('passed');
  }
);

module.exports = router;
