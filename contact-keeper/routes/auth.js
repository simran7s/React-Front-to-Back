const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const { body, validationResult, check } = require('express-validator');

const User = require('../models/User');

// @route   GET api/auth
// @des     Get logged in user
// @access  private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/auth
// @des     Auth user & get token
// @access  public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      // Check if there is a user that excites with that name
      if (!user) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      // if so, check it password matched that uses hashed password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

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
