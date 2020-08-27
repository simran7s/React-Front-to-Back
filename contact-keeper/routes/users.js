const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
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
  async (req, res) => {
    const errors = validationResult(req);
    // If there is an error
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // destructuing from req.body
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      user = new User({
        name,
        email,
        password,
      });

      // Hashing password using bcrypt
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'), //Get secret from config file
        {
          expiresIn: 360000, //That token expires in 360000 seconds, after which user will have to log back in
        },
        (err, token) => {
          //callback
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
